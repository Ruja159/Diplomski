import React from 'react';
import { Modal, Table, FormControl, Button, Form, Row, Col, ButtonToolbar, Card, Container, Dropdown } from 'react-bootstrap'
// import { Navbar, Form, Container, Nav, FormControl, Button } from 'react-bootstrap'
import AddPostModal from './AddPostModal'
import EditPost from './EditPost';
import TicketModal from './TicketModal'
import DeletePost from './DeletePost'



class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            posts: [],
            addModalShow: false,
            addTicketShow: false,
            editPostShow: false,
            deletePostShow: false,
            idPost: "",
            idPostDelete: "",
            idPostTicket: "",
            bloodType: "",
            city:"",
            generalTicket: {}
        }

        this.addModalClose = () => this.setState({ addModalShow: false, addTicketShow: false,
             editPostShow: false, deletePostShow: false })
        this.updatePosts = this.updatePosts.bind(this);
        this.componentDidMount= this.componentDidMount.bind(this)
        // this.editPosts = this.editPosts.bind(this)
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

    updatePosts(data) {
        this.setState({ posts: data });
    }

    // editPosts() {
    //     fetch("/api/post", {
    //         method: "GET",
    //         // mode: "no-cors",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             response.json()
    //                 .then(json =>
    //                     this.setState({ posts: json }))
    //         })

    // }



    editItems(item) {
        if (this.props.userId == item.user.id) {
            return (<div>
                <Dropdown className="probaj">
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                        Izaberi opciju
                 </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => this.setState({ idPost: item.id, editPostShow: true })}>
                            Izmjeni post</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setState({ idPostDelete: item.id, deletePostShow: true })}
                        >Izbrisi post</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>

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
                            <Card.Title>Potrebna {item.bloodType.name} , Grad {item.city.name} ID POST {item.id}</Card.Title>

                            <Card.Text>
                                {item.description}
                            </Card.Text>

                            <Button
                                variant="link"
                               onClick={() => this.setState({ idPostTicket: item.id, addTicketShow: true,
                                city: item.city.name,
                                generalTicket: item,
                                bloodType: item.bloodType.name})}>
                                Prijavi se
                            </Button>
                            <TicketModal
                                show={this.state.addTicketShow}
                                onHide={this.addModalClose} userId={this.props.userId} postId={this.state.idPostTicket}
                                bloodType={this.state.bloodType} city={this.state.city} generalTicket={this.state.generalTicket}
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

                        <AddPostModal show={this.state.addModalShow} updatePosts={this.updatePosts}
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
                <EditPost postId={this.state.idPost} onHide={this.addModalClose} 
                show={this.state.editPostShow} editPosts={this.componentDidMount}/>

                <DeletePost postId={this.state.idPostDelete} onHide={this.addModalClose}
                 show={this.state.deletePostShow} deletePosts={this.componentDidMount} />
            </Container>
        );
    }
}

export default Home;
