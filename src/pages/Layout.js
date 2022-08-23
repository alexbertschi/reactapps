// This page renders the basic layout for the navigation. NavLink specifies the navigation elements and styles them differently dependent on the isActive Property.


import { Outlet, NavLink } from "react-router-dom";
import '../Main.css';

const Layout = () => {
  return (
    <>
        <div className="topnav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "inactive") } exact="true">Setup</NavLink>
            <NavLink to="/app" className={({ isActive }) => (isActive ? "active" : "inactive") } exact="true">Token-Transactions</NavLink>
            <NavLink to="/nft" className={({ isActive }) => (isActive ? "active" : "inactive") } exact="true">NFTs</NavLink>
        </div>
      <Outlet />
    </>
  )
};

export default Layout;