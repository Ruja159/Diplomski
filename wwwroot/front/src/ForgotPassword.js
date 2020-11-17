import React from 'react'
import { withRouter } from 'react-router';
import { Row, Col, Container, Form, Button } from 'react-bootstrap'

class ForgotPassword extends React.Component {

    constructor() {
        super()
        this.state = {
            email: ""
        }
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })

    }
    componentDidMount(){
        fetch("/api/city", {
            method: "GET",
            // mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                response.json()
                    .then(json => this.setState({ cities: json }))
            })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                    </Col>

                    <div class="form">
                        <Col>
                            <Form>
                                <Form.Group controlId="formHorizontalEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Example@gmail.com"
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.handleChange}
                                    />

                                </Form.Group>
                            </Form>

                            <Form.Group>
                                <Button onClick={this.handleLink} variant="success" size="lg">Send</Button>
                            </Form.Group>
                        </Col>
                    </div>
                    <Col>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default withRouter(ForgotPassword)