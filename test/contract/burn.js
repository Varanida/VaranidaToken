'use strict';

var Varanida = artifacts.require("./Varanida.sol");
const Time = require("../helpers/time.js");

contract('Varanida - burn ico tokens', function(accounts) {

  const owner = accounts[0],
  random_account = accounts[1],
  allocateAmount = Math.pow(10,18);

  it("Owner should burn undistributed ICO tokens", function() {
    var vara;
    var reserveBalance;
    return Varanida.new() // Redeploy Varanida contract
      .then(function(instance) {
        vara = instance;
        return vara.reserveBalance({from: owner});
      }).then(function(result){
        reserveBalance = result.toNumber();
      }).then(function() {
        return vara.totalSupply({from: random_account});
      }).then(function(result){
        assert(result.toNumber()===1000000000*allocateAmount);
      }).then(function() {
        return vara.allocate(random_account, 170000000*allocateAmount, 0, {from: owner});
      }).then(function(){
        return vara.burnUndistributedTokens({from: random_account});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        return vara.burnUndistributedTokens({from: owner});
      }).then(function(res){
        assert(res);
      }).then(function() {
        return vara.totalSupply({from: random_account});
      }).then(function(result){
        assert(result.toNumber()===500000000*allocateAmount);
      });
  });

});
