import React, {Component} from 'react';
import {PageRedirectButton, Layout} from '../Common.js';


export default class Homepage extends Component {
    render() {
        return (
            <Layout>
                <hr className="bigSpacer"/>
                <div className="content contentWithFlex">
                    Welcome to the EJM programming club homepage !
                    <span className="smallSpacer"/>
                    <PageRedirectButton buttonText="New ? Learn more >" redirectLink="/about"/>
                    <PageRedirectButton buttonText="Before first class >" redirectLink="/preparation"/>
                </div>
                <hr className="bigSpacer"/>
                <div className="content">
                    <span className="important">Thursday @ 17h15 (-> 18h45)</span><br/>
                    Room: <span className="important">I3</span><br/>
                    First meeting: <span className="important">9 November</span>
                </div>
            </Layout>
        )
    }
}
