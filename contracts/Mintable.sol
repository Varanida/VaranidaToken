pragma solidity ^0.4.18;

import './libraries/BasicToken.sol';
import './libraries/Ownable.sol';
import './libraries/SafeMath.sol';

contract Mintable is BasicToken, Ownable {
  using SafeMath for uint256;

  struct mintedState {
    uint256 mintedAmount;
    uint256 lastMintDay;
  }

  mapping (address => mintedState) dailyMintedAmount;
  uint256 public dailyLimit;

  event Mint(address indexed addr, uint256 value);

  function Mintable(uint256 _limit) public {
    dailyLimit = _limit;
  }

  function mintToken(address _target, uint256 _mintedAmount) onlyOwner public returns (bool) {
    uint256 today = now / 1 days;
    if (today > dailyMintedAmount[_target].lastMintDay) {
      dailyMintedAmount[_target].mintedAmount = 0;
      dailyMintedAmount[_target].lastMintDay = today;
    }
    if (dailyMintedAmount[_target].mintedAmount.add(_mintedAmount) <= dailyLimit) {
      dailyMintedAmount[_target].mintedAmount = dailyMintedAmount[_target].mintedAmount.add(_mintedAmount);
      balances[_target] = balances[_target].add(_mintedAmount);
      totalSupply_ = totalSupply_.add(_mintedAmount);
      Mint(_target, _mintedAmount);
      return true;
    }
    return false;
  }

}
