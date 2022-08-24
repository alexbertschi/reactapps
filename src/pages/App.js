//Page for Token and Ether Transactions

import React, { Component } from 'react'
import Web3 from 'web3'
import '../Main.css'
import abiArray from '../Liontoken.json'
import ToggleButton from 'react-toggle-button'
import detectEthereumProvider from '@metamask/detect-provider';

let nonce = '';
let web3 = '';

class App extends Component {

  componentDidMount() {
    this.loadBlockchainData()
  }

  constructor(props) {
    super(props)
    this.state = {receiver: '', asset: false, web: '', account: '', details: 'test', formvalue: '', lionbalance: '', transactionoutput: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.fireTransation = this.fireTransation.bind(this);
  }

  async loadBlockchainData() {

  web3 = new Web3(Web3.givenProvider);
  this.setState({account: await web3.eth.getAccounts()});
  console.log(this.state.account[0]);

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

  handleChange(event) {
    this.setState({formvalue: event.target.value});
  }

  handleChange2(event) {
    this.setState({receiver: event.target.value});
  }

  async fireTransation(event){

    if (this.state.asset){
      const myAddress = this.state.account[0];
      const myPrivateKey = '834bfd95e6a6e52c7f5bd8b8704fb3e42e643066aa75989ef2693510d3095468';
      const ethervalue = this.state.formvalue * 10 ** 18;
      nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
      this.setState({transactionoutput: nonce});

      const transaction = {
        'to': this.state.receiver,
        'value': ethervalue,
        'gasPrice': 30000,
        'gasLimit': 50000,
        'nonce': nonce,
      };
      
      const signedTx = await web3.eth.accounts.signTransaction(transaction, myPrivateKey);
      
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
      if (!error) {
        console.log("🎉 The hash of your transaction is: ", hash);
      } else {
        console.log("❗Something went wrong while submitting your transaction: ", error)
      }
      });
      
    } else {
      const contractAddress = '0xD03c25F1d86379a8fc8362c6D07441456BBfa340'
      console.log('2')
      var MyContract = new web3.eth.Contract(abiArray.abi, contractAddress);
      console.log('3')
      const result = await MyContract.methods.balanceOf(this.state.receiver).call();
      console.log('4')
      this.setState({lionbalance: result});

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
            <div className = 'tdnopadding'>Liontoken</div>
            <div className = 'tdnopadding'>
          <ToggleButton
            inactiveLabel={' L '}
            activeLabel={' E '}
            value={ this.state.asset || false }
            onToggle={(value) => {
              this.setState({
                asset: !value,
              })
            }} />
            </div>
            <div className = 'tdnopadding'>Ether
            </div>
          </td>
          </tr>
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