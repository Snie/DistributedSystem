var USIcoin = artifacts.require("./USIcoin.sol");

module.exports = function(deployer) {
  deployer.deploy(USIcoin, 20000000000, "USIcoin" , "%", 2, "0x627306090abab3a6e1400e9345bc60c78a8bef57");
};
