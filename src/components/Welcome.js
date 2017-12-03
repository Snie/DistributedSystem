import React, { Component } from 'react'

class Welcome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
        }
    }

    componentWillMount() {
        // Instantiate contract once web3 provided.
        this.instantiateContract()
    }

    instantiateContract() {
            this.props.usiContract.balanceOf.call(this.props.user).then((result) => {
                // Update state with the result.
                return this.setState({ balance: result.c[0] })
            }).then((result) => {
                return this.props.usiContract.approvedAccounts.call(this.props.user).then((result) => {
                    return this.setState({ approved: result })
                })
            })
    }

    render() {
        return (
            <div>
                <div>
                    <img src={require("../imgs/wallet.png")} alt="wallet"/>
                </div>
                <h1>Welcome to your USI Wallet!</h1>
                <p>{this.props.user}</p>
                <h2>Your balance is: </h2>
                <p>{this.state.balance}</p>
                <h2>Your account is currently {this.state.approved ? "approved" : "not approved!"} </h2>
            </div>
        )
    }
}

export default Welcome
