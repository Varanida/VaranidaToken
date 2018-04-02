'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - Balances', function(accounts) {

  const owner = accounts[0],
  random_guy = accounts[1],
  random_guy2 = accounts[2],
  mintedAmount = 1*Math.pow(10,18);

  it("should let everyone see every balances", function() {
    var vara, nb_calls = 0;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.mint(random_guy2, mintedAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.balanceOf(random_guy2, {from: random_guy});
      }).then(function(result){
        assert(result.toNumber()===mintedAmount);
        assert(nb_calls === 2);
      });
  });

  it("should return totalSupply", function() {
    var vara, nb_calls = 0;
    return Varanida.new()
      .then(function(instance) {
        vara = instance;
        nb_calls++;
        return vara.totalSupply({from: owner});
      }).then(function(result){
        assert(result.toNumber()===970000000*mintedAmount);
      }).then(function() {
        nb_calls++;
        return vara.mint(random_guy, 10000000*mintedAmount, {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.totalSupply({from: owner});
      }).then(function(result){
        assert(result.toNumber()===980000000*mintedAmount);
      }).then(function() {
        nb_calls++;
        return vara.mintBatch([random_guy, random_guy2], [10000000*mintedAmount, 10000000*mintedAmount], {from: owner});
      }).then(function() {
        nb_calls++;
        return vara.totalSupply({from: owner});
      }).then(function(result){
        assert(result.toNumber()===1000000000*mintedAmount);
        assert(nb_calls === 5);
      });
  });

});
