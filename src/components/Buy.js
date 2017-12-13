import React, { Component } from 'react'

class Buy extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
        }
    }

    componentWillMount() {
        // Instantiate contract once web3 provided.
        this.market()
    }

    market() {
        this.props.usiContract.balanceOf.call(this.props.user).then((result) => {
            // Update state with the result.
            return this.setState({ balance: result.c[0] })
        })

        /*this.props.usiContract.price().then((result) => {
             this.setState({ tokenPrice: result })
        })*/
        //TODO: Form to buy USICoin
    }

    render() {
        return (
            <div>
                <h1>It's time to buy some USICoins!</h1>
                <h2>Your balance is </h2>
                <p>{this.state.balance} UC</p>
                <h2>USICoin price is </h2>
                <p>{this.state.tokenPrice} ETH</p>
            </div>
        )
    }
}

export default Buy
