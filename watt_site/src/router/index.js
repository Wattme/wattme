import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';

// Routes
import LandingRoutes from "./Landing";
import AuthorizationRoutes from "./Authorization";

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <LandingRoutes/>
        )
    }
}

export default compose(
    connect(
        state => ({}),
        dispatch => ({}),
    ),
)(Router);
