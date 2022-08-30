//NFT Showcase: Implementation of an NFT Collection and option to trade them between accounts

  import React, { Component } from 'react'
  import Web3 from 'web3'
  import NFT from '../NFT.json'
  import axios from 'axios';
  import logo from './logo192.png';
  

  let web3 = '';
  let MyContract = '';
  const contractAddress = '0x5001C3da127e26dab3be649A3B173A1535533F17';
  const PUBLIC_KEY = '0x15607999a4473646c2DFEda6108a714586c3CBdb';
  const PRIVATE_KEY = '834bfd95e6a6e52c7f5bd8b8704fb3e42e643066aa75989ef2693510d3095468';
  
class Nft extends Component {
  
  //This method is called in the beginning and initializes the web3 object
  componentDidMount() {
    this.loadBlockchainData();
    }

      // loading the data from metamask
  async loadBlockchainData() {

    web3 = new Web3(Web3.givenProvider);
    MyContract = new web3.eth.Contract(NFT.abi, contractAddress);
    
  }

  async mintNFT() {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    MyContract.methods.nextTokenId().call(function(err, res){
      //do something with res here
      console.log("NextTokenID:" + res); //for example
      });
    
    const tokenURI = await MyContract.methods.tokenURI(0).call();
    console.log(tokenURI); 

    const { data } = await axios.get(tokenURI);
    console.log(data.result);
  
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: MyContract.methods.mint(PUBLIC_KEY).encodeABI(),
    }
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log(" Promise failed:", err)
      })
  }

    render() {
      return (
        <div className='Section'>
      <div><h1>NFT Page</h1>
      <button onClick={this.mintNFT} type="button">Mint NFT</button>
      </div>
        <div>
        <img src={logo} alt="example" />
        </div>
      </div>
      );
    }
  }
    
    export default Nft;