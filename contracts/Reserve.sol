pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Reserve is Ownable {
  using SafeMath for uint256;

  event OwnerAddition(address indexed owner);
  event OwnerRemoval(address indexed owner);

  uint256 internal reserve_amount;
  address[] private owners;
  uint256 private max_unlockable_amount_per_year;

  function Reserve(uint256 _reserve_amount) public {
    reserve_amount = _reserve_amount;
    max_unlockable_amount_per_year = _reserve_amount.div(4);
  }

  function reserveBalance() public view returns (uint256 balance) {
    return reserve_amount;
  }

  function test() public view returns (address[]) {
    return owners;
  }

  function addOwner(address new_owner) public onlyOwner {
    owners.push(new_owner);
    OwnerAddition(new_owner);
  }

  function removeOwner(address old_owner) public onlyOwner {
    for (uint256 i = 0; i < owners.length; i++) {
      if (owners[i] == old_owner) {
        owners[i] = owners[owners.length - 1];
        owners.length = owners.length - 1;
        OwnerRemoval(old_owner);
        return;
      }
    }
    revert();
  }

}
