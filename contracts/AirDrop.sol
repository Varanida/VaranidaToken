pragma solidity ^0.4.18;

import './libraries/EIP20.sol';
import './libraries/Ownable.sol';
import './libraries/SafeMath.sol';

contract AirDrop is EIP20, Ownable {
  using SafeMath for uint256;

  event Mint(address indexed addr, uint256 value);

  function mintToken(address target, uint256 _mintedAmount) onlyOwner public returns (bool) {
    balances[target] = balances[target].add(_mintedAmount);
    totalSupply = totalSupply.add(_mintedAmount);
    Mint(target, _mintedAmount);
    return true;
  }

}
