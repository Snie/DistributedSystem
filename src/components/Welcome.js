import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import UsiCoinContract from '../../build/contracts/USIcoin.json'

class Welcome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            web3: null
        }
    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                // Instantiate contract once web3 provided.
                this.instantiateContract()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    instantiateContract() {
        /*
         * SMART CONTRACT EXAMPLE
         *
         * Normally these functions would be called in the context of a
         * state management library, but for convenience I've placed them here.
         */

        const contract = require('truffle-contract')
        const usiCoin = contract(UsiCoinContract)
        usiCoin.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        var usiCoinInstance

        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            usiCoin.deployed().then((instance) => {
                usiCoinInstance = instance
                this.setState({ user: accounts[0] })

                return usiCoinInstance.balanceOf.call(accounts[0])
            }).then((result) => {
                // Update state with the result.
                return this.setState({ balance: result.c[0] })
            }).then((result) => {
                return usiCoinInstance.approvedAccounts.call(accounts[0]).then((result) => {
                    return this.setState({ approved: result })
                })
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Welcome to your USI Wallet!</h1>
                <p>{this.state.user}</p>
                <h2>Your balance is: </h2>
                <p>{this.state.balance}</p>
                <h2>Your account is currently {this.state.approved ? "approved" : "not approved!"} </h2>
            </div>
        )
    }
}

export default Welcome
