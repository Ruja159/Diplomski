import React from 'react';
import { Modal, Button } from 'react-bootstrap'

class TicketModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            postId:"",
            bloodType: "",
            city:""
         
        }
    }

    componentDidMount() {
        const uri = "/api/user/" + this.props.userId;
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
                    .then(json => this.setState({ user: json }))
            })

    }
    componentWillReceiveProps(newProps) {
        this.setState({
            postId:  newProps.postId,
            bloodType: newProps.bloodType,
            city: newProps.city
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
                        Prijava
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{this.state.user.name}  {this.state.user.lastName}</h4>
                    <p>
                        Korisnik {this.state.user.name}  {this.state.user.lastName} se dobrovoljno prijavio za doniranje <b>{this.state.bloodType}</b>
                        <br /> Mjesto: <b> {this.state.city} </b>  <br />
                        Bolnica:treba napraviti <br />
                        Ambulanta: isto <br />
                        Vrijeme: neko
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default TicketModal