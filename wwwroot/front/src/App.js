import React from 'react';
import Login from './Login';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Login authUpdate={this.authUpdate} />

      </div>
    )
  }
}


export default App;
