import React from 'react';
import ReactDOM from 'react-dom';
import ChemicalEquationBalancer from "./chemistry";


ReactDOM.render(
    <ChemicalEquationBalancer defaultText="H2 + O2 -> H2O"/>,
    document.getElementById('root')
);
