import React from 'react'
import RegistrationComponent from './RegistrationComponent'
import 'bootstrap/dist/css/bootstrap.min.css'



class Registration extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            address: "",
            password: "",
            bloodType: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }


    render() {
        return(

            <RegistrationComponent 
            handleChange={this.handleChange}
            data={this.state} />
        )
    }
}

export default Registration