// Landing Page which describes the basic setup and idea of the page. Ideally it forces the user to connect to metamask before navigating to other items.
  
  import React, { Component } from 'react'
  import pic from '../coinstrategy.png'
  import axios from 'axios';
  import Web3 from 'web3'
  import NFT from '../NFT.json'
  
  const contractAddress = '0x5001C3da127e26dab3be649A3B173A1535533F17';
  const PUBLIC_KEY = '0x15607999a4473646c2DFEda6108a714586c3CBdb';
  const PRIVATE_KEY = '834bfd95e6a6e52c7f5bd8b8704fb3e42e643066aa75989ef2693510d3095468';
  let canvas = document.querySelector("canvas");
  let web3 = '';
  let MyContract = '';
  let TokenId = '';
  let accountvalue = PUBLIC_KEY;
  let name = '';


  class CreateNFT extends Component {

    constructor(props) {
      super(props);
      this.state = {value: '', accountvalue: '0x15607999a4473646c2DFEda6108a714586c3CBdb'};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeAccount = this.handleChangeAccount.bind(this);
    }

    //This method is called in the beginning and initializes the web3 object
    componentDidMount() {
      this.loadBlockchainData();
      }

    // loading the data from metamask
    async loadBlockchainData() {

    web3 = new Web3(Web3.givenProvider);
    MyContract = new web3.eth.Contract(NFT.abi, contractAddress);
    
  }

      handleChange(e) {
        this.setState({value: e.target.value});
      }

      handleChange = (e) => {
        this.setState({value: e.target.value}, () => {
          name =this.state.value;
        });
      }

      handleChangeAccount = (e) => {
        this.setState({accountvalue: e.target.value}, () => {
          accountvalue =this.state.accountvalue;
        });
      }
    
      handleSubmit(e) {
        this.drawText(this.state.value)
        e.preventDefault();
      }

    drawText(_txt) {
      canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");

      var img = new Image();
      img.onload = function () {

        
        canvas.height = img.height + 80;
        canvas.width = img.width + 10;

        ctx.fillStyle = '#171717';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ctx.drawImage(img,5,5);

       
        ctx.font = '10px verdana, sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        
        ctx.fillText(_txt + ' has successfully',125,100);
        ctx.fillText('absolved the masterclass!',125,120);
        //ctx.fillText('',5,260);
      }
      img.src = pic; 
      }
/* 
  async createPicture() {
    canvas = document.querySelector("canvas");  
    document.getElementById("MyPix").src = canvas.toDataURL("image/png");
    console.log(canvas.toDataURL("image/png"));

    var body = canvas.toDataURL("image/png")
    console.log(body);
    var bytestream = '{"Name": "'+ this.state.value +'", "TokenId: "' + TokenId +', "data": "'+ body.replace('data:image/png;base64,','' )+'"}';
    console.log(bytestream);

    await axios.post('https://tranquil-ravine-36359.herokuapp.com/return', bytestream)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 */
  async mintNFT() {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    await MyContract.methods.nextTokenId().call(function(err, res){
      //do something with res here
      console.log("NextTokenID:" + res); //for example
      TokenId = res;
      });
    
    const tokenURI = await MyContract.methods.tokenURI(0).call();
    console.log(tokenURI); 

/*     const { data } = await axios.get(tokenURI);
    console.log(data.result);
    console.log(data.result.image);
    this.setState({img: data.result.image.toString()}); */
      console.log (accountvalue);
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: MyContract.methods.mint(accountvalue).encodeABI(),
    }
    console.log("to: "+tx.to);
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

      canvas = document.querySelector("canvas");  
      document.getElementById("MyPix").src = canvas.toDataURL("image/png");
  
      var body = canvas.toDataURL("image/png")
      var bytestream = '{"Name": "'+ name +'", "TokenId": ' + TokenId +', "data": "'+ body.replace('data:image/png;base64,','' )+'"}';
  
      await axios.post('https://tranquil-ravine-36359.herokuapp.com/return', bytestream)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    
      render() {
      return (
        <div className='Section'>
      <h1>Create NFT</h1>
      <h4>Create a customized non-fungible token image for each graduate of the masterclass.</h4>
      <form onSubmit={this.handleSubmit}>
        <div className='divStyle'><label>Specify name of graduate:</label></div><div className='divStyle'>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </div>
        <button type="submit">Customize Certificate</button>
        
      </form>
      <div><canvas id="canvas"></canvas></div>
      <button onClick={this.mintNFT}>Mint NFT</button>
      <div><img alt='new' id='MyPix'></img></div>
      
      <label>
        Which account shall own the NFT?
        <select value={this.state.accountvalue} onChange={this.handleChangeAccount}>
          <option value="0x15607999a4473646c2DFEda6108a714586c3CBdb">0x15607999a4473646c2DFEda6108a714586c3CBdb (default)</option>
          <option value="0xA65C14C4b125Fb3B5eb6FD9E1FDF5EECa42ff122">0xA65C14C4b125Fb3B5eb6FD9E1FDF5EECa42ff122</option>
          <option value="0x3a42F048d42fb63DA987c75bFf78CD95ab01AE12">0x3a42F048d42fb63DA987c75bFf78CD95ab01AE12</option>
        </select>
      </label>
      
      </div>
    
      );
    
  }
}

export default CreateNFT;