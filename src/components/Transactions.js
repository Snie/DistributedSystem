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
        const eventList = events.get((error, logs) => {

            let count = 0
            let tr = logs.map((e) => {
                count++
                return (
                        [
                       count,         
                        e.event,
                        e.args.from,
                        e.args.to,
                        e.value
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
                {this.state.transactions.map((t)=>{
                    return(
                            <li key={t[0].toString()}> {t.map(t2 => {
                                   return (<div>{t2}</div>)
                            })} </li>
                    )
                })}
            </div>
        )
    }
}

export default Transactions
