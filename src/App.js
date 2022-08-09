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
    this.state = { account: '', details: 'test' }
  }

  render() {
    return (
      <div className="container">
        <h1>Hello, World!</h1>
        <span>My account: {this.state.account} </span><br/><span> Network Version: {this.state.details}</span>
      </div>
      
    );
  }
}

export default App;
