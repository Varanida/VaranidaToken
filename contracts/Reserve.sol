pragma solidity ^0.4.18;

import './MultiOwnable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract Reserve is MultiOwnable {
  using SafeMath for uint256;

  uint256 internal reserve_amount;

  function Reserve(uint256 _reserve_amount) public {
    reserve_amount = _reserve_amount;
  }

  function reserveBalance() public view returns (uint256 balance) {
    return reserve_amount;
  }

}
