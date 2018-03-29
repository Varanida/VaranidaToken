pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/BasicToken.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract Ico is BasicToken, Ownable {
  using SafeMath for uint256;

  event Allocate(address indexed to, uint256 amount);
  event Burn(address indexed from, uint256 amount);

  uint256 private ico_amount_to_distribute;

  function Ico(uint256 _ico_amount) public {
    ico_amount_to_distribute = _ico_amount;
  }

  function allocateTokens(address _to, uint256 _amount) public onlyOwner returns (bool success) {
    require(_amount <= ico_amount_to_distribute);
    ico_amount_to_distribute = ico_amount_to_distribute.sub(_amount);
    balances[_to] = balances[_to].add(_amount);
    Transfer(address(0), _to, _amount);
    Allocate(_to, _amount);
    return true;
  }

  function burnUndistributedTokens() public onlyOwner returns (bool success) {
    require(ico_amount_to_distribute > 0);
    uint256 amountToBurn = ico_amount_to_distribute;
    totalSupply_ = totalSupply_.sub(amountToBurn);
    ico_amount_to_distribute = 0;
    Burn(msg.sender, amountToBurn);
    Transfer(msg.sender, address(0), amountToBurn);
    return true;
  }

}
