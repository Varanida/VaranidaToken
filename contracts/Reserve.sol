pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract Reserve {
  using SafeMath for uint256;

  uint256 internal reserve_amount;
  uint256 private max_unlockable_amount_per_year;

  function Reserve(uint256 _reserve_amount) public {
    reserve_amount = _reserve_amount;
    max_unlockable_amount_per_year = _reserve_amount.div(4);
  }

  function reserveBalance() public view returns (uint256 balance) {
    return reserve_amount;
  }

}
