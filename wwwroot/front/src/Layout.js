import React from 'react'
import Home from './Home';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import About from './About'
import Menu from './Menu'
import Score from './Score'
import Registration from './Registration';

class Layout extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.auth ? <Menu></Menu> : this.props.history.push("/login")}
            </div>
        )
    }
}

export default withRouter(Layout)