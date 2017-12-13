import React, { Component } from 'react'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
        }
    }

    componentWillMount() {
        // Instantiate contract once web3 provided.
        this.walletStatus()
    }

    walletStatus() {
        this.props.usiContract.balanceOf.call(this.props.user).then((result) => {
            // Update state with the result.
            return this.setState({ balance: result.c[0] })
        }).then((result) => {
            return this.props.usiContract.authorizeAccount.call(this.props.user).then((result) => {
                return this.setState({ approved: result })
            })
        })
    }

    render() {
        return (
            <div>
                <h2>TO DO Profile</h2>
            </div>
        )
    }
}

export default Profile
