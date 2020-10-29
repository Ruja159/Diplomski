import React from 'react'
import Home from './Home';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile'
import Menu from './Menu'
import Score from './Score'
import {withRouter} from 'react-router';


function LayoutComponents(props) {
    return (
        <Router>
            <Menu handleLogout={props.handleLogout}/>
            <Switch>
                <Route exact path="/"><Home {...props} /></Route>
                <Route exact path="/profile" > <Profile {...props} /> </Route>
                <Route exact path="/score" component={Score} />
            </Switch>
        </Router>
    )
}

class Layout extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            
            <div>
                {this.props.auth ? <LayoutComponents {...this.props} /> : this.props.history.push("/login")}
            </div>
        )
    }
}

export default withRouter(Layout);