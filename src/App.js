import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import abiArray from './Liontoken.json'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    const detail = await web3.eth.getBalance(accounts[0]);
    this.setState({ account: accounts, details: detail});

    const contractAddress = '0x07b729491574F0b0b4f20c2BdDA8B306B5dC58FD'

    var MyContract = new web3.eth.Contract(abiArray.abi, contractAddress);

    console.log(MyContract);
    const result = await MyContract.methods.balanceOf('0x470d3224806Db26D924F33aC79A08ED8e683e570').call()
    this.setState({symbolvalue: result/(10 ** 15)});

  }

  constructor(props) {
    super(props)
    this.state = { account: '', details: 'test', formvalue: '', symbolvalue: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({formvalue: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.formvalue);
    event.preventDefault();

  }

  //transfertoken(address, tokenvalue) {
  //}

  render() {
    return (
      <div className="container">
        <h2>Smart Contract Simulator</h2>
        <span>My account: {this.state.account} </span>
        <br/><span> Balance: {this.state.details}</span>
        <br/><span>Form Value:  {this.state.formvalue}</span>
        <br/><span> Symbolvalue: {this.state.symbolvalue}</span>
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
