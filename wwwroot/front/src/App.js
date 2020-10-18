import React from 'react';
import Login from './Login';
import { Button, Container, Col, Row } from 'react-bootstrap';
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';

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
      <Container fluid="lg">
        <Row>
          <Col>

            {this.state.auth ? <Layout /> : <Login authUpdate={this.authUpdate} />}
          </Col>
        </Row>
      </Container>

    )
  }
}


export default App;
