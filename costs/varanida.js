'use strict';

var Varanida = artifacts.require("./Varanida.sol");
const Time = require("../test/helpers/time.js");

contract('Varanida - Mint()\n', function(accounts) {

  const owner = accounts[0],
  random_guy = accounts[1],
  gasPrice = 2, // expressed in gweis
  amount = Math.pow(10,18);

  console.log("===============================");
  console.log(" gas price = " + gasPrice + " gweis");
  console.log("===============================");

  it("mint 1 VAD", function() {
    return Varanida.deployed().then(function(instance) {
      return instance.mint.estimateGas(random_guy, amount);
    }).then(function(result) {
      var gas = Number(result);
      console.log(" (mint) gas estimation = " + gas + " units"); // 99958
      console.log(" (mint) gas cost estimation = " + Varanida.web3.fromWei((gas * gasPrice), 'ether') + " ether\n");
    });
  });

  it("mint 2th VAD in the same day", function() {
    var varanida;
    return Varanida.deployed().then(function(instance) {
      varanida = instance;
      return varanida.mint(random_guy, amount, {from: owner});
    }).then(function() {
      return varanida.mint.estimateGas(random_guy, amount);
    }).then(function(result) {
      var gas = Number(result);
      console.log(" (mint) gas estimation = " + gas + " units"); // 44738
      console.log(" (mint) gas cost estimation = " + Varanida.web3.fromWei((gas * gasPrice), 'ether') + " ether\n");
    });
  });

  it("mint 2th VAD on another day", function() {
    var varanida;
    return Varanida.deployed().then(function(instance) {
      varanida = instance;
      return varanida.mint(random_guy, amount, {from: owner});
    }).then(function(){
      return Time.increaseTime(60*60*24);
    }).then(function() {
      return varanida.mint.estimateGas(random_guy, amount);
    }).then(function(result) {
      var gas = Number(result);
      console.log(" (mint) gas estimation = " + gas + " units"); // 54958
      console.log(" (mint) gas cost estimation = " + Varanida.web3.fromWei((gas * gasPrice), 'ether') + " ether\n");
    });
  });

});
