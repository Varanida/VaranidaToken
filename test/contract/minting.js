'use strict';

var Varanida = artifacts.require("./Varanida.sol");
const Time = require("../helpers/time.js");

contract('Varanida - Minting', function(accounts) {

  const owner = accounts[0],
  bad_guy = accounts[1],
  random_guy = accounts[2],
  random_guy2 = accounts[3],
  mintedAmount = 1*Math.pow(10,18);

  it("should mint tokens (twice)", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.mint(random_guy, mintedAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(random_guy, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===mintedAmount);
      }).then(function() {
        nb_calls++;
        return vara.mint(random_guy, mintedAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(random_guy, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===mintedAmount*2);
        assert(nb_calls === 4);
      });
  });

  it("should prevent from everyone minting coins", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.mint(bad_guy, mintedAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should prevent someone minting too much coins per day", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.mint(bad_guy, 20*mintedAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(bad_guy, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===20*mintedAmount);
      }).then(function() {
        nb_calls++;
        return vara.mint(bad_guy, mintedAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        return Time.increaseTime(60*60*24);
      }).then(function() {
        nb_calls++;
        return vara.mint(bad_guy, 20*mintedAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(bad_guy, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===40*mintedAmount);
        assert(nb_calls === 5);
      });
  });

});
