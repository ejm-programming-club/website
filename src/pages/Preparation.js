import React, {Component} from 'react';
import {LogoBanner} from '../Common';
import '../commonStyle.css';


export default class Preparation extends Component {
    render() {
        return (
            <div id="backgroundWrapper">
                <LogoBanner/>
                <hr className="bigSpacer"/>
                <div id="content">
                    All the info (class + time) will be displayed on the front page of the website.
                    If you have any questions, don't hesitate to send us a mail at ejmprogramming@gmail.com.
                    <br/>
                    Before you come to the first class, follow these instructions to get stuff setup:
                </div>
            </div>
        )
    }
}