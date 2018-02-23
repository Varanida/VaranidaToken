'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - Pausable', function(accounts) {

  let owner = accounts[0],
  bad_guy = accounts[1],
  random_guy = accounts[2],
  mintedAmount = 1*Math.pow(10,18);

  it("should not let anybody pause the token", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.pause({from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should let owner pause the ERC20 token", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.mintToken(bad_guy, mintedAmount, {from: owner});
      }).then(function() {
        return vara.pause({from: owner});
      }).then(function() {
        return vara.transfer(random_guy, mintedAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        return vara.unpause({from: owner});
      }).then(function() {
        return vara.transfer(random_guy, mintedAmount, {from: bad_guy});
      }).then(function() {
        return vara.balanceOf(random_guy, {from: random_guy});
      }).then(function(result){
        assert(result.toNumber()===mintedAmount);
      })
  });

});
