import React from 'react'
import {Form, Container, Button} from 'react-bootstrap';

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
        this.setState({editable: true});
    }


    render() {
        return (
            <Container>
                <Form>
                    <Button onClick={this.enableEdit}>Edit</Button>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={this.state.user.email} disabled={!this.state.editable} />
                    </Form.Group>
                </Form>

            </Container>
        )
    }
}

export default Profile