import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'



class Registration extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            lastName: "",
            email: "",
            gender: true,
            city: "",
            password: "",
            bloodType: "",
            passwordRepeated: "",
            bloodTypes: [],
            cities: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.genderChange = this.genderChange.bind(this)
    }

    handleSubmit() {


        const params = {
            Name: this.state.name,
            LastName: this.state.lastName,
            Email: this.state.email,
            Password: this.state.password,
            Gender: this.state.gender,
            Address: this.state.address,
            BloodType: this.state.bloodType,
            PasswordRepeated: this.state.passwordRepeated
        }

        const content = JSON.stringify(params);

        fetch("/api/user", {
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
                    });
            })

            .catch((error) => {
                console.error("Error : ", error);
            })

    }
    componentDidMount() {
        fetch("/api/bloodtype", {
            method: "GET",
            // mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                response.json()
                    .then(json => this.setState({ bloodTypes: json }))
            })

            
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

  

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    genderChange() {
        this.setState({
            gender: !this.state.gender
        });
    }


    render() {
        return (
            <main>
                <Container>
                    <Row>
                        <Col></Col>
                        <div class="form">
                            <Col>

                                <Form >
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            name="name"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                            value={this.state.lastName}
                                            onChange={this.handleChange}
                                            name="lastName" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">City</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref"
                                            name="city"
                                            value={this.state.city}
                                            onChange={this.handleChange}
                                            custom
                                        >
                                            <option value="0">Choose...</option>
                                            {this.state.cities.map((index) =>
                                                <option key={index.id} >{index.name}</option>
                                            )}



                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId="formHorizontalEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Example@gmail.com"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            name="email"
                                        />
                                    </Form.Group>


                                    <Form.Group controlId="formGroupPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            name="password" />
                                    </Form.Group>

                                    <Form.Group controlId="formGroupPassword">
                                        <Form.Label>Password(again)</Form.Label>
                                        <Form.Control
                                            value={this.state.passwordRepeated}
                                            type="password"
                                            placeholder="Password"
                                            name="passwordRepeated"
                                            onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group className="gender">
                                        <Form.Label>Select your gender:</Form.Label>
                                        <Form.Check type="radio"
                                            name="gender"
                                            value={false}
                                            checked={this.state.gender === false}
                                            onChange={this.genderChange}
                                            label="Male"
                                        />
                                    </Form.Group>

                                    <Form.Group className="gender">
                                        <Form.Check
                                            type="radio"
                                            name="gender"
                                            value={true}
                                            checked={this.state.gender === true}
                                            onChange={this.genderChange}
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
                                            value={this.state.bloodType}
                                            onChange={this.handleChange}
                                            custom
                                        >
                                            <option value="0">Choose...</option>
                                            {this.state.bloodTypes.map((index) =>
                                                <option key={index.id} >{index.name}</option>
                                            )}



                                        </Form.Control>
                                    </Form.Group>



                                    <Form.Group>
                                        <Button onClick={this.handleSubmit} className="" size="" block>Submit</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </div>

                        <Col></Col>
                    </Row>

                </Container>


            </main>
        )
    }
}

export default Registration