'use strict';

var Varanida = artifacts.require("./Varanida.sol");
const Time = require("../helpers/time.js");

contract('Varanida - allocations & claiming', function(accounts) {

  const owner = accounts[0],
  bad_guy = accounts[1],
  random_guy1 = accounts[2],
  random_guy2 = accounts[3],
  random_guy3 = accounts[4],
  random_guy4 = accounts[5],
  year = 60*60*24*365,
  allocateAmount = Math.pow(10,18);

  it("should not let users allocate tokens", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.allocate(random_guy1, allocateAmount, 3, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should not let owner allocate more tokens than allowed to advisors", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.allocate(random_guy1, 100*allocateAmount, 1, {from: owner});
      }).then(function(){
        return Time.increaseTime(2*year);
      }).then(function(){
        return vara.claimTokens(random_guy1, 100*allocateAmount, 1, {from: random_guy1});
      }).then(function() {
        return vara.balanceOf(random_guy1, {from: random_guy1});
      }).then(function(result){
        assert(result.toNumber()===100*allocateAmount);
      }).then(function() {
        return vara.allocate(random_guy1, allocateAmount, 1, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should not let owner allocate more tokens than allowed to founders", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.allocate(random_guy2, 100*allocateAmount, 2, {from: owner});
      }).then(function(){
        return Time.increaseTime(2*year);
      }).then(function(){
        return vara.claimTokens(random_guy2, 100*allocateAmount, 2, {from: random_guy2});
      }).then(function() {
        return vara.balanceOf(random_guy2, {from: random_guy2});
      }).then(function(result){
        assert(result.toNumber()===100*allocateAmount);
      }).then(function() {
        return vara.allocate(random_guy2, allocateAmount, 2, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should not let owner allocate more tokens than allowed to technicals", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.allocate(random_guy3, 100*allocateAmount, 3, {from: owner});
      }).then(function(){
        return Time.increaseTime(2*year);
      }).then(function(){
        return vara.claimTokens(random_guy3, 100*allocateAmount, 3, {from: random_guy3});
      }).then(function() {
        return vara.balanceOf(random_guy3, {from: random_guy3});
      }).then(function(result){
        assert(result.toNumber()===100*allocateAmount);
      }).then(function() {
        return vara.allocate(random_guy3, allocateAmount, 3, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should not let owner allocate more tokens than allowed to users", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.allocate(random_guy4, 400*allocateAmount, 0, {from: owner});
      }).then(function() {
        return vara.balanceOf(random_guy4, {from: random_guy4});
      }).then(function(result){
        assert(result.toNumber()===400*allocateAmount);
      }).then(function() {
        return vara.allocate(random_guy4, allocateAmount, 0, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

});
