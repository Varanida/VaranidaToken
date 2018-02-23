pragma solidity ^0.4.18;

import './Ico.sol';
import './Mintable.sol';
import './libraries/ERC20/PausableToken.sol';

contract Varanida is PausableToken, Mintable, Ico {

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
  uint256 constant TECHS_AMOUNT = 100 * UNIT;
  uint256 constant HOLDERS_AMOUNT = 400 * UNIT;

  function Varanida()
    Mintable(DAILY_MINTING_LIMIT, AIRDROP_AMOUNT)
    Ico(ADVISORS_AMOUNT, FOUNDERS_AMOUNT, TECHS_AMOUNT, HOLDERS_AMOUNT)
    public {}

}
