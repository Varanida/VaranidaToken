const Web3 = require('web3');
const VaranidaContract = require('../build/contracts/Varanida.json');

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://dev.varanida.com:8546/'));

const _contractAddress = "0x481165347d4c7bcad9e0287c23e206f843a88270";
const mycontract = web3.eth.contract(VaranidaContract["abi"]);
const Varanida = mycontract.at(_contractAddress);

module.exports = Varanida;
