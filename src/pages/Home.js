import React, {Component} from 'react';
import {PageRedirectButton, Layout} from '../Common.js';


export default class Homepage extends Component {
    render() {
        return (
            <Layout>
                <hr className="bigSpacer"/>
                <div className="content">
                    Welcome to the EJM programming club homepage !
                    <PageRedirectButton buttonText="Learn more >" redirectLink="/about"/>
                </div>
                <hr className="bigSpacer"/>
                <div className="content">
                    <span className="important">Thursday @ 17h15 (-> 18h45)</span> <br/>
                    Room: undefined
                </div>
            </Layout>
        )
    }
}
