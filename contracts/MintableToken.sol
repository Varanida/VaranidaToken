pragma solidity 0.4.18;

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

  function mintBatch(address[] _to, uint256[] _amount) onlyOwner public returns (bool) {
    require(_to.length == _amount.length);
    uint256 total = 0;
    for(uint256 i = 0; i < _to.length; i++) {
      total = total.add(_amount[i]);
      balances[_to[i]] = balances[_to[i]].add(_amount[i]);
      Mint(_to[i], _amount[i]);
      Transfer(address(0), _to[i], _amount[i]);
    }
    quantity_to_mint = quantity_to_mint.sub(total);
    totalSupply_ = totalSupply_.add(total);
    return true;
  }

}
