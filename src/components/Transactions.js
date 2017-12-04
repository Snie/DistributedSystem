import React, { Component } from 'react'

class Transactions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            web3: null,
            transactions: []
        }

    }
    componentDidMount() {
        this.getTransactions()
    }


    getTransactions() {
        let events = this.props.usiContract.allEvents({ fromBlock: 0, toBlock: 'latest' });
        events.get((error, logs) => {

            let count = 0
            let tr = logs.map((e) => {
                count++
                console.log(e)
                return (
                    [
                        <tr>
                        <td>{count}</td>
                        <td>{e.event}</td>
                        <td>{e.args.from?e.args.from:"-"}</td>
                        <td>{e.args.to?e.args.to:"-"}</td>
                        <td>{(e.args.value.c)?e.args.value.c:"-"}</td>
                        </tr>
                    ]
                )

            })
            this.setState({ transactions: tr })
        });

    }

    render() {
        return (
            <div>
                <h1>All your transactions are here</h1>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Event</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Transactions
