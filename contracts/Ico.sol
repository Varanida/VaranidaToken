pragma solidity ^0.4.18;

import './libraries/BasicToken.sol';
import './libraries/Ownable.sol';
import './libraries/SafeMath.sol';

contract Ico is BasicToken, Ownable {
  using SafeMath for uint256;

  uint256 public advisors_amount_max;
  uint256 public founders_amount_max;
  uint256 public holders_amount_max;

  uint256 public advisorsAllocatedAmount = 0;
  uint256 public foundersAllocatedAmount = 0;
  uint256 public holdersAllocatedAmount = 0;

  function Ico(uint256 _advisors_amount, uint256 _founders_amount, uint256 _holders_amount) public {
    advisors_amount_max = _advisors_amount;
    founders_amount_max = _founders_amount;
    holders_amount_max = _holders_amount;
  }

  function allocate(address _address, uint256 _amount, uint8 _type) public onlyOwner returns (bool success) {
    if (_type == 0) { // advisor
      require(advisorsAllocatedAmount + _amount <= advisors_amount_max);
      advisorsAllocatedAmount += _amount;
    } else if (_type == 1) { // founder
      require(foundersAllocatedAmount + _amount <= founders_amount_max);
      foundersAllocatedAmount += _amount;
    } else { // holders
      require(holdersAllocatedAmount + _amount <= holders_amount_max);
      holdersAllocatedAmount += _amount;
    }
    balances[_address] = balances[_address].add(_amount);
    totalSupply_ = totalSupply_.add(_amount);
    return true;
  }

}
