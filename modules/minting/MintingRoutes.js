'use strict';

const Minting = require('./MintingController');

module.exports = function (router) {

  router.route('/:address/mint/:mintedAmount')
    .post(Minting.mint, Minting.send);

};
