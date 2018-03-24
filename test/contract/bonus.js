'use strict';

var Varanida = artifacts.require("./Varanida.sol");
const Time = require("../helpers/time.js");

contract('Varanida - claim tokens with bonus', function(accounts) {

  const owner = accounts[0],
  advisor = accounts[1],
  year = 60*60*24*365,
  allocateAmount = Math.pow(10,18);

  it("advisors can claim bonuses", function() {
    var vara;
    return Varanida.new() // Redeploy Varanida contract
      .then(function(instance) {
        vara = instance;
        return vara.allocate(advisor, 100*allocateAmount, 1, {from: owner});
      }).then(function(){
        return vara.claimTokens(advisor, 130*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        return Time.increaseTime(0.5*year);
      }).then(function(){
        return vara.claimTokens(advisor, 131*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        return vara.claimTokens(advisor, 130*allocateAmount, 1, {from: advisor});
      }).then(function() {
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===130*allocateAmount);
      });
  });

  it("advisors can burn their bonuses", function() {
    var vara;
    return Varanida.new() // Redeploy Varanida contract
      .then(function(instance) {
        vara = instance;
        return vara.allocate(advisor, 100*allocateAmount, 1, {from: owner});
      }).then(function(){
        return vara.claimTokens(advisor, 1*allocateAmount, 1, {from: advisor});
      }).then(function() {
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===1*allocateAmount);
      }).then(function(){
        return Time.increaseTime(0.5*year);
      }).then(function(){
        return vara.claimTokens(advisor, 129*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        return vara.claimTokens(advisor, 99*allocateAmount, 1, {from: advisor});
      }).then(function() {
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===100*allocateAmount);
      }).then(function() {
        return vara.totalSupply({from: advisor});
      }).then(function(result){
        assert(result.toNumber()===1000*allocateAmount);
      });
  });

});
