pragma solidity 0.4.19;

import './Ico.sol';
import './MintableToken.sol';
import './Vesting.sol';

contract Varanida is Ico, MintableToken, Vesting {

  // Token basic informations
  string public constant name = 'Varanida';
  uint8 public constant decimals = 18;
  string public constant symbol = 'VAD';

  uint256 private constant UNIT = 10**uint256(decimals);

  // Ico parameters
  uint256 private constant ICO_AMOUNT = 670000000 * UNIT;

  // Minting parameters
  uint256 private constant AIRDROP_AMOUNT = 30000000 * UNIT;

  // Reserve parameters
  uint256 private constant RESERVE_AMOUNT = 110000000 * UNIT;
  uint256 private constant RESERVE_VOTES_REQUIRED = 2;
  uint256 private constant RESERVE_DISTRIBUTION_DURATION = 4 years;

  // Vesting parameters
  uint256 private constant ADVISORS_AMOUNT = 40000000 * UNIT;
  uint256 private constant ADVISORS_BONUS_PERCENTAGE = 30;
  uint256 private constant ADVISORS_BONUS_TARGET = 182 days;
  uint256 private constant FOUNDERS_AMOUNT = 130000000 * UNIT;
  uint256 private constant FOUNDERS_CLIFF = 1 years;
  uint256 private constant FOUNDERS_DURATION = 1 years;
  uint256 private constant TECHS_AMOUNT = 20000000 * UNIT;
  uint256 private constant TECHS_CLIFF = 182 days;
  uint256 private constant TECHS_DURATION = 182 days;

  function Varanida()
    Ico(ICO_AMOUNT)
    MintableToken(AIRDROP_AMOUNT)
    Vesting(ADVISORS_AMOUNT, ADVISORS_BONUS_PERCENTAGE, ADVISORS_BONUS_TARGET,
            FOUNDERS_AMOUNT, FOUNDERS_CLIFF, FOUNDERS_DURATION,
            TECHS_AMOUNT, TECHS_CLIFF, TECHS_DURATION,
            RESERVE_AMOUNT, RESERVE_VOTES_REQUIRED, RESERVE_DISTRIBUTION_DURATION)
    public {}

}
