import React from 'react';
import { Modal, Table, FormControl, Button, Form, Row, Col, ButtonToolbar, Card, Container } from 'react-bootstrap'
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

            listItems.push(
                <div>
                    <Card className="text-center">
                        <Card.Header>Potrebna krv za {item.whoNeedBlood}</Card.Header>
                        <Card.Body>
                            <Card.Title>Potrebna {item.bloodType.name} , Grad {item.city.name}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                            <Button variant="link">Prijavi se</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted" className="inline-block">
                            <div className="d-flex mb-3 example-parent">
                                <div className="mr-auto p-2 col-example"> Dodao: {item.user.name} {item.user.lastName}</div>
                                <div className="p-2 col-example"></div>
                                <div className="p-2 col-example"> Dodan: {new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(item.addedPost))}</div>
                            </div>

                        </Card.Footer>
                    </Card>

                    <br />
                </div>


            );
        }

        return (
            <Container>


                <Row >
                    <Col> <ButtonToolbar>
                        <Button
                            variant='success'
                            onClick={() => this.setState({ addModalShow: true })}
                        >Add Post</Button>

                        <AddPostModal show={this.state.addModalShow}
                            onHide={addModalClose} userId={this.props.userId} />
                    </ButtonToolbar>
                    </Col>
                    <Col>

                    </Col>
                    <Col >
                        <Form inline className="float-right">
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    </Col>
                </Row>




                {listItems}
            </Container>
        );
    }
}

export default Home;
