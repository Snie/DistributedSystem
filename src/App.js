import React, { Component } from 'react'
import Welcome from './components/Welcome'
import Admin from './components/Admin'
import Profile from './components/Profile'
import Buy from './components/Buy'
import Send from './components/Send'
import Transactions from './components/Transactions'
import { Web3Provider } from 'react-web3';
import { HashLoader } from 'react-spinners';
import getWeb3 from './utils/getWeb3'
import UsiCoinContract from '../build/contracts/USIcoin.json'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      usiContract: null,
      user: null,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })
        const contract = require('truffle-contract')
        const usiCoin = contract(UsiCoinContract)
        usiCoin.setProvider(this.state.web3.currentProvider)

        this.state.web3.eth.getAccounts((error, accounts) => {
          usiCoin.deployed().then((instance) => {
            this.setState({ usiContract: instance })
            this.setState({ user: accounts[0] })

            instance.owner.call().then((result) => {
              this.setState({ admin: result })
            })
          })
        })
      }).catch(() => {
        console.log('Error finding web3.')
      })
  }

  render() {
    return (
      <div className="App">
        <Web3Provider onChangeAccount={() => document.location.reload()}>
          <Router>
            <div>
              <div className="navbar pure-menu pure-menu-horizontal">
                <ul className="pure-menu-list">
                  <li className="pure-menu-heading"><Link to="/" className="pure-menu-link">USICoin</Link></li>
                  <li className="pure-menu-item"><Link to="/send" className="pure-menu-link">Send</Link></li>
                  {(this.state.admin !== this.state.user) ? (
                    <li className="pure-menu-item"><Link to="/buy" className="pure-menu-link">Buy</Link></li>
                  ) : ""}
                  <li hidden className="pure-menu-item"><Link to="/profile" className="pure-menu-link">Profile</Link></li>
                  <li className="pure-menu-item"><Link to="/transaction" className="pure-menu-link">Transactions</Link></li>
                  {(this.state.admin === this.state.user) ? (
                    <li className="pure-menu-item"><Link to="/admin" className="pure-menu-link pure-button-primary">  Admin</Link></li>
                  ) : ""}
                </ul>
              </div>
              <main className="container">
                <div className="pure-g">
                  <div className="pure-u-1-1">
                    {(this.state.usiContract != null && this.state.user != null) ? (
                      <div>
                        <Route exact path="/" render={(routeProps) => (
                          <Welcome {...routeProps} {...this.state} />
                        )} />
                        <Route path="/send" render={(routeProps) => (
                          <Send {...routeProps} {...this.state} />
                        )} />
                        <Route path="/buy" render={(routeProps) => (
                          <Buy {...routeProps} {...this.state} />
                        )} />
                        <Route path="/profile" render={(routeProps) => (
                          <Profile {...routeProps} {...this.state} />
                        )} />
                        <Route path="/transaction" render={(routeProps) => (
                          <Transactions {...routeProps} {...this.state} />)} />
                        <Route path="/admin" render={(routeProps) => (
                          <Admin {...routeProps} {...this.state} />
                        )} />
                      </div>
                    ) : <div> Your Wallet is Loading...<HashLoader /> </div>}
                  </div>
                </div>
              </main>
            </div>
          </Router>
        </Web3Provider>
      </div>
    );
  }
}



export default App
