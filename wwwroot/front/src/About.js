import React from 'react'

class About extends React.Component{
    constructor(){
        super()
        this.state={
           user:[]
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
                .then(json => this.setState({user: json}))
            })
        
    }


    render(){
        return(
           <section>
             About Page
           </section>
        )
    }
}

export default About