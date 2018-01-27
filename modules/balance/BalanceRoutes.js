'use strict';

const Balance = require('./BalanceController');

module.exports = function (router) {

  router.param('address', Balance.fetch);

  router.route('/:address/balance')
    .get(Balance.send);

};
