'use strict';

var Varanida = artifacts.require("./Varanida.sol");

contract('Varanida - Ico', function(accounts) {

  const owner = accounts[0],
  bad_guy = accounts[1],
  random_guy = accounts[2],
  allocateAmount = 1*Math.pow(10,18);

  it("should not let user issue the ico tokens", function() {
    var vara;
    return Varanida.deployed()
      .then(function(instance) {
        vara = instance;
        return vara.allocate(random_guy, allocateAmount, 2, {from: bad_guy});
      }).then(function() {
        assert.fail('This won\'t happen.');
      }).catch(function(err) {
        assert(err.message.search('revert') >= 0);
      });
  });

});
