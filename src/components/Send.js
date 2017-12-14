import React, { Component } from 'react'

class Send extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            web3: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        this.props.usiContract.transfer(this.state.to, this.state.amount, { from: this.props.user }).then(receipt => {
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
                <h1>Here you can send your USICoins
                    </h1>

                <h2>Send money to</h2>
                <form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
                    <label>
                        Account
                        <input type="text" name="to" required="required" onChange={this.handleChange} />
                    </label>
                    <label>
                        How much
                        <input type="number" name="amount" min="1" step="any" required="required" onChange={this.handleChange} />
                    </label>
                    <div>
                        <input type="submit" value="Send" className="pure-button"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Send
