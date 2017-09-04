import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoBannerImg from './imgs/logo-banner.png';


export class LogoBanner extends Component {
    render() {
        return <img src={LogoBannerImg} alt="Logo banner"/>
    }
}


export class PageRedirectButton extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    handleOnClick() {
        this.setState({redirect: true})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.props.redirectLink} />;
        } else {
            return(
                <button className="startTour" onClick={this.handleOnClick.bind(this)}>{this.props.buttonText}</button>
            )
        }
    }
}

PageRedirectButton.propTypes = {
    buttonText: PropTypes.string,
    redirectLink: PropTypes.string
};
