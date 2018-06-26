const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = "<mnemonic phrase>";

module.exports = {
  networks: {
    truffle: {
      host: 'localhost',
      port: 9545,
      network_id: '*'
    },
    dev: {
      provider:function(){
        return new HDWalletProvider(mnemonic, "<uri>")
      },
      network_id: '*'
    }
  },
  solc: {
    version: "0.4.24",
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
