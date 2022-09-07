// migrations/2_deploy.js

const NFT = artifacts.require("NFT");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(NFT);
  const nft = await NFT.deployed();
  await nft.mint(accounts[0]);
};


//Liontoken deployment
// const Liontoken = artifacts.require('Liontoken');

// module.exports = function (deployer) {
//   deployer.deploy(Liontoken);
// };