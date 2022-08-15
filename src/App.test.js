import { render } from '@testing-library/react';
import App from './App';
import { artifacts, contract, assert} from "truffle";

test('renders learn react link', () => {
  render(<App />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();

  const Liontoken = artifacts.require("Liontoken");

  contract("Liontoken", (accounts) => {
    it("should put 10000 MetaCoin in the first account", async () => {
      const LiontokenInstance = await Liontoken.deployed();
      const balance = await LiontokenInstance.getBalance.call(accounts[0]);
  
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });

  });
})