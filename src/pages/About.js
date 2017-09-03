import React, {Component} from 'react';
import {LogoBanner, PageRedirectButton} from '../Common';
import '../commonStyle.css';


export default class About extends Component {
    render() {
        return (
            <div id="backgroundWrapper">
                <LogoBanner/>
                <hr className="bigSpacer"/>
                <div id="content">
                    Here's what we plan on doing.
                    <br/>
                    blablablabla
                    <br/>
                    If you're still interested, its time for the
                    <PageRedirectButton buttonText="Registration form" redirectLink="/registration"/>

                </div>
            </div>
        )
    }
}