'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - ICO', function(accounts) {

  const owner = accounts[0],
  random_guy1 = accounts[1],
  random_guy2 = accounts[2],
  random_guy3 = accounts[3],
  bad_guy = accounts[4],
  allocateAmount = Math.pow(10,18);

  it("should not let users change owners", function() {
    var vara, nb_calls = 0;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.addVoter(random_guy1, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addVoter(random_guy2, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        nb_calls++;
        return vara.removeVoter(random_guy1, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 3);
      });
  });

  it("should let owner change owners", function() {
    var vara, nb_calls = 0;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.addVoter(random_guy1, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addVoter(random_guy2, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addVoter(random_guy3, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.removeVoter(random_guy1, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.removeVoter(random_guy1, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        nb_calls++;
        return vara.removeVoter(random_guy3, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.removeVoter(random_guy3, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        nb_calls++;
        return vara.removeVoter(random_guy2, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.removeVoter(random_guy2, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 9);
      });
  });

  it("should let owner fix owners", function() {
    var vara, nb_calls = 0;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.addVoter(random_guy1, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addVoter(random_guy2, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.fixVoters({from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addVoter(random_guy3, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        nb_calls++;
        return vara.removeVoter(random_guy1, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 5);
      });
  });

});
