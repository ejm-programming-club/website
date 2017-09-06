import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
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
            data: {
                name: '',
                grade: '',
                email: '',
                programmingXp: '',
                whichProgrammingXp: '',
                likeToLearn: '',
            },
            errorMsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(stateKey, value) {
        this.setState({data:{...this.state.data, [stateKey]: value}})
    }

    handleSubmit() {
        this.setState({errorMsg: ''});
        let isGood = true;
        for (let key in this.state.data) {
            if (this.state.data.hasOwnProperty(key)) {
                if (this.state.data[key] === '' && key !== 'whichProgrammingXp') {
                    console.log('ERROR', key);
                    this.setState({errorMsg: key});
                    isGood = false;
                    break;
                }
            }
        }
        if (!isGood) {
            return;
        }


        let link = "https://script.google.com/macros/s/AKfycbzohCWaaFWOp6nj-UOs5EkSlJAODUyOyn_Oe82xNMkqo1oN3nJ5/exec";
        let searchParams = Object.keys(this.state.data).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(this.state.data[key]);
        }).join('&'); // must convert to urlencoded

        console.log(searchParams);
        fetch(link, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: searchParams
        }).then(() => {
            console.log(this.state);
            if (this.state.errorMsg === '') {
                this.setState({redirect: true})
            }
        })
    }

    valueObjFactory(arr, stateKey) {
        let o = {};
        arr.map(grade => o[grade] = this.state.data[stateKey] === grade);
        return o
    }

    render() {
        let classValueObj = this.valueObjFactory(['2nde', '1ere', 'Terminale'], 'grade');
        let xpValueObj = this.valueObjFactory(['Yes', 'No'], 'programmingXp');

        if (this.state.redirect) {
            return <Redirect push to="/success" />
        } else {
            return (
                <div>
                    {this.state.errorMsg !== ''
                        ? <div className="errorBox">Check that you have filled the '{this.state.errorMsg}' entry and try again.</div>
                        : null
                    }
                    <form id="form" onSubmit={this.handleSubmit}>
                        <div id="formTitle">Registration Form</div>
                        <ShortTextInput labelText="Full name" value={this.state.data.name}
                                        handleChange={this.handleChange} stateKey="name"/>

                        <RadioGroupInput radioTitle="Class" valueObj={classValueObj}
                                         handleChange={this.handleChange} stateKey="grade"/>

                        <ShortTextInput labelText="Email (@ejm.org)" value={this.state.data.email}
                                        handleChange={this.handleChange} stateKey="email"/>

                        <RadioGroupInput radioTitle="Do you have any programming experience ?" valueObj={xpValueObj}
                                         handleChange={this.handleChange} stateKey="programmingXp"/>

                        <ShortTextInput labelText="If yes, in which language(s) ?" value={this.state.data.whichProgrammingXp}
                                        handleChange={this.handleChange} stateKey="whichProgrammingXp"/>

                        <ShortTextInput labelText="What would you like to learn ?" value={this.state.data.likeToLearn}
                                        handleChange={this.handleChange} stateKey="likeToLearn"/>
                    </form>
                    <SubmitAndRedirectButton formValidate={this.handleSubmit} buttonText="Submit" redirectLink="/success"/>
                </div>
            )
        }
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

ShortTextInput.propTypes = {
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

RadioGroupInput.propTypes = {
    radioTitle: PropTypes.string,
    valueObj: PropTypes.object,
    handleChange: PropTypes.func,
    stateKey: PropTypes.string,
};


class SubmitAndRedirectButton extends PageRedirectButton {
    handleOnClick() {
        this.props.formValidate()
    }
}

SubmitAndRedirectButton.propTypes=  {
    formValidate: PropTypes.func
};