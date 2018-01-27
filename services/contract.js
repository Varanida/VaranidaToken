const Web3 = require('web3');
const VaranidaContract = require('../build/contracts/Varanida.json');

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const _contractAddress = "0xb06deb78b67cea30c609ef156b5934d7868c9498";
const mycontract = web3.eth.contract(VaranidaContract["abi"]);
const Varanida = mycontract.at(_contractAddress);

module.exports = Varanida;
