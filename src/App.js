import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    const detail = await web3.eth.getBalance(accounts[0])
    //await web3.eth.currentProvider
    //getBalance(accounts[0])
    this.setState({ account: accounts, details: detail})
  }

  constructor(props) {
    super(props)
    this.state = { account: '', details: 'test', formvalue: '' }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({formvalue: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.formvalue);
    event.preventDefault();
  }

  //transfertoken(address, tokenvalue) {
  //}

  render() {
    return (
      <div className="container">
        <h1>Hello, World!</h1>
        <span>My account: {this.state.account} </span><br/><span> Network Version: {this.state.details}</span>
        <br/><span>Form Value:  {this.state.formvalue}</span>
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
