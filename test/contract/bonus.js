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
        return vara.allocate(advisor, 40000000*allocateAmount, 1, {from: owner});
      }).then(function(){
        return vara.claimTokens(advisor, 52000000*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        return Time.increaseTime(0.5*year);
      }).then(function(){
        return vara.claimTokens(advisor, 52000001*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        return vara.claimTokens(advisor, 52000000*allocateAmount, 1, {from: advisor});
      }).then(function() {
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===52000000*allocateAmount);
      });
  });

  it("advisors can burn their bonuses", function() {
    var vara;
    return Varanida.new() // Redeploy Varanida contract
      .then(function(instance) {
        vara = instance;
        return vara.allocate(advisor, 40000000*allocateAmount, 1, {from: owner});
      }).then(function(){
        return vara.claimTokens(advisor, allocateAmount, 1, {from: advisor});
      }).then(function() {
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===allocateAmount);
      }).then(function(){
        return Time.increaseTime(0.5*year);
      }).then(function(){
        return vara.claimTokens(advisor, 51999999*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        return vara.claimTokens(advisor, 39999999*allocateAmount, 1, {from: advisor});
      }).then(function() {
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===40000000*allocateAmount);
      }).then(function() {
        return vara.totalSupply({from: advisor});
      }).then(function(result){
        assert(result.toNumber()===890000000*allocateAmount);
      });
  });

});
