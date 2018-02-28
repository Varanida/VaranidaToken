'use strict';

var Varanida = artifacts.require("./Varanida.sol");
const Time = require("../helpers/time.js");

contract('Varanida - claim tokens', function(accounts) {

  const owner = accounts[0],
  bad_guy = accounts[1],
  random_guy1 = accounts[2],
  random_guy2 = accounts[3],
  random_guy3 = accounts[4],
  year = 60*60*24*365,
  allocateAmount = Math.pow(10,18);

});
