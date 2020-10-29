import React from 'react';
import Login from './Login';
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
    this.handleLogout = this.handleLogout.bind(this);
    this.sessionUpdate = this.sessionUpdate.bind(this);
  };

  authUpdate(value) {
    this.setState({
      auth: value
    })
    console.log("auth update");
  }

  handleLogout() {
    this.setState({auth: false});
  }

  sessionUpdate(value) {
    this.setState({userId: value });
  }

  render() {
    return (
      <div>
        {/* {this.state.auth ? <Layout /> : <Login authUpdate={this.authUpdate} />} */}
          <Switch>
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" > <Login history={this.props.history} authUpdate={this.authUpdate} sessionUpdate={this.sessionUpdate} /></Route>
            <Route exact path="*" > <Layout auth={this.state.auth} userId={this.state.userId} handleLogout={this.handleLogout}/> </Route>

          </Switch>
      </div>



    )
  }
}


export default App;
