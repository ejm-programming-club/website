import React, {Component} from 'react';
import {PageRedirectButton, Layout} from '../Common';
import '../commonStyle.css';
import ChemicalEquationBalancer from "../snippets/chemistry";


export default class About extends Component {
    render() {
        return (
            <Layout>
                <hr className="bigSpacer"/>
                <div className="content">
                    Learning python
                    <a href="https://www.python.org/">
                        <img src="https://www.python.org/static/opengraph-icon-200x200.png" alt="python logo" height="128px" width="128px" className="icon"/>
                    </a>
                    <br/>
                    Algorithms, data structures <br/>preparing national programming contest
                    <a href="https://prologin.org/">
                        <img id="prologin" src="https://prologin.org/static/img/logo_cube.png" alt="prologin logo" className="icon"/>
                    </a>
                    <br/>
                    Bigger team projects:<br/> chess bot, website, machine learning, game-making, ...<br/>
                    or a program to do your homework:
                    <ChemicalEquationBalancer defaultText={"H2 + O2 -> H2O"}/>
                </div>
                <div className="content">
                    <br/><br/>
                    Interested? Consider signing up:
                    <PageRedirectButton buttonText="Registration form" redirectLink="/registration"/>
                </div>
            </Layout>
        )
    }
}