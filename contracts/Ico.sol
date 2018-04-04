pragma solidity 0.4.18;

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

  function allocateTokens(address _to, uint256 _amount) public onlyOwner returns (bool) {
    ico_amount_to_distribute = ico_amount_to_distribute.sub(_amount);
    totalSupply_ = totalSupply_.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Allocate(_to, _amount);
    Transfer(address(0), _to, _amount);
    return true;
  }

  function allocateTokensBatch(address[] _to, uint256[] _amount) onlyOwner public returns (bool) {
    require(_to.length == _amount.length);
    uint256 total = 0;
    for(uint256 i = 0; i < _to.length; i++) {
      total = total.add(_amount[i]);
      balances[_to[i]] = balances[_to[i]].add(_amount[i]);
      Allocate(_to[i], _amount[i]);
      Transfer(address(0), _to[i], _amount[i]);
    }
    ico_amount_to_distribute = ico_amount_to_distribute.sub(total);
    totalSupply_ = totalSupply_.add(total);
    return true;
  }

  function burnUndistributedTokens() public onlyOwner returns (bool success) {
    require(ico_amount_to_distribute > 0);
    ico_amount_to_distribute = 0;
    Burn(msg.sender, ico_amount_to_distribute);
    return true;
  }

}
