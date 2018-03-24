pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/BasicToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract MintableToken is BasicToken, Ownable {

  event Mint(address indexed to, uint256 amount);

  struct mintedState {
    uint256 mintedAmount;
    uint256 lastMintDay;
  }

  mapping(address => mintedState) private dailyMintedAmount;
  uint256 private dailyLimit;
  uint256 private quantityToDrop;

  modifier canMint() {
    require(quantityToDrop > 0);
    _;
  }

  function MintableToken(uint256 _user_limit, uint256 _quantity_to_drop) public {
    dailyLimit = _user_limit;
    quantityToDrop = _quantity_to_drop;
  }

  function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
    uint256 today = now / 1 days;
    if (today > dailyMintedAmount[_to].lastMintDay) {
      dailyMintedAmount[_to].mintedAmount = 0;
      dailyMintedAmount[_to].lastMintDay = today;
    }
    if (dailyMintedAmount[_to].mintedAmount.add(_amount) <= dailyLimit) {
      dailyMintedAmount[_to].mintedAmount = dailyMintedAmount[_to].mintedAmount.add(_amount);
      balances[_to] = balances[_to].add(_amount);
      quantityToDrop = quantityToDrop.sub(_amount);
      Mint(_to, _amount);
      Transfer(address(0), _to, _amount);
      return true;
    }
    return false;
  }

  function mintBatch(address[] _to, uint256[] _amount) onlyOwner canMint public {
    require(_to.length == _amount.length);
    for(uint256 i = 0; i < _to.length; i++) {
      require(mint(_to[i], _amount[i]));
    }
  }

}
