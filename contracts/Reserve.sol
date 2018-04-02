pragma solidity ^0.4.18;

import './MultiOwnable.sol';
import 'zeppelin-solidity/contracts/token/ERC20/PausableToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract Reserve is MultiOwnable, PausableToken {
  using SafeMath for uint256;

  event Withdraw(address indexed to, uint256 amount);

  struct vote {
    address _address;
    uint256 _amount;
  }

  mapping(address => vote) private votes;

  uint256 private initial_reserve_amount;
  uint256 private total_withdrawed;
  uint256 private deployment_date;
  uint256 private distribution_duration;
  uint256 private majority_percentage;
  uint256 internal reserve_amount;

  function Reserve(uint256 _reserve_amount, uint256 _majority_percentage,
                   uint256 _distribution_duration) public {
    initial_reserve_amount = _reserve_amount;
    total_withdrawed = 0;
    deployment_date = now;
    reserve_amount = _reserve_amount;
    majority_percentage = _majority_percentage;
    distribution_duration = _distribution_duration;
  }

  function reserveBalance() public view returns (uint256 balance) {
    return reserve_amount;
  }

  function withdraw(address _address, uint256 _amount) cantChangeOwners onlyOwners public returns (bool) {
    uint256 vote_count = 0;
    votes[msg.sender] = vote({_address: _address, _amount: _amount});
    for (uint256 i = 0; i < owners.length; i++) {
      if(votes[owners[i]]._address == _address && votes[owners[i]]._amount == _amount) {
        vote_count = vote_count + 1;
      }
    }
    if(vote_count.mul(100).div(owners.length) >= majority_percentage) {
      if (now < deployment_date.add(distribution_duration) &&
          _amount > initial_reserve_amount.mul(now.sub(deployment_date)).div(distribution_duration).sub(total_withdrawed)) {
        revert();
      } else {
        total_withdrawed = total_withdrawed.add(_amount);
        reserve_amount = reserve_amount.sub(_amount);
        totalSupply_ = totalSupply_.add(_amount);
        balances[_address] = balances[_address].add(_amount);
        Withdraw(_address, _amount);
        Transfer(address(0), _address, _amount);
        return true;
      }
    }
    return false;
  }

}
