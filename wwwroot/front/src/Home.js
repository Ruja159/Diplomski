import React from 'react';
import { Table } from 'react-bootstrap'


class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            posts: []
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
                .then(json => this.setState({posts: json}))
            })
        
    }

    render() {
        const listItems = [];
        for(let item of this.state.posts)
        {
            listItems.push(
            <tr>
            <th></th>
            <th>{item.user.name}</th>
            <th>{item.user.lastName}</th>
            <th>{item.bloodType.name}</th>
            <th>{item.city.name}</th>
            </tr>
            );
        }

        return (
            <Table striped bordered hover variant="dark">
                

                
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Blood Type</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                {listItems}
                </tbody>
            </Table>
        );
    }
}

export default Home;
