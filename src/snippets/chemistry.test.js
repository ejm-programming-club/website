import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import ChemicalEquationBalancer from "./chemistry";

it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChemicalEquationBalancer defaultText={'H2 + O2 -> H2O'}/>, div)
});

it("balances default equation correctly", () => {
    const balancer = mount(<ChemicalEquationBalancer defaultText={'H2 + O2 -> H2O'}/>);
    expect(balancer.state().result.toString()).toEqual([
        <span><span className="number">2</span>H<sub>2</sub></span>,
        <span>+</span>,
        <span><span className="number"/>O<sub>2</sub></span>,
        <span>→</span>,
        <span><span className="number">2</span>H<sub>2</sub>O</span>
    ].toString())  // You ask me why .toString()? Because, behold: [1] === [1] returns false (´･Д･)」
});
