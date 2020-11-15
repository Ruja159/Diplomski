import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class EditPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: "",
            status: 0,
            bloodType: "",
            city: "",
            user: props.userId,
            whoneedblood: "",
            bloodTypes: [],
            cities: [],
            posts: [],
            postId: 0

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._handleApiRequests = this._handleApiRequests.bind(this);
    }


    handleSubmit(postId) {

        const params = {
            Id: postId,
            UserId: this.state.user,
            BloodTypeId: this.state.bloodType,
            CityId: this.state.city,
            Description: this.state.description,
            Status: this.state.status,
            WhoNeedBlood: this.state.whoneedblood


        }

        const content = JSON.stringify(params);
        console.info(content);
        fetch("api/post", {
            method: "PUT",
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

    _handleApiRequests(postId) {
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
        const uri = "/api/post/" + postId;
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
                    .then(json => { 
                        this.setState({ posts: json });
                 })
            })
    }

    componentWillReceiveProps(newProps) {
        this._handleApiRequests(newProps.postId);
    }

    componentDidMount() {
        this._handleApiRequests();
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
                        Izmjeni Post
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container" >

                        <Row>
                            <Col sm={6}>
                                <Form >

                                    <Form.Group>
                                        <Form.Label>Edit Description</Form.Label>
                                        <Form.Control
                                            type="textarea"
                                            placeholder="Say something..."
                                            value={this.state.posts.description}
                                            onChange={this.handleChange}
                                            name="description"
                                        />
                                    </Form.Group>


                                    <Form.Group>
                                        <Button variant="primary" onClick={this.handleSubmit}  >
                                            Edit Post
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

export default EditPost