var Migrations = artifacts.require("./Migrations.sol");
var USIcoin = artifacts.require("./USIcoin.sol");

module.exports = function(deployer) {
  // deployer.deploy(Migrations);
  deployer.deploy(USIcoin, 20000000000, "USIcoin" , "%", 2, "0x00A6A341642141014fB5fF3e1B2F97E363714631");
};
