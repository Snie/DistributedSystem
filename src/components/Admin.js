import React, { Component } from 'react'

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


    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.toApprove);
        this.props.usiContract.approveAccount(this.state.toApprove, true, {from: this.props.user}).then(receipt =>{
            console.log(receipt)
        })

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ toApprove: event.target.value });
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
                "TODO"
            </div>
        )
    }
}

export default Admin
