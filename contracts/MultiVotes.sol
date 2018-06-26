pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract MultiVotes is Ownable {

  event VoterAddition(address indexed voter);
  event VoterRemoval(address indexed voter);
  event ChangeVotersFinished();

  address[] internal voters;
  mapping(address => bool) private voters_map;
  bool public votersFixed = false;

  modifier isVoter(address voter) {
    require(voters_map[voter]);
    _;
  }

  modifier canChangeVoters() {
    require(!votersFixed);
    _;
  }

  modifier cantChangeVoters() {
    require(votersFixed);
    _;
  }

  function fixVoters() onlyOwner canChangeVoters public returns (bool) {
    require(voters.length > 0);
    votersFixed = true;
    emit ChangeVotersFinished();
    return true;
  }

  function addVoter(address new_voter) onlyOwner canChangeVoters public {
    require(!voters_map[new_voter]);
    voters_map[new_voter] = true;
    voters.push(new_voter);
    emit VoterAddition(new_voter);
  }

  function removeVoter(address old_voter) onlyOwner canChangeVoters public {
    require(voters_map[old_voter]);
    voters_map[old_voter] = false;
    for (uint256 i = 0; i < voters.length; i++) {
      if (voters[i] == old_voter) {
        voters[i] = voters[voters.length - 1];
        voters.length = voters.length - 1;
        emit VoterRemoval(old_voter);
        return;
      }
    }
    revert();
  }

}
