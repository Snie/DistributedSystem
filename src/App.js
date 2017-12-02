import React, { Component } from 'react'
import Welcome from './components/Welcome'
import Admin from './components/Admin'
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
                <div className="pure-u-1-1">
                  <Route exact path="/" component={Welcome} />
                  <Route path="/send" component={Send} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/transaction" component={Transactions} />
                  <Route path="/admin" component={Admin} />
                </div>
              </div>
            </main>
          </div>
        </Router>
      </div>
    );
  }
}



export default App
