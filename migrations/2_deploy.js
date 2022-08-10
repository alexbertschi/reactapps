// migrations/2_deploy.js
const Liontoken = artifacts.require('Liontoken');

module.exports = function (deployer) {
  deployer.deploy(Liontoken);
};