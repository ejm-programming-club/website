import React, {Component} from 'react';
import {LogoBanner} from '../Common';
import '../commonStyle.css';


export default class Preparation extends Component {
    render() {
        return (
            <div id="backgroundWrapper">
                <LogoBanner/>
                <hr className="bigSpacer"/>
                <div className="content">
                    All the info (class + time) will be displayed on the front page of the website. <br/>
                    If you have any questions, don't hesitate to send us a mail at ejmprogrammingclub@gmail.com <br/>
                    <span className="smallSpacer"/>
                    <b>Computer required</b>
                    <span className="smallSpacer"/>
                    Before you come, follow the instructions <a href="https://www.python.org/downloads/" style={{display: "inline-block"}}>here</a> to download python <b>3.6.2</b>
                </div>
            </div>
        )
    }
}