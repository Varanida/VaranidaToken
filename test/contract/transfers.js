'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - Transfers', function(accounts) {

  let owner = accounts[0],
  bad_guy = accounts[1],
  random_guy = accounts[2],
  random_guy2 = accounts[3],
  mintedAmount = 1*Math.pow(10,18),
  transferAmount = 0.5*Math.pow(10,18);

  it("should not let user spend fund they haven't", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.transfer(random_guy, transferAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should let everyone transfer their tokens", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.mintToken(random_guy, mintedAmount, {from: owner});
      }).then(function() {
        return vara.transfer(random_guy2, transferAmount, {from: random_guy});
      }).then(function() {
        return vara.balanceOf(random_guy, {from: random_guy});
      }).then(function(result){
        assert(result.toNumber()===mintedAmount-transferAmount);
      }).then(function() {
        return vara.balanceOf(random_guy2, {from: random_guy2});
      }).then(function(result){
        assert(result.toNumber()===transferAmount);
      });
  });

});
