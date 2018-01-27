'use strict';

const varanida = require('../../services/contract');

class BalanceController {

  static fetch(req, res, next, id) {
    try {
      varanida.balanceOf(id ,function(err, data){
        if (err) {
          res.status(400).send(`Unable to fetch address: ${id}.`);
        } else {
          req.balance = data;
          next();
        }
      });
    } catch (err) {
      res.status(400).send(`Unable to fetch address: ${id}.`);
    }
  }

  static send (req, res) {
    res.send(req.balance);
  }

}

module.exports = BalanceController;
