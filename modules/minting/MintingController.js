'use strict';

const varanida = require('../../services/contract');
const owner = '0x627306090abab3a6e1400e9345bc60c78a8bef57';

class MintingController {

  static mint(req, res, next) {
    try {
      varanida.mintToken(req.params.address, req.params.mintedAmount, {from: owner, gas: 4000000},
        function (err, result){
          if (err) {
            req.minted = {
              success: false,
              messsage: "Error while calling 'mintToken' function in smart-contract."
            };
          } else {
            req.minted = {success: true};
          }
          next();
        })
    } catch (err) {
      req.minted = {success: false, messsage: err.name};
      next();
    }
  }

  static send (req, res) {
    res.send(req.minted);
  }

}

module.exports = MintingController;
