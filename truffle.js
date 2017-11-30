module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 5999999,
      network_id: "*",
      from: "0x00A6A341642141014fB5fF3e1B2F97E363714631"
    }
}
};
