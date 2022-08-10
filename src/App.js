import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import abiArray from './Liontoken.json'

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    const detail = await web3.eth.getBalance(accounts[0]);
    this.setState({account: accounts, details: detail});
  }

  constructor(props) {
    super(props)
    this.state = {account: '', details: 'test', formvalue: '', lionbalance: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({formvalue: event.target.value});
  }

  async getResult(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const contractAddress = '0x07b729491574F0b0b4f20c2BdDA8B306B5dC58FD'
    var MyContract = new web3.eth.Contract(abiArray.abi, contractAddress);
    const result = await MyContract.methods.balanceOf(this.state.formvalue).call();
    this.setState({lionbalance: result});
  
  }

  handleSubmit(event) {
    this.getResult()
    event.preventDefault();
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      
      </div>
      
    );
  }
}

export default App;
