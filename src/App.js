import React, { Component } from 'react'
import Welcome from './components/Welcome'
import Admin from './components/Admin'
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


//only for prototyping
const Send = () => (
  <div>
    <h2>TO DO Send</h2>
  </div>
)

const Profile = () => (
  <div>
    <h2>TO DO Profile</h2>
  </div>
)

const Transactions = () => (
  <div>
    <h2>TO DO Transactions</h2>
  </div>
)


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
          })
        })
      }).catch(() => {
        console.log('Error finding web3.')
      })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="navbar pure-menu pure-menu-horizontal">
              <ul className="pure-menu-list">
                <li className="pure-menu-heading"><Link to="/" className="pure-menu-link">USICoin</Link></li>
                <li className="pure-menu-item"><Link to="/send" className="pure-menu-link"> Send</Link></li>
                <li className="pure-menu-item"><Link to="/profile" className="pure-menu-link">Profile</Link></li>
                <li className="pure-menu-item"><Link to="/transaction" className="pure-menu-link"> Transactions</Link></li>
                <li className="pure-menu-item"><Link to="/admin" className="pure-menu-link">  Admin</Link></li>
              </ul>
            </div>
            <main className="container">
              <div className="pure-g">
              {(this.state.usiContract!=null && this.state.user !=null)?(
                <div className="pure-u-1-1">
                  <Route exact path="/"  render={(routeProps) => (
                    <Welcome {...routeProps} {...this.state} />
                  )} />
                  <Route path="/send" render={(routeProps) => (
                    <Send {...routeProps} {...this.state} />
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
              ):"m"}
              </div>
            </main>
          </div>
        </Router>
      </div>
    );
  }
}



export default App
