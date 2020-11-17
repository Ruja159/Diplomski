import React from 'react'
import { Form, Container, Button , Row, Col} from 'react-bootstrap';

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            user: [],
            editable: false

        }
        this.enableEdit = this.enableEdit.bind(this);
    }
    componentDidMount() {
        const uri = "/api/user/" + this.props.userId;
        fetch(uri, {
            method: "GET",
            // mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                response.json()
                    .then(json => this.setState({ user: json }))
            })

    }

    enableEdit() {
        this.setState({ editable: true });
    }

    


    render() {

        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Button onClick={this.enableEdit}>Edit</Button>
                            <Form.Group >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={this.state.user.email} disabled={!this.state.editable} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" value={this.state.user.name} disabled={!this.state.editable} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" value={this.state.user.lastName} disabled={!this.state.editable} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" disabled={!this.state.editable} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Blood Type</Form.Label>
                                <Form.Control type="text" placeholder="Blood Type"
                                    value={this.state.user.bloodType} disabled={!this.state.editable} />
                            </Form.Group>
                            <Button variant="outline-success" onClick={this.handleSubmit}>Save</Button>

                        </Form>
                    </Col>
                    <Col></Col>
                    <Col></Col>


                </Row>

            </Container>
        )
    }
}

export default Profile