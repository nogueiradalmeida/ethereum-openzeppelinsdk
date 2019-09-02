const Web3 = require('web3')
//var endereco_websocket = "ws://localhost:9545"
//var provedor = new Web3.providers.WebsocketProvider(endereco_websocket)
//web3 = new Web3( provedor )
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'));


var abi=[
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "increase",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "value",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
var contractAddress = "0xCfEB869F69431e42cdB54A4F4f105C19C080A601";
//var contract = web3.eth.contract(abi).at(contractAddress);
var contract = new web3.eth.Contract(abi, contractAddress, {from: web3.eth.accounts[0]})

var Tx = require('ethereumjs-tx').Transaction;
var privateKey = new Buffer('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d', 'hex')

var rawTx = {
  nonce: '0x07',
  gasPrice: '0x0005',
  gasLimit: '0x2710',
  to: contractAddress,
  value: '0x05',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
}

var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();

// console.log(serializedTx.toString('hex'));
// 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.on('receipt', console.log);

// see eth.getTransactionReceipt() for details

/*
contract.functionName.sendTransaction(123,{
            from:web3.eth.accounts[0],
            gas:4000000},function (error, result){ //get callback from function which is your transaction key
                if(!error){
                    console.log(result);
                } else{
                    console.log(error);
                }
        });

        */