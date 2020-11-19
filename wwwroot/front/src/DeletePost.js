import React from 'react'
import { Row, Container, Modal, Form, Button, Col } from 'react-bootstrap'

class DeletePost extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            postId:""
          
        }
        

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            postId:  newProps.postId
        })
    }

    handleDelete() {

        const uri = "/api/post/" + this.state.postId

        fetch(uri, {
            method: "delete",
            // mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            response.json()
                .then(() => {
                   this.props.onHide();
                   this.props.deletePosts()
                });
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

                <Modal.Body>
                    <div className="container" >

                        <Row>
                            <Col sm={6}>
                                <Form >

                                    <Form.Group>
                                        <Form.Label className="text-align-center">Da li sigurno želite da obrišete post??</Form.Label>
                                    </Form.Group>


                                    <Form.Group>
                                        <Button variant="danger" onClick={this.handleDelete}  >
                                            Delete
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


export default DeletePost