// Landing Page which describes the basic setup and idea of the page. Ideally it forces the user to connect to metamask before navigating to other items.
  
  
  import React, { Component } from 'react'


  class Wallet extends Component {

    render() {
      return (
        <div className='Section'>
      <h1>You have to connect your wallet</h1>
      </div>
      );
    }
  }
    
    export default Wallet;