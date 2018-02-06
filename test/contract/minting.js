'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - Minting', function(accounts) {

  const owner = accounts[0],
  bad_guy = accounts[1],
  random_guy = accounts[2],
  random_guy2 = accounts[3],
  mintedAmount = 1*Math.pow(10,18);

  it("should mint tokens (twice)", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.mintToken(random_guy, mintedAmount, {from: owner});
      }).then(function() {
        return vara.balanceOf(random_guy, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===mintedAmount);
      }).then(function() {
        return vara.mintToken(random_guy, mintedAmount, {from: owner});
      }).then(function() {
        return vara.balanceOf(random_guy, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===mintedAmount*2);
      });
  });

  it("should prevent from everyone minting coins", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.mintToken(bad_guy, mintedAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should prevent someone minting too much coins in a day", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.mintToken(bad_guy, 100*mintedAmount, {from: owner});
      }).then(function() {
        return vara.balanceOf(bad_guy, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===100*mintedAmount);
      }).then(function() {
        return vara.mintToken(bad_guy, mintedAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

});
