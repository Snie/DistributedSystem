module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      gas: 5999999,
      network_id: "*",
      from: "0x627306090abab3a6e1400e9345bc60c78a8bef57"
    }
  }
};
