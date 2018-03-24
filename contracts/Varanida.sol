pragma solidity ^0.4.18;

import './MintableToken.sol';
import './Vesting.sol';
import 'zeppelin-solidity/contracts/token/ERC20/PausableToken.sol';

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
  uint256 constant ADVISORS_CLIFF = 0 days;
  uint256 constant ADVISORS_DURATION = 0 days;
  uint256 constant ADVISORS_BONUS_PERCENTAGE = 30;
  uint256 constant ADVISORS_BONUS_TARGET = 182 days;
  uint256 constant FOUNDERS_AMOUNT = 100 * UNIT;
  uint256 constant FOUNDERS_CLIFF = 1 years;
  uint256 constant FOUNDERS_DURATION = 1 years;
  uint256 constant FOUNDERS_BONUS_PERCENTAGE = 0;
  uint256 constant FOUNDERS_BONUS_TARGET = 0 days;
  uint256 constant TECHS_AMOUNT = 100 * UNIT;
  uint256 constant TECHS_CLIFF = 182 days;
  uint256 constant TECHS_DURATION = 182 days;
  uint256 constant TECHS_BONUS_PERCENTAGE = 0;
  uint256 constant TECHS_BONUS_TARGET = 0 days;
  uint256 constant HOLDERS_AMOUNT = 400 * UNIT;

  function Varanida()
    MintableToken(DAILY_MINTING_LIMIT, AIRDROP_AMOUNT)
    Vesting(ADVISORS_AMOUNT, ADVISORS_CLIFF, ADVISORS_DURATION,
            ADVISORS_BONUS_PERCENTAGE, ADVISORS_BONUS_TARGET,
            FOUNDERS_AMOUNT, FOUNDERS_CLIFF, FOUNDERS_DURATION,
            FOUNDERS_BONUS_PERCENTAGE, FOUNDERS_BONUS_TARGET,
            TECHS_AMOUNT, TECHS_CLIFF, TECHS_DURATION,
            TECHS_BONUS_PERCENTAGE, TECHS_BONUS_TARGET,
            HOLDERS_AMOUNT)
    public {
      totalSupply_ =
        AIRDROP_AMOUNT
        + ADVISORS_AMOUNT
        + ADVISORS_AMOUNT.mul(ADVISORS_BONUS_PERCENTAGE).div(100)
        + FOUNDERS_AMOUNT
        + FOUNDERS_AMOUNT.mul(FOUNDERS_BONUS_PERCENTAGE).div(100)
        + TECHS_AMOUNT
        + TECHS_AMOUNT.mul(TECHS_BONUS_PERCENTAGE).div(100)
        + HOLDERS_AMOUNT;
    }

}
