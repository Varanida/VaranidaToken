pragma solidity 0.4.19;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract MintableToken is StandardToken, Ownable {

  event Mint(address indexed to, uint256 amount);

  uint256 private quantity_to_mint;

  function MintableToken(uint256 _quantity_to_mint) public {
    quantity_to_mint = _quantity_to_mint;
  }

  function mint(address _to, uint256 _amount) onlyOwner public returns (bool) {
    quantity_to_mint = quantity_to_mint.sub(_amount);
    totalSupply_ = totalSupply_.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Mint(_to, _amount);
    Transfer(address(0), _to, _amount);
    return true;
  }

}
