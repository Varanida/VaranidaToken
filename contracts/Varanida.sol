pragma solidity ^0.4.18;

import './libraries/EIP20.sol';
import './AirDrop.sol';

contract Varanida is EIP20, AirDrop {

  // Standard EIP20 information
  string  constant NAME = 'Varanida';
  string  constant SYMBOL = 'VAD';
  uint8   constant DECIMALS = 18;
  uint256 constant UNIT = 10**uint256(DECIMALS);

  function Varanida() EIP20(
        0,
        NAME,
        DECIMALS,
        SYMBOL
  ) public {}

}
