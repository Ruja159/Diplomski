import React from 'react'
import { withRouter } from 'react-router';
import { Row, Col, Container, Form, Button } from 'react-bootstrap'

class ForgotPassword extends React.Component {
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
                                        // value={this.state.email}
                                        name="email"

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