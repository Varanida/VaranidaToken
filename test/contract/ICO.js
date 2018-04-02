'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - ICO', function(accounts) {

  const owner = accounts[0],
  bad_guy = accounts[1],
  random_guy = accounts[2],
  allocateAmount = Math.pow(10,18);

  it("should not let users allocate tokens", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.allocateTokens(random_guy, allocateAmount, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

  it("should not let owner allocate more tokens than allowed to users", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.allocateTokens(random_guy, 670000000*allocateAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(random_guy, {from: random_guy});
      }).then(function(result){
        assert(result.toNumber()===670000000*allocateAmount);
      }).then(function() {
        nb_calls++;
        return vara.allocateTokens(random_guy, allocateAmount, {from: owner});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
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
        return vara.totalSupply({from: random_guy});
      }).then(function(result){
        assert(result.toNumber()===970000000*allocateAmount);
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
      }).then(function(res){
        assert(res);
      }).then(function() {
        nb_calls++;
        return vara.totalSupply({from: random_guy});
      }).then(function(result){
        assert(result.toNumber()===470000000*allocateAmount);
        assert(nb_calls === 6);
      });
  });

});
