

__TRUFFLE:
truffle compile 
truffle migrate

__PARITY:
parity --geth --chain dev --force-ui --reseal-min-period 0 --jsonrpc-cors http://localhost

## STEPS TO DO:

0. run >truffle develop to create a private blockchain the default port is 9545

0.1. take a account from one outputted and put it in files: /migrations/2_deploy_contracts
and in /truffle.js

1. Use >truffle compile from terminal on this folder

2. run >truffle migrate (eventually truffle migrate --reset)

3. npm run start

4. in metamask logout and import contacts from the mnemonic generated in step 0 and set the blockchain to be localhost:9545