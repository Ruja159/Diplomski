import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class AddPostModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: "",
            status: 0,
            bloodType: "",
            city: "",
            user: props.userId,
            whoneedblood:"",
            bloodTypes: [],
            cities: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit() {

        const params = {
            UserId: this.state.user,
            BloodTypeId: this.state.bloodType,
            CityId: this.state.city,
            Description: this.state.description,
            Status: this.state.status,
            WhoNeedBlood: this.state.whoneedblood
        

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
                                        <Form.Label>Add Description</Form.Label>
                                        <Form.Control
                                            type="textarea"
                                            placeholder="Say something..."
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            name="description"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Name who need blood</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Marko Markovic"
                                            value={this.state.whoneedblood}
                                            onChange={this.handleChange}
                                            name="whoneedblood"
                                        />
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
                                                <option value={index.id} >{index.name}</option>
                                            )}



                                        </Form.Control>
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
                                                <option value={index.id} >{index.name}</option>
                                            )}



                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group>
                                        <Button variant="primary" onClick={this.handleSubmit}  >
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