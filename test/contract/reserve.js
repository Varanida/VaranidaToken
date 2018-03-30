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
    var vara;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        return vara.addOwner(random_guy1, {from: owner});
      }).then(function() {
        return vara.addOwner(random_guy2, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        return vara.removeOwner(random_guy1, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should let owner change owners", function() {
    var vara;
    var removed_1 = false, removed_2 = false, removed_3 = false;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        return vara.addOwner(random_guy1, {from: owner});
      }).then(function() {
        return vara.addOwner(random_guy2, {from: owner});
      }).then(function() {
        return vara.addOwner(random_guy3, {from: owner});
      }).then(function() {
        return vara.removeOwner(random_guy1, {from: owner});
      }).then(function() {
        removed_1 = true;
        return vara.removeOwner(random_guy1, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        return vara.removeOwner(random_guy3, {from: owner});
      }).then(function() {
        removed_3 = true;
        return vara.removeOwner(random_guy3, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        return vara.removeOwner(random_guy2, {from: owner});
      }).then(function() {
        removed_2 = true;
        return vara.removeOwner(random_guy2, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        assert(removed_1 && removed_2 && removed_3);
      });
  });

});
