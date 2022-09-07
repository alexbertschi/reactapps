//Page for Token and Ether Transactions

import React, { Component } from 'react'
import Web3 from 'web3'
import '../Main.css'
import abiArray from '../Liontoken.json'
import ToggleButton from 'react-toggle-button'

//Variable stored outside the block as it is used in multiple methods
let web3 = '';

//Class which displays the Transaction cockpit where Liontoken and Ether can be sent to other accounts
class App extends Component {

  //This method is called in the beginning and initializes the web3 object
  componentDidMount() {
    this.loadBlockchainData();
    }

  //displays an additional line if Token is seleted to add the contract address
  displaycontract() {
    if(this.state.asset){
      this.setState({contractString: <tr><td>Contract Address:</td><td>
        <input type="text" value={this.state.contractAddress} onChange={this.handleChange3} size='45'/>
        </td></tr>});
    } else {
      this.setState({contractString: ''});
    }
    }

  //standard constructor which declares the states and 
  constructor(props) {
    super(props)
    this.state = {receiver: '', asset: true, web: '', account: '', details: 'test', formvalue: '', transactionoutput: '', contractString: '', contractAddress: process.env.REACT_APP_TOKENCONTRACT}
    //Makes the values of the method available (in this case input and button elements and their values)
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.fireTransation = this.fireTransation.bind(this);
  }

  // loading the data from metamask
  async loadBlockchainData() {
    web3 = new Web3(Web3.givenProvider);
    this.setState({account: await web3.eth.getAccounts()});
  }

      /**********************************************************/
      /* Handle chain (network) and chainChanged (per EIP-1193) */
      /**********************************************************/

   /*   const chainId = await provider.request({ method: 'eth_chainId' });
      console.log("Chain ID: " + chainId);
      //this.handleChainChanged(chainId);

      //provider.on('chainChanged', handleChainChanged);

      // From now on, this should always be true:

      web3 = new Web3(Web3.currentProvider);
      connected = true;
      
  }

  //Listens to event when Chain is changed and executes function to reload the page

//Reloads the page when Chain is changed
handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}
*/

  // Storing the value of the input field "amount" in the state under formvalue everytime a value has changed in the input field(when typing)
  handleChange(event) {
    this.setState({formvalue: event.target.value});
  }

  // Storing the value of the input field "Receiver Account" in the state under receiver everytime a value has changed in the input field(when typing)
  handleChange2(event) {
    this.setState({receiver: event.target.value});
  }

  // Storing the value of the input field "Receiver Account" in the state under receiver everytime a value has changed in the input field(when typing)
  handleChange3(event) {
    this.setState({contractAddress: event.target.value});
  }

  //Method which is executed when the "Transaction"-Button is clicked
  async fireTransation(event){

    //If the toggle button is true it refers to Ether, if false it refers to Token. To transfer a token, the token address has to be provided
    if (this.state.asset){

      //ETHER TRANSFER
      const myAddress = this.state.account[0];
      const ethervalue = this.state.formvalue * 10 ** 18;
      const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); //Pull the nonce from the transaction count of the actual address
      this.setState({transactionoutput: nonce});

      //define the transaction object with the inputs and standard values for gasPrice and gasLimit
      const transaction = {
        'from': this.state.account.toString(),
        'to': this.state.receiver,
        'value': ethervalue,
        'gasPrice': 30000,
        'gasLimit': 50000,
        'nonce': nonce,
      };
         
      //Send transaction sends an unsigned transaction. To sign it, it would be required to store the private key of the sender account
      web3.eth.sendTransaction(transaction, function(error, hash) {
      if (!error) {
        console.log("🎉 The hash of your transaction is: ", hash);
      } else {
        console.log("❗Something went wrong while submitting your transaction: ", error)
      }
      });
      
    } else {
    //TOKEN TRANSFER
      var MyContract = new web3.eth.Contract(abiArray.abi, this.state.contractAddress); //The ABI is required to talk to a contract. This is stored in the Liontoken.json file which is copied to src

      //Call the transfer method defined in Lioncontract. Similarly all other methods defined in the contract could be called. 
      await MyContract.methods.transfer(this.state.receiver, this.state.formvalue).send({from: this.state.account.toString()}, function(error, transactionHash){
        if (!error) {
          console.log("🎉 The hash of your transaction is: ", transactionHash);
        } else {
          console.log("❗Something went wrong while submitting your transaction: ", error)
        }
      }); 

    }
  }

  render() {
    return (
      <div className='Section'>
      
      <h3>Transaction Cockpit </h3>
      
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
              <input type="text" value={this.state.receiver} onChange={this.handleChange2} size='45'/>
            </td>
          </tr>
          <tr>
            <td>Amount:</td>
            <td>
              <input type="text" value={this.state.formvalue} onChange={this.handleChange} size='45'/>
            </td>
          </tr>
          <tr>
          <td>Asset:</td>
          <td>
            <div className = 'tdnopadding'>Token</div>
            <div className = 'tdnopadding'>
          <ToggleButton
            inactiveLabel={' T '}
            activeLabel={' E '}
            value={ this.state.asset || false }
            onToggle={(value) => {
              this.setState({
                asset: !value,
              })
              this.displaycontract();
            }
            } />
            </div>
            <div className = 'tdnopadding'>Ether
            </div>
          </td>
          </tr>
            {this.state.contractString}
          <tr>
          <td/>
          <td>
          <button onClick={this.fireTransation} type="button">Transaction</button>
          </td>
          </tr>
          </tbody>
      </table>
      </div>
           
    );
  }
}

export default App;