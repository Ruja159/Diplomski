import React from 'react'
import { Container, Form, Breadcrumb, Col, Row, Button } from 'react-bootstrap';
import './index.css'
import {Redirect,BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import {withRouter} from 'react-router';
import Registration from './Registration'


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleLink=this.handleLink.bind(this);

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
                if (jsonData.success == true)
                {

                    this.props.sessionUpdate(jsonData.userId);
                    this.redirectToLayout();
                }
            });
        })

        .catch((error) => {
            console.error("Error : ", error);
        })

    }

    handleLink(){
        this.props.history.push("/registration")
    }

    redirectToLayout(){
        this.props.history.push("/");
    }


    render() {
        return (
            <main>
                <Container>
                    <Row>
                        <Col>
                        </Col>
                        <Col></Col>
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


                                    <Form.Group controlId="formGroupPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            name="password"
                                            onChange={this.handleChange} />

                                    </Form.Group>

                                    <Form.Group>
                                        <Button onClick={this.handleSubmit} block>Log In</Button>
                                    </Form.Group>
                                </Form>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="">Forgot your password?</Breadcrumb.Item>

                                </Breadcrumb>
                                <div class="line" ></div>

                                <Form.Group>
                                    <Button onClick={this.handleLink} variant="success" size="lg">Create New Account</Button>

                                </Form.Group>
                            </Col>
                        </div>
                    </Row>
                </Container>
            </main>
        )
    }

}

export default withRouter(Login)