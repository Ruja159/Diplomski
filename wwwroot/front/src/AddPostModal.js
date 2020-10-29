import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class AddPostModal extends React.Component {
    constructor() {
        super()
        this.state = {
            description: "",
            status: 0,
            user:[]
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }


    handleSubmit() {

        const params = {
            Description: this.state.description,
            UserId: this.state.user.id,
            Status: this.state.status
        }

        const content = JSON.stringify(params);
        console.info(content);

        fetch("/api/post", {
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

            
    }


    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Post
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container" >

                        <Row>
                            <Col sm={6}>
                                <Form >

                                    <Form.Group>
                                        <Form.Label>Write which bloodtype you need</Form.Label>
                                       <Form.Control
                                            type="textarea"
                                            placeholder="Say something..."
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            name="description"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" onClick={this.handleSubmit} > 
                                            Add Post
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddPostModal