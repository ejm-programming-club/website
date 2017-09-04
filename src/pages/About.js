import React, {Component} from 'react';
import {LogoBanner, PageRedirectButton} from '../Common';
import '../commonStyle.css';
import SnippetsWall from "../snippets/snippet";
import DummyComponent from "../snippets/dummy";


export default class About extends Component {
    render() {
        return (
            <div id="backgroundWrapper">
                <LogoBanner/>
                <hr className="bigSpacer"/>
                <div id="content">
                    <h3>About <b>us:</b></h3>
                    <br/>
                    <SnippetsWall snippetsList={[DummyComponent]}/>
                    <br/>
                    <h3>About <b>you:</b></h3>
                    If you're still interested, its time for the
                    <PageRedirectButton buttonText="Registration form" redirectLink="/registration"/>

                </div>
            </div>
        )
    }
}