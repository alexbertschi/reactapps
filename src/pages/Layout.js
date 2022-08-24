// This page renders the basic layout for the navigation. NavLink specifies the navigation elements and styles them differently dependent on the isActive Property.

import { Outlet, NavLink } from "react-router-dom";
import React, { Component } from 'react'
import '../Main.css';
import detectEthereumProvider from '@metamask/detect-provider';

class Layout extends Component {

  async componentDidMount() {
    const provider = await detectEthereumProvider();

    if (provider) {

      // If the provider returned by detectEthereumProvider is not the same as window.ethereum, something is overwriting it, perhaps another wallet.

      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');

      }

      this.setState({isEnabled: true});

    } else {
      alert('Please install MetaMask!');
      this.setState({isEnabled: false});
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