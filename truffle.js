var HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = 'void artefact fly lobster run cradle benefit portion crumble expose salute image';

module.exports = {
  networks: {
    truffle: {
      host: 'localhost',
      port: 9545,
      network_id: '*'
    },
    dev: {
      provider: new HDWalletProvider(mnemonic, 'http://dev.varanida.com:8546', 0),
      network_id: '*'
    }
  }
};
