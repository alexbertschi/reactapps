// This page renders the basic layout for the navigation. NavLink specifies the navigation elements and styles them differently dependent on the isActive Property.


import { Outlet, NavLink } from "react-router-dom";
import React, { Component } from 'react'
import '../Main.css';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3'


/*
const Layout = () => {

  const isEnabled = Home.isEnabled;
  console.log(Home.isEnabled);
     
  return (
    <>
        <div className="topnav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "inactive") } exact="true">Setup</NavLink>
            <NavLink to={isEnabled ? '/app' : '/wallet'} className={({ isActive }) => (isActive ? "active" : "inactive") } exact="true">Token-Transactions</NavLink>
            <NavLink to={isEnabled ? '/nft' : '/wallet'} className={({ isActive }) => (isActive ? "active" : "inactive")} exact="true">NFTs</NavLink>
        </div>
      <Outlet />
    </>
  )
};

export default Layout;

*/


class Layout extends Component {


  async componentDidMount() {
    const provider = await detectEthereumProvider();

    if (provider) {

      // If the provider returned by detectEthereumProvider is not the same as window.ethereum, something is overwriting it, perhaps another wallet.

      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');

      }

      const web3 = new Web3(Web3.givenProvider);
      web3.eth.getChainId().then(console.log);
      
      const accountarray = await web3.eth.getAccounts();
      console.log(accountarray[0]);
      this.setState({isEnabled: true});
      console.log("richtig: " +this.state.isEnabled);

    } else {
      alert('Please install MetaMask!');
      this.setState({isEnabled: false});
      console.log("falsch: " + this.state.isEnabled);
    }
  }

  constructor(props) {
    super(props)
    this.state = {isEnabled: false}
  }

  render() {
    return (
    <>
        <div className="topnav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "inactive") } exact="true">Setup</NavLink>
            <NavLink to={this.state.isEnabled ? '/app' : '/wallet'} className={({ isActive }) => (isActive ? "active" : "inactive") } exact="true">Token-Transactions</NavLink>
            <NavLink to={this.state.isEnabled ? '/nft' : '/wallet'} className={({ isActive }) => (isActive ? "active" : "inactive")} exact="true">NFTs</NavLink>
        </div>
      <Outlet />
    </>
    );
  }
}
  
  export default Layout;