import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import abiArray from './Liontoken.json'

let nonce = '';
let web3 = '';

class App extends Component {

  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    const detail = await web3.eth.getBalance(accounts[0]);
    this.setState({account: accounts, details: detail});
  }

  constructor(props) {
    super(props)
    this.state = {web: '', account: '', details: 'test', formvalue: '', lionbalance: '', transactionoutput: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fireTransation = this.fireTransation.bind(this);
  }

  handleChange(event) {
    this.setState({formvalue: event.target.value});
  }

  async fireTransation(event){
    event.preventDefault();
    const myAddress = '0x17E32155d034d790Fd8B88Edf949e5fEE6254C44';
    const myPrivateKey = '596f2bd8bb26348f8d1a632779a15d189c01703808f9353e82601d2642edc936';
    const toAddress = '0xAf415217D78fb3A13A0F1Fedc3AAdfAEfd2284B7';
    nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
    console.log(nonce);
    this.setState({transactionoutput: nonce});

     const transaction = {
      'to': toAddress,
      'value': 10 ** 18,
      'gasPrice': 30000,
      'gasLimit': 50000,
      'nonce': nonce,
      // optional data field to send message or execute smart contract
     };
    
     const signedTx = await web3.eth.accounts.signTransaction(transaction, myPrivateKey);
     
     web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
     if (!error) {
       console.log("🎉 The hash of your transaction is: ", hash);
     } else {
       console.log("❗Something went wrong while submitting your transaction: ", error)
     }
    });


  }

  async getResult(){
    //const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const contractAddress = '0x09A1e7b8471855Ac8d4332B3cB54315242fcC3F7'
    var MyContract = new web3.eth.Contract(abiArray.abi, contractAddress);
    const result = await MyContract.methods.balanceOf(this.state.formvalue).call();
    this.setState({lionbalance: result});

     await MyContract.methods.transfer('0xAf415217D78fb3A13A0F1Fedc3AAdfAEfd2284B7', '1000000').send({from: '0x17E32155d034d790Fd8B88Edf949e5fEE6254C44'}, function(error, transactionHash){
      if (!error) {
        console.log("🎉 The hash of your transaction is: ", transactionHash);
      } else {
        console.log("❗Something went wrong while submitting your transaction: ", error)
      }
     }); 

  
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getResult()
  }
//
  render() {
    return (
      <div className="container">
        <h2>Smart Contract Simulator</h2>
        <span>My account: {this.state.account} </span>
        <br/><span> Ether-Balance: {this.state.details}</span>
        <br/><span>Form Value:  {this.state.formvalue}</span>
        <br/><span> Liontoken-Balance: {this.state.lionbalance}</span>
        <br/><span> Transaction Status: {this.state.transactionoutput}</span>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <form onSubmit={this.fireTransation}>
        <input type="submit" value="Transaction" />
      </form>
      
      </div>
      
    );
  }
}

export default App;
