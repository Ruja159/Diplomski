import React from 'react'
import { Navbar, Form, Container, Nav, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class Menu extends React.Component {
    render() {
        return (


        
                <Navbar bg="dark" variant="dark">
                    <Link to="/">
                        <Navbar.Brand href="">Home</Navbar.Brand>

                    </Link>
                    <Nav className="mr-auto">
                        <Link to="/about">
                            <Nav.Link href="#about">About</Nav.Link>
                        </Link>
                        <Link to="/score">
                            <Nav.Link href="#score">Score</Nav.Link>
                        </Link>
                        <Link>
                            <Nav.Link href="#logout">Log Out</Nav.Link>
                        </Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
     


        )
    }
}

export default Menu