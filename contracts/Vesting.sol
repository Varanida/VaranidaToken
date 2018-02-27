pragma solidity ^0.4.18;

import './libraries/ERC20/BasicToken.sol';
import './libraries/ownership/Ownable.sol';
import './libraries/math/SafeMath.sol';

contract Vesting is BasicToken, Ownable {
  using SafeMath for uint256;

  uint256 private advisors_amount_max;
  uint256 private founders_amount_max;
  uint256 private technicals_amount_max;
  uint256 private holders_amount_max;

  uint256 private advisors_cliff;
  uint256 private founders_cliff;
  uint256 private technicals_cliff;

  uint256 private advisors_duration;
  uint256 private founders_duration;
  uint256 private technicals_duration;

  uint256 private advisorsAllocatedAmount = 0;
  uint256 private foundersAllocatedAmount = 0;
  uint256 private technicalAllocatedAmount = 0;
  uint256 private holdersAllocatedAmount = 0;

  function Vesting(uint256 _advisors_amount, uint256 _advisors_cliff, uint256 _advisors_duration,
                   uint256 _founders_amount, uint256 _founders_cliff, uint256 _founders_duration,
                   uint256 _technicals_amount, uint256 _technicals_cliff, uint256 _technicals_duration,
                   uint256 _holders_amount) public {
    uint256 ico_supply = _advisors_amount + _founders_amount + _technicals_amount + _holders_amount;
    uint256 today = now / 1 days;
    totalSupply_ = totalSupply_.add(ico_supply);

    advisors_amount_max = _advisors_amount;
    advisors_cliff = today + _advisors_cliff;
    advisors_duration = _advisors_duration;

    founders_amount_max = _founders_amount;
    founders_cliff = today + _founders_cliff;
    founders_duration = _founders_duration;

    technicals_amount_max = _technicals_amount;
    technicals_cliff = today + _technicals_cliff;
    technicals_duration = _technicals_duration;

    holders_amount_max = _holders_amount;
  }

  function allocate(address _address, uint256 _amount, uint8 _type) public onlyOwner returns (bool success) {
    if (_type == 0) { // advisor
      require(advisorsAllocatedAmount + _amount <= advisors_amount_max);
      advisorsAllocatedAmount += _amount;
    } else if (_type == 1) { // founder
      require(foundersAllocatedAmount + _amount <= founders_amount_max);
      foundersAllocatedAmount += _amount;
    } else if (_type == 2) { // technical
      require(technicalAllocatedAmount + _amount <= technicals_amount_max);
      foundersAllocatedAmount += _amount;
    } else { // holders
      require(holdersAllocatedAmount + _amount <= holders_amount_max);
      holdersAllocatedAmount += _amount;
    }
    balances[_address] = balances[_address].add(_amount);
    return true;
  }

}
