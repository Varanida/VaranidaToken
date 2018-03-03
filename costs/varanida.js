'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida\n', function(accounts) {

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

});
