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
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.allocate(random_guy1, 40000000*allocateAmount, 1, {from: owner});
      }).then(function(){
        return Time.increaseTime(2*year);
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(random_guy1, 40000000*allocateAmount, 1, {from: random_guy1});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(random_guy1, {from: random_guy1});
      }).then(function(result){
        assert(result.toNumber()===40000000*allocateAmount);
      }).then(function() {
        nb_calls++;
        return vara.allocate(random_guy1, allocateAmount, 1, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 4);
      });
  });

  it("should not let owner allocate more tokens than allowed to founders", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.allocate(random_guy2, 130000000*allocateAmount, 2, {from: owner});
      }).then(function(){
        return Time.increaseTime(2*year);
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(random_guy2, 130000000*allocateAmount, 2, {from: random_guy2});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(random_guy2, {from: random_guy2});
      }).then(function(result){
        assert(result.toNumber()===130000000*allocateAmount);
      }).then(function() {
        nb_calls++;
        return vara.allocate(random_guy2, allocateAmount, 2, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 4);
      });
  });

  it("should not let owner allocate more tokens than allowed to technicals", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.allocate(random_guy3, 20000000*allocateAmount, 3, {from: owner});
      }).then(function(){
        return Time.increaseTime(2*year);
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(random_guy3, 20000000*allocateAmount, 3, {from: random_guy3});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(random_guy3, {from: random_guy3});
      }).then(function(result){
        assert(result.toNumber()===20000000*allocateAmount);
      }).then(function() {
        nb_calls++;
        return vara.allocate(random_guy3, allocateAmount, 3, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 4);
      });
  });

});
