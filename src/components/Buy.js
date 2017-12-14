import React, { Component } from 'react'

class Buy extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        this.props.usiContract.getPrice.call().then((result) => {
            //let price = this.props.web3.fromWei(result.c[0], "ether") 
            let price = result.c[0]
            this.setState({ tokenPrice: price })
        })
        
    }

    handleSubmit(event) {
        this.props.usiContract.buy({ from: this.props.user, value: this.props.web3.toWei(this.state.amount, "ether") }).then(receipt => {
            alert("Transaction successful!")
        })

        event.preventDefault();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <h1>It's time to buy some USICoins!</h1>
                <h2>Your balance is </h2>
                <p>{this.state.balance} UC</p>
                <h2>USICoin price is </h2>
                <p>{this.state.tokenPrice} ETH</p>
                <h2>How many USICoins do you want to buy?</h2>
                <form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
                    <label>
                        Amount in ETH
                        <input type="number" min="1" step="any" required="required" name="amount" onChange={this.handleChange} />
                    </label>
                    <div>
                        <input type="submit" value="Buy" className="pure-button" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Buy
