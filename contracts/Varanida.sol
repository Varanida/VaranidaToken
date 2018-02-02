pragma solidity ^0.4.18;

import './libraries/ERC20.sol';
import './libraries/Ownable.sol';
import './libraries/SafeMath.sol';

contract Varanida is ERC20, Ownable {
  using SafeMath for uint256;

  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public totalSupply;

  event Mint(address indexed addr, uint256 value);

  mapping (address => uint256) balances;
  mapping (address => mapping (address => uint256)) internal allowed;

  function Varanida() public {
    name = 'Varanida'; // Set the name for display purposes
    symbol = 'VARA';    // Set the symbol for display purposes
    decimals = 9;      // Amount of decimals for display purposes
  }

  function allowance(address owner, address spender) public view returns (uint256) {
    return allowed[owner][spender];
  }

  function approve(address spender, uint256 value) public returns (bool) {
    allowed[msg.sender][spender] = value;
    Approval(msg.sender, spender, value);
    return true;
  }

  function balanceOf(address who) public view returns (uint256) {
    return balances[who];
  }

  function mintToken(address target, uint256 _mintedAmount) onlyOwner public {
    balances[target] = balances[target].add(_mintedAmount);
    totalSupply = totalSupply.add(_mintedAmount);
    Mint(target, _mintedAmount);
  }

  function totalSupply() public view returns (uint256) {
    return totalSupply;
  }

  function transfer(address to, uint256 value) public returns (bool) {
    balances[msg.sender] = balances[msg.sender].sub(value);
    balances[to] = balances[to].add(value);
    Transfer(msg.sender, to, value);
    return true;
  }

  function transferFrom(address from, address to, uint256 value) public returns (bool) {
    balances[from] = balances[from].sub(value);
    balances[to] = balances[to].add(value);
    allowed[from][msg.sender] = allowed[from][msg.sender].sub(value);
    Transfer(from, to, value);
    return true;
  }

}
