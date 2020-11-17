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
            whoNeedBlood: "",
            bloodTypes: [],
            cities: [],
            posts: [],
            // postId: 0

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._handleApiRequests = this._handleApiRequests.bind(this);
    }


    handleSubmit(postId) {

        const params = {
            Id: this.state.posts.id,
            UserId: this.state.posts.user.id,
            BloodTypeId: this.state.posts.bloodTypeId + "",
            CityId: this.state.posts.cityId + "",
            Description: this.state.posts.description,
            Status: this.state.posts.status,
            WhoNeedBlood: this.state.posts.whoNeedBlood


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
                       this.props.onHide()
                       this.props.editPosts()
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
        
        // this.setState({
        //     posts: {name: value}
        // })

        if (name == "bloodTypeId"){
            let newBTname; 
            const bloodType = this.state.bloodTypes.filter(s => s.id == parseInt(value));

            this.setState(prevState => ({
                posts: {
                    ...prevState.posts,
                    bloodType: bloodType.length > 0 ? bloodType[0].name : ""
                }
            }))
        }

        this.setState(prevState => ({
            posts: {                   // object that we want to update
                ...prevState.posts,    // keep all other key-value pairs
                [name]: value       // update the value of specific key
            }
        }));
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
                                        <Form.Label>Name who need blood</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Marko Markovic"
                                            value={this.state.posts.whoNeedBlood}
                                            onChange={this.handleChange}
                                            name="whoNeedBlood"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">City</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref"
                                            name="cityId"
                                            value={this.state.posts.cityId}
                                            onChange={this.handleChange}
                                            custom
                                        >
                                            {/* <option value={this.state.posts.cityId}>{this.state.posts.city}</option> */}
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
                                            name="bloodTypeId"
                                            value={this.state.posts.bloodTypeId}
                                            onChange={this.handleChange}
                                            custom
                                        >
                                            {/* <option value={this.state.posts.bloodTypeId}>{this.state.posts.bloodType}</option> */}
                                            {this.state.bloodTypes.map((index) =>
                                            
                                                <option value={index.id} >{index.name}</option>
                                            )}



                                        </Form.Control>
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