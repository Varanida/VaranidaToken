'use strict';

var Varanida = artifacts.require("./Varanida.sol");
const Time = require("../helpers/time.js");

contract('Varanida - claim tokens with bonus', function(accounts) {

  const owner = accounts[0],
  advisor = accounts[1],
  year = 60*60*24*365,
  allocateAmount = Math.pow(10,18);

  it("advisors can claim bonuses", function() {
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
        return vara.allocate(advisor, 40000000*allocateAmount, 1, {from: owner});
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(advisor, 52000000*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        return Time.increaseTime(0.5*year);
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(advisor, 52000001*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(advisor, 52000000*allocateAmount, 1, {from: advisor});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===52000000*allocateAmount);
      }).then(function() {
        nb_calls++;
        return vara.reserveBalance({from: owner});
      }).then(function(result){
        assert(result.toNumber()===(reserveBalance-(12000000*allocateAmount)));
        assert(nb_calls === 7);
      });
  });

  it("advisors can burn their bonuses", function() {
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
        return vara.allocate(advisor, 40000000*allocateAmount, 1, {from: owner});
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(advisor, allocateAmount, 1, {from: advisor});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===allocateAmount);
      }).then(function(){
        return Time.increaseTime(0.5*year);
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(advisor, 51999999*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(advisor, 39999999*allocateAmount, 1, {from: advisor});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===40000000*allocateAmount);
      }).then(function() {
        nb_calls++;
        return vara.reserveBalance({from: owner});
      }).then(function(result){
        assert(result.toNumber()===reserveBalance);
        assert(nb_calls === 8);
      });
  });

  it("owner can can burn advisors bonuses", function() {
    var vara, nb_calls = 0;
    return Varanida.new() // Redeploy Varanida contract
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.allocate(advisor, 40000000*allocateAmount, 1, {from: owner});
      }).then(function(){
        return Time.increaseTime(0.5*year);
      }).then(function(){
        nb_calls++;
        return vara.cancelAdvisorBonus(advisor, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        nb_calls++;
        return vara.cancelAdvisorBonus(advisor, {from: owner});
      }).then(function(res) {
        assert(res);
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(advisor, 52000000*allocateAmount, 1, {from: advisor});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      }).then(function(){
        nb_calls++;
        return vara.claimTokens(advisor, 40000000*allocateAmount, 1, {from: advisor});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(advisor, {from: advisor});
      }).then(function(result){
        assert(result.toNumber()===40000000*allocateAmount);
        assert(nb_calls === 6);
      });
  });

});
