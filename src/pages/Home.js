import React, {Component} from 'react';
import {LogoBanner, PageRedirectButton} from '../Common.js';


export default class Homepage extends Component {
    render() {
        return (
            <div id="backgroundWrapper">
                <LogoBanner/>
                <hr className="bigSpacer"/>
                <div id="content">
                    Welcome to the EJM programming club homepage !
                    <PageRedirectButton buttonText="Learn more >" redirectLink="/about"/>
                </div>
            </div>
        )
    }
}
