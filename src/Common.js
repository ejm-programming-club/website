import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import LogoBannerImg from './imgs/logo-banner.png';


export class Layout extends Component {
    render() {
        return (
            <div id="backgroundWrapper">
                <LogoBanner/>
                {this.props.children}
                {/*<Footer/>*/}
            </div>
        )
    }
}

export class LogoBanner extends Component {
    render() {
        return <div><a href='/'><img src={LogoBannerImg} alt="Logo banner" id="logoBanner"/></a></div>
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
