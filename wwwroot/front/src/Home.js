import React from 'react';
import { Modal, Table, FormControl, Button, Form, Row, Col, ButtonToolbar } from 'react-bootstrap'
// import { Navbar, Form, Container, Nav, FormControl, Button } from 'react-bootstrap'
import AddPostModal from './AddPostModal'



class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            posts: [],
            addModalShow: false
        }

    }

    componentDidMount() {
        fetch("/api/post", {
            method: "GET",
            // mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                response.json()
                    .then(json => 
                        this.setState({ posts: json }))
            })

    }

    render() {

        let addModalClose = () => this.setState({ addModalShow: false })

        const listItems = [];
        for (let item of this.state.posts) {
            const editDisabled = this.props.userId == item.userId ? false : true;
            listItems.push(
                <tr>
                    <th></th>
                    <th>{item.user.name}</th>
                    <th>{item.user.lastName}</th>
                    <th>{item.bloodType.name}</th>
                    <th>{item.city.name}</th>
                    <th>{item.description}</th>
                    <th><Button disabled={editDisabled}>Edit</Button></th>                    
                </tr>
            );
        }

        return (
            // <Container>
            <Form inline>

                <Row >
                    <Col></Col>
                    <Col className="md-auto">
                        <ButtonToolbar>
                            <Button
                                variant='success'
                                onClick={() => this.setState({ addModalShow: true })}
                            >Add Post</Button>

                            <AddPostModal show={this.state.addModalShow}
                                onHide={addModalClose} userId={this.props.userId} />
                        </ButtonToolbar>

                    </Col>
                    <Col className="col-lg-2">   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button></Col>
                </Row>


                <Table striped bordered hover variant="dark">



                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Blood Type</th>
                            <th>City</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </Table>
            </Form>
            // </Container>
        );
    }
}

export default Home;
