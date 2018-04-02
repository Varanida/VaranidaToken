pragma solidity ^0.4.18;

import './Ico.sol';
import './MintableToken.sol';
import './Vesting.sol';

contract Varanida is Ico, MintableToken, Vesting {

  // Token basic informations
  string public constant name = 'Varanida';
  uint8 public constant decimals = 18;
  string public constant symbol = 'VAD';

  uint256 constant UNIT = 10**uint256(decimals);

  // Ico parameters
  uint256 constant ICO_AMOUNT = 670000000 * UNIT;

  // Minting parameters
  uint256 constant AIRDROP_AMOUNT = 30000000 * UNIT;

  // Reserve parameters
  uint256 constant RESERVE_AMOUNT = 110000000 * UNIT;
  uint256 constant RESERVE_MAJORITY_PERCENTAGE = 75;
  uint256 constant RESERVE_DISTRIBUTION_DURATION = 4 years;

  // Vesting parameters
  uint256 constant ADVISORS_AMOUNT = 40000000 * UNIT;
  uint256 constant ADVISORS_BONUS_PERCENTAGE = 30;
  uint256 constant ADVISORS_BONUS_TARGET = 182 days;
  uint256 constant FOUNDERS_AMOUNT = 130000000 * UNIT;
  uint256 constant FOUNDERS_CLIFF = 1 years;
  uint256 constant FOUNDERS_DURATION = 1 years;
  uint256 constant TECHS_AMOUNT = 20000000 * UNIT;
  uint256 constant TECHS_CLIFF = 182 days;
  uint256 constant TECHS_DURATION = 182 days;

  function Varanida()
    Ico(ICO_AMOUNT)
    MintableToken(AIRDROP_AMOUNT)
    Vesting(ADVISORS_AMOUNT, ADVISORS_BONUS_PERCENTAGE, ADVISORS_BONUS_TARGET,
            FOUNDERS_AMOUNT, FOUNDERS_CLIFF, FOUNDERS_DURATION,
            TECHS_AMOUNT, TECHS_CLIFF, TECHS_DURATION,
            RESERVE_AMOUNT, RESERVE_MAJORITY_PERCENTAGE, RESERVE_DISTRIBUTION_DURATION)
    public {
      totalSupply_ =
        ADVISORS_AMOUNT
        + FOUNDERS_AMOUNT
        + TECHS_AMOUNT
        + ICO_AMOUNT
        + RESERVE_AMOUNT;
    }

}
