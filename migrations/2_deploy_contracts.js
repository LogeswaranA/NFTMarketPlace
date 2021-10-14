const CryptoCars = artifacts.require("CryptoCars");

module.exports = async function(deployer) {
  await deployer.deploy(CryptoCars);
};
