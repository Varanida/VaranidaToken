pragma solidity ^0.4.18;

import './libraries/StandardToken.sol';
import './Ico.sol';
import './Mintable.sol';

contract Varanida is StandardToken, Mintable, Ico {

  // Token basic informations
  string public constant name = 'Varanida';
  uint8 public constant decimals = 18;
  string public constant symbol = 'VAD';

  uint256 constant UNIT = 10**uint256(decimals);

  // Minting parameters
  uint256 constant DAILY_MINTING_LIMIT = 10 * UNIT;
  uint256 constant AIRDROP_AMOUNT = 300 * UNIT;

  // ICO parameters
  uint256 constant ADVISORS_AMOUNT = 100 * UNIT;
  uint256 constant FOUNDERS_AMOUNT = 100 * UNIT;
  uint256 constant HOLDERS_AMOUNT = 500 * UNIT;

  function Varanida()
    Mintable(DAILY_MINTING_LIMIT, AIRDROP_AMOUNT)
    Ico(ADVISORS_AMOUNT, FOUNDERS_AMOUNT, HOLDERS_AMOUNT)
    public {}

}
