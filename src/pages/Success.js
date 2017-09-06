import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {LogoBanner} from '../Common.js';


export default class Success extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    changePage() {
        this.setState({redirect: true})
    }

    componentDidMount() {
        setTimeout(this.changePage.bind(this), 2000)
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to='/preparation'/>;
        } else {
            return (
                <div id="backgroundWrapper">
                    <LogoBanner/>
                    <hr className="bigSpacer"/>
                    <div id="content" className="success">
                        ✔ Form registered successfully !
                        <br/>
                        You'll get redirected in a few seconds ...
                    </div>
                </div>
            )
        }
    }
}