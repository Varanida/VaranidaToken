pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract MultiOwnable is Ownable {

  event OwnerAddition(address indexed owner);
  event OwnerRemoval(address indexed owner);
  event ChangeOwnersFinished();

  address[] internal owners;
  bool public ownersFixed = false;

  modifier canChangeOwners() {
    require(!ownersFixed);
    _;
  }

  function fixOwners() onlyOwner canChangeOwners public returns (bool) {
    require(owners.length > 0);
    ownersFixed = true;
    ChangeOwnersFinished();
    return true;
  }

  function addOwner(address new_owner) onlyOwner canChangeOwners public {
    owners.push(new_owner);
    OwnerAddition(new_owner);
  }

  function removeOwner(address old_owner) onlyOwner canChangeOwners public {
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
