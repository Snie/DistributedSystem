var USIcoin = artifacts.require("./USIcoin.sol");

module.exports = function(deployer) {
  //totalsupply, name, symbol, decimals, tokenprice, centralminter
  deployer.deploy(USIcoin, 20000000000, "USIcoin" , "UC", 18, 148606075016346, "0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
};
