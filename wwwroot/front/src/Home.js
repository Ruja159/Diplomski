import React from 'react';
import { Modal, Table, FormControl, Button, Form, Row, Col, ButtonToolbar, Card, Container } from 'react-bootstrap'
// import { Navbar, Form, Container, Nav, FormControl, Button } from 'react-bootstrap'
import AddPostModal from './AddPostModal'
import EditPost from './EditPost';
import TicketModal from './TicketModal'



class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            posts: [],
            addModalShow: false,
            addTicketShow: false,
            editPostShow: false,
            idPost: ""
        }
        
        this.addModalClose = () => this.setState({ addModalShow: false, addTicketShow: false, editPostShow: false })
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
            
    editItems(item) {
        if (this.props.userId == item.user.id) {
            return (<div>
                <Button variant="link" className="probaj"
                    onClick={() => this.setState({ idPost: item.id, editPostShow: true})}
                >Izmjeni post</Button>
            </div>
            )
        }
    }


    render() {




        const listItems = [];
        for (let item of this.state.posts) {

            listItems.push(
                <div>
                    <Card className="text-center">
                        <Card.Header>Potrebna krv za {item.whoNeedBlood}</Card.Header>
                        <Card.Body >
                            {this.editItems(item)}
                            <Card.Title>Potrebna {item.bloodType.name} , Grad {item.city.name}</Card.Title>

                            <Card.Text>
                                {item.description}
                            </Card.Text>

                            <Button
                                variant="link"
                                onClick={() => this.setState({ addTicketShow: true })}>
                                Prijavi se
                            </Button>
                            <TicketModal
                                show={this.state.addTicketShow}
                                onHide={this.addModalClose} userId={this.props.userId} bloodTypeId={item.bloodType.name}
                                cityName={item.city.name}
                            />
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <div className="d-flex ">
                                <div className="mr-auto"> Dodao: {item.user.name} {item.user.lastName}</div>
                                <div > Dodan: {new Intl.DateTimeFormat("en-GB", {
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
                            onHide={this.addModalClose} userId={this.props.userId} />
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
                <EditPost postId={this.state.idPost}   onHide={this.addModalClose}  show={this.state.editPostShow} />

            </Container>
        );
    }
}

export default Home;
