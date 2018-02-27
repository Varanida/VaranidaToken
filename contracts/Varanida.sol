pragma solidity ^0.4.18;

import './MintableToken.sol';
import './Vesting.sol';
import './libraries/ERC20/PausableToken.sol';

contract Varanida is PausableToken, MintableToken, Vesting {

  // Token basic informations
  string public constant name = 'Varanida';
  uint8 public constant decimals = 18;
  string public constant symbol = 'VAD';

  uint256 constant UNIT = 10**uint256(decimals);

  // Minting parameters
  uint256 constant DAILY_MINTING_LIMIT = 10 * UNIT;
  uint256 constant AIRDROP_AMOUNT = 300 * UNIT;

  // Vesting parameters
  uint256 constant ADVISORS_AMOUNT = 100 * UNIT;
  uint256 constant ADVISORS_CLIFF = 365 days;
  uint256 constant ADVISORS_DURATION = 365 days;
  uint256 constant FOUNDERS_AMOUNT = 100 * UNIT;
  uint256 constant FOUNDERS_CLIFF = 365 days;
  uint256 constant FOUNDERS_DURATION = 365 days;
  uint256 constant TECHS_AMOUNT = 100 * UNIT;
  uint256 constant TECHS_CLIFF = 365 days;
  uint256 constant TECHS_DURATION = 365 days;
  uint256 constant HOLDERS_AMOUNT = 400 * UNIT;

  function Varanida()
    MintableToken(DAILY_MINTING_LIMIT, AIRDROP_AMOUNT)
    Vesting(ADVISORS_AMOUNT, ADVISORS_CLIFF, ADVISORS_DURATION,
            FOUNDERS_AMOUNT, FOUNDERS_CLIFF, FOUNDERS_AMOUNT,
            TECHS_AMOUNT, TECHS_CLIFF, TECHS_DURATION,
            HOLDERS_AMOUNT)
    public {}

}
