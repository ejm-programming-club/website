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
                    <span className="important">Wednesday @ 16h25 (-> ~18h00)</span><br/>
                    Room: <span className="important">I3</span><br/>
                    <a className="important" href="https://github.com/ejm-programming-club/ProloginNotes">Archive</a>
                </div>
            </Layout>
        )
    }
}
