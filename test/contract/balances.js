'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - Balances', function(accounts) {

  const owner = accounts[0],
  random_guy = accounts[1],
  random_guy2 = accounts[2],
  tokenIssued = 1000*Math.pow(10,18),
  mintedAmount = 1*Math.pow(10,18);

  it("should let everyone see every balances", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.mintToken(random_guy2, mintedAmount, {from: owner});
      }).then(function() {
        return vara.balanceOf(random_guy2, {from: random_guy});
      }).then(function(result){
        assert(result.toNumber()===mintedAmount);
      });
  });

  it("should return totalSupply", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.totalSupply({from: owner});
      }).then(function(result){
        assert(result.toNumber()===tokenIssued);
      });
  });

});
