import React from 'react';
import Login from './Login';
import { Button, Container, Col, Row } from 'react-bootstrap';
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import Registration from './Registration';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      auth: false
    }
    this.authUpdate = this.authUpdate.bind(this)
  }

  authUpdate(value) {
    this.setState({
      auth: value
    })
    console.log("auth update");
  }

  render() {
    return (
      <div>
        {/* {this.state.auth ? <Layout /> : <Login authUpdate={this.authUpdate} />} */}

            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" > <Login history={this.props.history} authUpdate={this.authUpdate} /></Route>
            <Route exact path="/" > <Layout auth={this.state.auth} /> </Route>

      </div>



    )
  }
}


export default App;
