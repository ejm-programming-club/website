import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LogoBanner, PageRedirectButton} from "../Common";
import '../commonStyle.css';


export default class Registration extends Component {
    render() {
        return (
            <div id="backgroundWrapper">
                <LogoBanner/>
                <hr className="bigSpacer"/>
                <div id="content">
                    <RegistrationForm/>
                </div>
            </div>
        )
    }
}


class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            grade: '',
            email: '',
            programmingXp: '',
            whichProgrammingXp: '',
            likeToLearn: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(stateKey, value) {
        this.setState({[stateKey]: value});
    }

    handleSubmit() {
        let link = "https://script.google.com/macros/s/AKfycbzohCWaaFWOp6nj-UOs5EkSlJAODUyOyn_Oe82xNMkqo1oN3nJ5/exec";
        fetch(link, {method: 'POST', mode: 'no-cors', body: this.state})
            .then((response) => console.log(response))
    }

    valueObjFactory(arr, stateKey) {
        let o = {};
        arr.map(grade =>
            o[grade] = this.state[stateKey] === grade
        );
        return o
    }

    render() {
        let classValueObj = this.valueObjFactory(['2nde', '1ere', 'Terminale'], 'grade');
        let xpValueObj = this.valueObjFactory(['Yes', 'No'], 'programmingXp');

        return (
            <div>
                <form id="form" onSubmit={this.handleSubmit}>
                    <div id="formTitle">Registration Form</div>
                    <ShortTextInput labelText="Full name" value={this.state.name}
                                    handleChange={this.handleChange} stateKey="name"/>

                    <RadioGroupInput radioTitle="Class" valueObj={classValueObj}
                                     handleChange={this.handleChange} stateKey="grade"/>

                    <ShortTextInput labelText="Email (@ejm.org)" value={this.state.email}
                                    handleChange={this.handleChange} stateKey="email"/>

                    <RadioGroupInput radioTitle="Do you have any programming experience ?" valueObj={xpValueObj}
                                     handleChange={this.handleChange} stateKey="programmingXp"/>

                    <ShortTextInput labelText="If yes, in which language(s) ?" value={this.state.whichProgrammingXp}
                                    handleChange={this.handleChange} stateKey="whichProgrammingXp"/>

                    <ShortTextInput labelText="What would you like to learn ?" value={this.state.likeToLearn}
                                    handleChange={this.handleChange} stateKey="likeToLearn"/>
                </form>
                <SubmitAndRedirectButton formValidate={this.handleSubmit} buttonText="Submit" redirectLink="/"/>
            </div>
        )
    }
}


class ShortTextInput extends Component {
    render() {
        return (
            <div className='inputWrapper'>
                <div className="radioTitle">{this.props.labelText}</div>
                <input type="text" value={this.props.valueObj}
                       onChange={(e) => this.props.handleChange(this.props.stateKey, e.target.value)} />
            </div>
        )
    }
}

ShortTextInput.PropTypes = {
    labelText: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    stateKey: PropTypes.string
};


class RadioGroupInput extends Component {
    render() {
        return (
            <div className="inputWrapper radioGroup">
                <div className="radioTitle">{this.props.radioTitle}</div>
                {Object.entries(this.props.valueObj).map(
                    (nameAndBool, idx) =>
                        <label className="radio" key={idx}>
                            <input type="radio" value={this.props.stateKey} checked={nameAndBool[1]}
                                   onChange={(e) => this.props.handleChange(this.props.stateKey, nameAndBool[0])} />
                            {nameAndBool[0]}
                        </label>
                )}
            </div>
        )
    }
}

RadioGroupInput.PropTypes = {
    radioTitle: PropTypes.string,
    valueObj: PropTypes.object,
    handleChange: PropTypes.func,
    stateKey: PropTypes.string,
};


class SubmitAndRedirectButton extends PageRedirectButton {
    handleOnClick() {
        this.props.formValidate() //.then(this.setState({redirect: true}))
    }
}

SubmitAndRedirectButton.PropTypes=  {
    formValidate: PropTypes.func
};