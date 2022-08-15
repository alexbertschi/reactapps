import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import abiArray from './Liontoken.json'
import ToggleButton from 'react-toggle-button'
//import Dropdown from 'react-bootstrap/Dropdown';

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
    this.state = {asset: false, web: '', account: '', details: 'test', formvalue: '', lionbalance: '', transactionoutput: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fireTransation = this.fireTransation.bind(this);
    //this.dropdownSelection = this.dropdownSelection.bind(this);
  }

  handleChange(event) {
    this.setState({formvalue: event.target.value});
  }

  async fireTransation(event){
    event.preventDefault();
    console.log(this.state.account[0]);
    const myAddress = this.state.account[0];
    const myPrivateKey = '941c2f19f148e932a3ae7c0e637a3622fc40ee585dadeea705dc817881173f87';
    const toAddress = '0x17E32155d034d790Fd8B88Edf949e5fEE6254C44';
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
        <div className='Section'>
        <h2>Smart Contract Simulator</h2>
        
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
      </div>
{/*       dropdownSelection(event) {
      this.setState({asset: event});
      console.log(event)

      <Dropdown onSelect={this.dropdownSelection} >
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Asset
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item eventKey="Ether">Ether</Dropdown.Item>
                <Dropdown.Item eventKey="Liontoken">Liontoken</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>  */}

      <div className='Section'>
      <h3>Transaction Cockpit</h3>
      
      <table className = 'tablestyle'>
        <thead>
          <tr>
            <th>Input</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sender Account:</td>
            <td> {this.state.account} </td>
          </tr>
          <tr>
            <td>Receiver Account:</td>
            <td> 
              <form>
                <input type="text" value={this.state.value} onChange={this.handleChange} size='45'/>
              </form>
            </td>
          </tr>
          <tr>
          <td>Asset:</td>
          <td>
            <td className = 'tdnopadding'>Liontoken</td>
            <td className = 'tdnopadding'>
          <ToggleButton
            inactiveLabel={' E '}
            activeLabel={' L '}
            value={ this.state.asset || false }
            onToggle={(value) => {
              this.setState({
                asset: !value,
              })
            }} />
            </td>
            <td className = 'tdnopadding'>Ether
            </td>
          </td>
          </tr>
          <tr>
          <td/>
          <td>
          <form onSubmit={this.fireTransation}>
              <input type="submit" value="Transaction" />
          </form>
          </td>
          </tr>
          </tbody>
      </table>
      </div>
      </div>
      
    );
  }
}

export default App;
