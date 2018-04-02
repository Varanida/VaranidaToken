'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - Allowance', function(accounts) {

  const owner = accounts[0],
  bad_guy = accounts[1],
  random_guy = accounts[2],
  random_guy2 = accounts[3],
  mintedAmount = 1*Math.pow(10,18);

  it("should allow people to allow transfers", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.mint(random_guy, mintedAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.approve(random_guy2, mintedAmount/2, {from: random_guy});
      }).then(function() {
        nb_calls++;
        return vara.allowance(random_guy, random_guy2, {from: bad_guy});
      }).then(function(result) {
        assert(result.toNumber()===mintedAmount/2);
      }).then(function() {
        nb_calls++;
        return vara.transferFrom(random_guy, random_guy2, mintedAmount/4, {from: random_guy2});
      }).then(function(){
        nb_calls++;
        return vara.balanceOf(random_guy2, {from: random_guy2});
      }).then(function(result){
        assert(result.toNumber()===mintedAmount/4);
        assert(nb_calls === 5);
      });
  });

  it("shouldn't allow people transfer more than they are allowed to", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.mint(random_guy, mintedAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.mint(random_guy2, mintedAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.approve(bad_guy, mintedAmount/2, {from: random_guy});
      }).then(function() {
        nb_calls++;
        return vara.transferFrom(random_guy, bad_guy, mintedAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        nb_calls++;
        return vara.transferFrom(random_guy2, bad_guy, mintedAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 5);
      });
  });

});
