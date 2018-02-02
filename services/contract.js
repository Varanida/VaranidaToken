const Web3 = require('web3');
const VaranidaContract = require('../build/contracts/Varanida.json');

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:9545'));

const _contractAddress = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";
const mycontract = web3.eth.contract(VaranidaContract["abi"]);
const Varanida = mycontract.at(_contractAddress);

module.exports = Varanida;
