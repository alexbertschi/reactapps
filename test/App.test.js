//import { render } from '@testing-library/react';
//import App from '../src/App';
//const { expect } = require('chai');
//const {artifacts} = require ('truffle');
//, contract, assert} from

//test('renders learn react link', () => {
  //render(<App />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();

  const Liontoken = artifacts.require("Liontoken");

  contract("Liontoken", (accounts) => {
    it("should put 10000 MetaCoin in the first account", async () => {
      const LiontokenInstance = await Liontoken.deployed();
      const balance = await LiontokenInstance.symbol();
  
      assert.equal(balance, 'LNT', "10000 wasn't in the first account");
    });

  })
  ;
//})