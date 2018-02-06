pragma solidity ^0.4.18;

import './libraries/StandardToken.sol';
import './Mintable.sol';

contract Varanida is StandardToken, Mintable {

  string public constant name = 'Varanida';
  uint8 public constant decimals = 18;
  string public constant symbol = 'VAD';

  uint256 public constant UNIT = 10**uint256(decimals);
  uint256 public constant DAILY_LIMIT = 100*UNIT;
  uint256 public constant TOTAL_DAILY_LIMIT = 10000*DAILY_LIMIT;

  function Varanida() Mintable(DAILY_LIMIT, TOTAL_DAILY_LIMIT) public {}

}
