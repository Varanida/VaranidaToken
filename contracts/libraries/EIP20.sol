pragma solidity ^0.4.18;

import './SafeMath.sol';

/**
 * @title EIP20
 * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 */
contract EIP20 {
  using SafeMath for uint256;

  string public name;
  uint8 public decimals;
  string public symbol;

  uint256 public totalSupply;
  mapping (address => uint256) balances;
  mapping (address => mapping (address => uint256)) internal allowed;

  event Approval(address indexed owner, address indexed spender, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);

  function EIP20(
    uint256 _initialAmount,
    string _tokenName,
    uint8 _decimalUnits,
    string _tokenSymbol
  ) public {
      balances[msg.sender] = _initialAmount;
      totalSupply = _initialAmount;
      name = _tokenName;
      decimals = _decimalUnits;
      symbol = _tokenSymbol;
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
