import React from 'react'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'

function RegistrationComponent (props) {
    return (
        <main>
            <Container>
                <Row>
                    <Col></Col>
                    
                        <Col>

                            <Form>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Aleksandar"
                                        value={props.data.firstName}
                                        onChange={props.handleChange}
                                        name="firstName"
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Rujevic"
                                        value={props.data.lastName}
                                        onChange={props.handleChange}
                                        name="lastName" />
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        placeholder="Banja Luka, neka ulica"
                                        type="text"
                                        value={props.data.address}
                                        onChange={props.handleChange}
                                        name="address" />
                                </Form.Group>


                                <Form.Group controlId="formHorizontalEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Example@gmail.com"
                                        value={props.data.email}
                                        onChange={props.handleChange}
                                        name="email"
                                    />
                                </Form.Group>


                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={props.data.password}
                                        onChange={props.handleChange}
                                        name="password" />
                                </Form.Group>

                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Password(again)</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password" />
                                </Form.Group>

                                <Form.Group className="gender">
                                    <Form.Label>Select your gender:</Form.Label>
                                    <Form.Check type="radio"
                                        name="gender"
                                        value="male"
                                        checked={props.data.gender === "male"}
                                        onChange={props.handleChange}
                                        label="Male"
                                    />
                                </Form.Group>

                                <Form.Group className="gender">
                                    <Form.Check
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={props.data.gender === "female"}
                                        onChange={props.handleChange}
                                        label="Female"
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Blood Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        id="inlineFormCustomSelectPref"
                                        name="bloodType"
                                        value={props.data.bloodType}
                                        onChange={props.handleChange}
                                        custom
                                    >
                                        <option value="0">Choose...</option>
                                        <option value="1">0+</option>
                                        <option value="2">0-</option>
                                        <option value="3">A+</option>
                                        <option value="4">A-</option>
                                        <option value="5">B+</option>
                                        <option value="6">B-</option>
                                        <option value="7">AB+</option>
                                        <option value="8">AB-</option>
                                    </Form.Control>
                                </Form.Group>



                                <Form.Group>
                                    <Button className="" size="" block>Submit</Button>
                                </Form.Group>
                            </Form>
                        </Col>
               
                    <Col></Col>
                </Row>

            </Container>


        </main>
    )
}

export default RegistrationComponent