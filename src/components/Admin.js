import React, { Component } from 'react'

class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            toApprove: "",
            toMint: "",
            mintValue: 0,
            web3: null
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitMint = this.handleSubmitMint.bind(this);
        this.handleChangeMint = this.handleChangeMint.bind(this);
        this.handleChangeMintValue = this.handleChangeMintValue.bind(this);
    }


    handleSubmit(event) {
        console.log('A name was submitted for approve: ' + this.state.toApprove);
        this.props.usiContract.authorizeAccount(this.state.toApprove, true, {from: this.props.user}).then(receipt =>{
            console.log(receipt)
        })

        event.preventDefault();
    }

    handleSubmitMint(event) {
        console.log('A name was submitted for mint: ' + this.state.toApprove);
        this.props.usiContract.mintToken(this.state.toMint, this.state.mintValue, {from: this.props.user}).then(receipt =>{
            console.log(receipt)
        })

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ toApprove: event.target.value });
    }

    handleChangeMint(event) {
        this.setState({ toMint: event.target.value });
    }
    handleChangeMintValue(event) {
        this.setState({ mintValue: event.target.value });
    }

    render() {
        return (
            <div>
                <h1>You are now in the management area of USICoin!</h1>
                <p>Only the owner of USICoin can access this section</p>
                <h2>Authorize account:</h2>
                <form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
                    <label>
                        Account:
                        <input type="text" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Approve" className="pure-button"/>
                </form>
                <h2>Mint Coin:</h2>
                <form onSubmit={this.handleSubmitMint} className="pure-form pure-form-stacked">
                    <label>
                        Mint coins to account:
                        <input type="text" onChange={this.handleChangeMint} />
                    </label>
                    <label>
                        How much:
                        <input type="number" name="amount" onChange={this.handleChangeMintValue} />
                    </label>
                    <input type="submit" value="Send" className="pure-button"/>
                </form>
            </div>
        )
    }
}

export default Admin
