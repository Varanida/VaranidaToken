'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - ICO', function(accounts) {

  const owner = accounts[0],
  bad_guy = accounts[1],
  random_guy = accounts[2],
  random_guy2 = accounts[3],
  allocateAmount = Math.pow(10,18);

  it("should allocate tokens (twice)", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.allocateTokens(random_guy, allocateAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(random_guy, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===allocateAmount);
      }).then(function() {
        nb_calls++;
        return vara.allocateTokensBatch([random_guy], [allocateAmount], {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(random_guy, {from: owner});
      }).then(function(result){
        assert(result.toNumber()===allocateAmount*2);
        assert(nb_calls === 4);
      });
  });

  it("should not let users allocate tokens", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.allocateTokens(random_guy, allocateAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function() {
        nb_calls++;
        return vara.allocateTokensBatch([bad_guy], [allocateAmount], {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 2);
      });;
  });

  it("should not let owner allocate more tokens than allowed to users", function() {
    var vara, nb_calls = 0;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.allocateTokens(random_guy, 670000000*allocateAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.allocateTokens(random_guy, allocateAmount, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        // error throwed by math library (assert throw)
        assert(err.message.search('invalid opcode') >= 0);
      }).then(function() {
        nb_calls++;
        return vara.allocateTokensBatch([random_guy, random_guy2], [allocateAmount, allocateAmount], {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        // error throwed by math library (assert throw)
        assert(err.message.search('invalid opcode') >= 0);
        assert(nb_calls === 3);
      });
  });

  it("Owner should burn undistributed ICO tokens", function() {
    var vara, nb_calls = 0;
    var reserveBalance;
    return Varanida.new() // Redeploy Varanida contract
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.reserveBalance({from: owner});
      }).then(function(result){
        reserveBalance = result.toNumber();
      }).then(function() {
        nb_calls++;
        return vara.allocateTokens(random_guy, 170000000*allocateAmount, {from: owner});
      }).then(function(){
        nb_calls++;
        return vara.burnUndistributedTokens({from: random_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        nb_calls++;
        return vara.burnUndistributedTokens({from: owner});
      }).then(function() {
        nb_calls++;
        return vara.allocateTokens(random_guy, allocateAmount, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        // error throwed by math library (assert throw)
        assert(err.message.search('invalid opcode') >= 0);
      }).then(function(){
        nb_calls++;
        return vara.burnUndistributedTokens({from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
        assert(nb_calls === 6);
      });
  });

  it("should update totalSupply", function() {
    var vara, nb_calls = 0;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.totalSupply({from: owner});
      }).then(function(result){
        assert(result.toNumber() === 0);
      }).then(function() {
        nb_calls++;
        return vara.allocateTokens(random_guy, 10000000*allocateAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.allocateTokensBatch([random_guy, random_guy2], [10000000*allocateAmount, 10000000*allocateAmount], {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.totalSupply({from: owner});
      }).then(function(result){
        assert(result.toNumber() === 30000000*allocateAmount);
        assert(nb_calls === 4);
      });
  });

});
