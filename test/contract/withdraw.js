'use strict';

var Varanida = artifacts.require("./Varanida.sol");
const Time = require("../helpers/time.js");

contract('Varanida - Withdraw', function(accounts) {

  const owner = accounts[0],
  owner1 = accounts[1],
  owner2 = accounts[2],
  owner3 = accounts[3],
  owner4 = accounts[4],
  receiving_addr1 = accounts[5],
  receiving_addr2 = accounts[6],
  bad_guy = accounts[7],
  year = 60*60*24*365,
  withdrawAmount = Math.pow(10,18);

  it("should not let any user use withdraw function and owner only after fix function", function() {
    var vara, nb_calls = 0;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.addOwner(owner1, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addOwner(owner2, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addOwner(owner3, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addOwner(owner4, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.withdraw(receiving_addr1, withdrawAmount, {from: owner1});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        nb_calls++;
        return vara.fixOwners({from: owner});
      }).then(function() {
        nb_calls++;
        return vara.withdraw(receiving_addr1, withdrawAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 7);
      });
  });

  it("should enable withdraw function with at least 75% of agreement", function() {
    var vara, nb_calls = 0;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.addOwner(owner1, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addOwner(owner2, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addOwner(owner3, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.addOwner(owner4, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.fixOwners({from: owner});
      }).then(function(){
        return Time.increaseTime(year);
      }).then(function() {
        nb_calls++;
        return vara.withdraw(receiving_addr1, withdrawAmount, {from: owner1});
      }).then(function() {
        nb_calls++;
        return vara.withdraw(receiving_addr1, withdrawAmount, {from: owner2});
      }).then(function() {
        nb_calls++;
        return vara.withdraw(receiving_addr2, withdrawAmount, {from: owner3});
      }).then(function() {
        nb_calls++;
        return vara.withdraw(receiving_addr2, withdrawAmount, {from: owner4});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(receiving_addr2, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===0);
      }).then(function() {
        nb_calls++;
        return vara.withdraw(receiving_addr2, 2*withdrawAmount, {from: owner1});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(receiving_addr2, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===0);
      }).then(function() {
        nb_calls++;
        return vara.withdraw(receiving_addr2, withdrawAmount, {from: owner1});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(receiving_addr2, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===withdrawAmount);
        assert(nb_calls === 14);
      });
  });

});
