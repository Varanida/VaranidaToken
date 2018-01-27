pragma solidity ^0.4.18;

import './libraries/Ownable.sol';
import './libraries/SafeMath.sol';

contract Varanida is Ownable {
  using SafeMath for uint256;

  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public totalSupply;

  event Mint(address indexed addr, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);

  mapping (address => uint256) balances;

  function Varanida() public {
    name = 'Varanida'; // Set the name for display purposes
    symbol = 'VARA';    // Set the symbol for display purposes
    decimals = 9;      // Amount of decimals for display purposes
  }

  function mintToken(address target, uint256 _mintedAmount) onlyOwner public {
    balances[target] = balances[target].add(_mintedAmount);
    totalSupply = totalSupply.add(_mintedAmount);
    Mint(target, _mintedAmount);
  }

  function transfer(address _to, uint256 _value) public {
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(msg.sender, _to, _value);
  }

  function balanceOf(address _who) public view returns (uint256 balance) {
    return balances[_who];
  }

}
