//Basic Routing: Links the URL to concrete react components

import {React} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../Main.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Layout from "./Layout";
import Nft from "./Nft";
import App from "./App";
import Wallet from "./Wallet";
import CreateNFT from "./CreateNFT";

export default function Routing () {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
          <Route path="nft" element={<Nft />} />
          <Route path="app" element={<App />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="createnft" element={<CreateNFT />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}