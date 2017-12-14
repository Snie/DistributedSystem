import React, { Component } from 'react'

class Profile extends Component {
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
        //this.walletStatus()
    }

    walletStatus() {

    }

    handleSubmit(event) {
        let hashEmail = this.props.web3.sha3(this.state.email)
        console.log(hashEmail)
        this.props.usiContract.setEmail(hashEmail, this.props.user, { from: this.props.user }).then(receipt => {
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
                TODO: set hash of email in a map so we know the association hashemail -> address
                <h1>This is your personal page</h1>
                <h2>Set your @usi.ch email so others can send you USICoin with that</h2>
                <form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
                    <label>
                        Email
                        <input type="email"required="required"  name="email" onChange={this.handleChange} />
                    </label>
                    <div>
                        <input type="submit" value="Set" className="pure-button"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Profile
