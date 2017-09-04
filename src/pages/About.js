import React, {Component} from 'react';
import {LogoBanner, PageRedirectButton} from '../Common';
import '../commonStyle.css';
import ChemicalEquationBalancer from "../snippets/chemistry";
import PythonCodeConsole, {ConsoleClock} from "../snippets/pythonCode";


export default class About extends Component {
    render() {
        return (
            <div id="backgroundWrapper">
                <LogoBanner/>
                <hr className="bigSpacer"/>
                <div id="content">
                    <h3>What <span style={{color: 'dimGrey'}}>you</span> will do:</h3>
                    <ul>
                        <li>
                            try & learn to code in python;
                            <div className="snippetWrapper">
                                <PythonCodeConsole/>
                                <ConsoleClock/>
                            </div>
                        </li>
                        <li>
                            national computer science contest
                            <div className="snippetWrapper">
                                <a href="https://prologin.org/">
                                    <img id="prologin"
                                         src="https://prologin.org/static/img/logo_cube.png"
                                         alt="prologin logo"/>
                                </a>
                            </div>
                        </li>
                        <li>
                            write programs to do your homework
                            <div className="snippetWrapper">
                                <ChemicalEquationBalancer defaultText="H2 + O2 -> H2O"/>
                            </div>
                        </li>
                        <li>
                            web server, web app, web scraping
                        </li>
                        <li>
                            Game making, AI, Machine Learning
                            <br/>
                            (as a team, at the end of the year)
                        </li>
                    </ul>
                    <br/>
                    Interested? Consider signing up:
                    <PageRedirectButton buttonText="Registration form" redirectLink="/registration"/>

                </div>
            </div>
        )
    }
}