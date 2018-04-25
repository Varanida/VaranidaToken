pragma solidity 0.4.19;

import './Reserve.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract Vesting is Reserve {
  using SafeMath for uint256;

  event Allocate(address indexed to, uint256 amount);

  enum UserType { DEFAULT, ADVISOR, FOUNDER, TECHNICAL }

  struct grantState {
    uint256 totalAmount;
    uint256 totalDistributed;
    bool bonus;
  }

  mapping(address => grantState) private advisors_grants;
  uint256 private advisors_amount_to_distribute;
  uint256 private advisors_bonus_percentage;
  uint256 private advisors_bonus_target;

  mapping(address => grantState) private founders_grants;
  uint256 private founders_amount_to_distribute;
  uint256 private founders_cliff;
  uint256 private founders_duration;

  mapping(address => grantState) private technicals_grants;
  uint256 private technicals_amount_to_distribute;
  uint256 private technicals_cliff;
  uint256 private technicals_duration;

  function Vesting(uint256 _advisors_amount, uint256 _advisors_bonus_percentage, uint256 _advisors_bonus_target,
                   uint256 _founders_amount, uint256 _founders_cliff, uint256 _founders_duration,
                   uint256 _technicals_amount, uint256 _technicals_cliff, uint256 _technicals_duration,
                   uint256 _reserve_amount, uint256 _reserve_votes_required, uint256 _reserve_distribution_duration)
           Reserve(_reserve_amount, _reserve_votes_required, _reserve_distribution_duration) public {
    advisors_amount_to_distribute = _advisors_amount;
    advisors_bonus_percentage = _advisors_bonus_percentage;
    advisors_bonus_target = now + _advisors_bonus_target;

    founders_amount_to_distribute = _founders_amount;
    founders_cliff = now + _founders_cliff;
    founders_duration = _founders_duration;

    technicals_amount_to_distribute = _technicals_amount;
    technicals_cliff = now + _technicals_cliff;
    technicals_duration = _technicals_duration;
  }

  function cancelAdvisorBonus(address _to) public onlyOwner returns (bool) {
    if (advisors_grants[_to].bonus) {
      advisors_grants[_to].bonus = false;
      return true;
    } else {
      return false;
    }
  }

  function allocate(address _to, uint256 _amount, UserType _type) public onlyOwner returns (bool) {
    if (_type == UserType.ADVISOR) {
      require(_amount <= advisors_amount_to_distribute);
      advisors_amount_to_distribute = advisors_amount_to_distribute.sub(_amount);
      advisors_grants[_to] = grantState({totalAmount: _amount, totalDistributed: 0, bonus: true});
    } else if (_type == UserType.FOUNDER) {
      require(_amount <= founders_amount_to_distribute);
      founders_amount_to_distribute = founders_amount_to_distribute.sub(_amount);
      founders_grants[_to] = grantState({totalAmount: _amount, totalDistributed: 0, bonus: false});
    } else if (_type == UserType.TECHNICAL) {
      require(_amount <= technicals_amount_to_distribute);
      technicals_amount_to_distribute = technicals_amount_to_distribute.sub(_amount);
      technicals_grants[_to] = grantState({totalAmount: _amount, totalDistributed: 0, bonus: false});
    } else {
      revert();
    }
    Allocate(_to, _amount);
    return true;
  }

  function claimTokens(address _to, uint256 _amount, UserType _type) public returns (bool) {
    uint256 available_to_distribute;
    uint256 cliff = 0;
    uint256 duration = 0;
    uint256 bonus_percentage = 0;
    uint256 bonus_target = 0;
    uint256 bonus_calculated = 0;
    grantState storage grant;

    if (_type == UserType.ADVISOR) {
      bonus_percentage = advisors_bonus_percentage;
      bonus_target = advisors_bonus_target;
      grant = advisors_grants[msg.sender];
    } else if (_type == UserType.FOUNDER) {
      cliff = founders_cliff;
      duration = founders_duration;
      grant = founders_grants[msg.sender];
    } else if (_type == UserType.TECHNICAL) {
      cliff = technicals_cliff;
      duration = technicals_duration;
      grant = technicals_grants[msg.sender];
    } else { // default
      revert();
    }

    // calcul how much you can claim
    if (now >= cliff.add(duration)) {
      available_to_distribute = grant.totalAmount.sub(grant.totalDistributed);
    } else if (now > cliff) {
      available_to_distribute = grant.totalAmount.mul(now.sub(cliff)).div(duration).sub(grant.totalDistributed);
    }

    // add bonus if you are eligible to it or burn it
    if (bonus_percentage > 0 && grant.bonus) {
      if (now >= bonus_target) {
        bonus_calculated = grant.totalAmount.mul(bonus_percentage).div(100);
        if (reserve_amount >= bonus_calculated) {
          reserve_amount = reserve_amount.sub(bonus_calculated);
          available_to_distribute = available_to_distribute.add(bonus_calculated);
        }
      } else {
        grant.bonus = false;
      }
    }

    require(_amount <= available_to_distribute);
    totalSupply_ = totalSupply_.add(_amount);
    grant.totalDistributed = grant.totalDistributed.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Transfer(address(0), _to, _amount);
    return true;
  }

}
