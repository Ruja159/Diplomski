import React from 'react'
import { Container, Form, Breadcrumb, Col, Row, Button } from 'react-bootstrap';
import './index.css'
import { withRouter } from 'react-router';
import Footer from './Footer'


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errors: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.redirectToForgotPass=this.redirectToForgotPass.bind(this);

    }



    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit() {
        console.log(this.state.email);
        console.log(this.state.password);

        const params = {
            Email: this.state.email,
            Password: this.state.password
        }

        const formData = new FormData();

        const content = JSON.stringify(params);

        fetch("/api/auth", {
            method: "POST",
            // mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: content,
        })
            .then(response => {
                response.json()
                    .then((jsonData) => {
                        console.log(jsonData);
                        //TODO: Napraviti da se state updatuje, pozvati funkciju 
                        this.props.authUpdate(jsonData.success);
                        if (jsonData.success == true) {

                            this.props.sessionUpdate(jsonData.userId);
                            this.redirectToLayout();
                        }
                        else {
                            this.setState({ errors: jsonData })
                        }
                    });
            })

            .catch((error) => {
                console.error("Error : ", error);
            })

    }

    handleLink() {
        this.props.history.push("/registration")
    }

    redirectToForgotPass(){
        this.props.history.push("/forgotpassword")
    }

    redirectToLayout() {
        this.props.history.push("/");
    }


    render() {
        return (
            <div>
                <div class="donateBlood">
                    <Container>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                            <div class="form">
                                <Col>

                                    <Form>
                                        <Form.Group className="text-left" controlId="formHorizontalEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Example@gmail.com"
                                                value={this.state.email}
                                                name="email"
                                                onChange={this.handleChange}
                                            />
                                            <div class="errors">{this.state.errors.messageEmail}</div>
                                        </Form.Group>


                                        <Form.Group className="text-left" controlId="formGroupPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={this.state.password}
                                                name="password"
                                                onChange={this.handleChange} />
                                            <div class="errors">{this.state.errors.messagePassword}</div>

                                        </Form.Group>

                                        <Form.Group>
                                            <Button onClick={this.handleSubmit} block>Log In</Button>
                                        </Form.Group>
                                    </Form>

                                    <Breadcrumb >
                                        <Breadcrumb.Item  onClick={this.redirectToForgotPass}>Forgot your password?</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <div class="line" ></div>

                                    <Form.Group>
                                        <Button onClick={this.handleLink}  variant="success" size="lg">Create New Account</Button>

                                    </Form.Group>
                                </Col>
                            </div>
                        </Row>
                    </Container>
                    <div class="textblood">
                        <b>Donate blood</b>
                        <h3>Connect with people with the world <br></br>around you on Donate blood.</h3>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default withRouter(Login)