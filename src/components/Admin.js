import React, { Component } from 'react'
import getWeb3 from '../utils/getWeb3'
import UsiCoinContract from '../../build/contracts/USIcoin.json'

class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            toApprove: "",
            web3: null
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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


    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.toApprove);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.toApprove });
    }

    render() {
        return (
            <div>
                <h1>You are now in the management area of USICoin!</h1>
                <p>Only the owner of USICoin can access this section</p>
                <h2>Authorize account:</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Account:
                        <input type="text"  onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Approve" />
                </form>
                <h2>Mint Coin:</h2>
                "TODO"
            </div>
        )
    }
}

export default Admin
