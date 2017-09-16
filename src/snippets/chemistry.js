//
// Created by 杨竞颉 on 03/09/2017
//
/*
Chemical Equation Balancer (in javascript)
Adapted from https://github.com/3D-Circle/CHEMaths (https://chemaths.herokuapp.com/),
with certain features removed for simplicity.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './chemistry.css';

const recognizedElements = [
    'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc',
    'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
    'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr',
    'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt',
    'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk',
    'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Uut', 'Uuq', 'Uup',
    'Uuh', 'Uus', 'Uuo'
];


class Fraction {
    constructor(numerator, denominator) {
        if (denominator === undefined)
            denominator = 1;
        let gcd = Fraction.gcd(numerator, denominator);
        this.numerator = numerator / gcd;
        this.denominator = denominator / gcd;
    }

    static gcd(a, b) {
        return !b ? a : this.gcd(b, a % b)
    }

    equals(other) {
        return this.numerator / this.denominator === other.numerator / other.denominator
    }

    addFraction(other) {
        // other is a fraction
        return new Fraction(this.numerator * other.denominator + other.numerator * this.denominator, this.denominator * other.denominator)
    }

    multiply(other) {
        return new Fraction(this.numerator * other.numerator, this.denominator * other.denominator)
    }

    inverse() {
        return new Fraction(this.denominator, this.numerator)
    }

    negative() {
        return new Fraction(-this.numerator, this.denominator)
    }
}


class Matrix {
    constructor(matrixAsObjectOfArrays) {
        this.matrix = Object.keys(matrixAsObjectOfArrays).reduce((matrixContainer, key) => {
            matrixContainer.push(matrixAsObjectOfArrays[key]);
            return matrixContainer
        }, []);
    }

    transpose() {
        let matrix = [];
        for (let rowVector of this.matrix) {
            if (matrix.length === 0) {
                for (let colCount = 0; colCount < rowVector.length; colCount++) {
                    matrix.push([])
                }
            }
            for (let colCount = 0; colCount < rowVector.length; colCount++) {
                matrix[colCount].push(rowVector[colCount]);
            }
        }
        let transposeMatrix = new Matrix({});
        transposeMatrix.matrix = matrix;
        return transposeMatrix
    }


    exchangeRows(rowIndex1, rowIndex2) {
        [this.matrix[rowIndex1], this.matrix[rowIndex2]] = [this.matrix[rowIndex2], this.matrix[rowIndex1]]
    }

    addToRow(rowIndex1, coefficientFraction, rowIndex2) {
        // adds row1 to row2
        for (let col = 0; col < this.matrix[0].length; col++) {
            this.matrix[rowIndex2][col] = this.matrix[rowIndex2][col].addFraction(this.matrix[rowIndex1][col].multiply(coefficientFraction))
        }
    }

    multiplyRowBy(rowIndex, coefficientFraction) {
        for (let col = 0; col < this.matrix[0].length; col++) {
            this.matrix[rowIndex][col] = this.matrix[rowIndex][col].multiply(coefficientFraction)
        }
    }

    getNullSpace() {
        let height = this.matrix[0].length, width = this.matrix.length;  // matrix is transposed
        let augmentedTransposeMatrix = this.transpose();
        augmentedTransposeMatrix.matrix.forEach((rowVector, rowIndex) => {
            for (let colIndex = 0; colIndex < height; colIndex++)
                rowVector.push(rowIndex === colIndex ? new Fraction(1) : new Fraction(0))
        });

        let i = 0, j = 0;
        let pivots = [];
        const zero = new Fraction(0);

        // Forward elimination
        while (i < height && j < width) {
            let pivot;

            if (!augmentedTransposeMatrix.matrix[i][j].equals(zero))
                pivot = augmentedTransposeMatrix.matrix[i][j];
            else
                for (let k = i + 1; k < height; k++) {
                    if (!augmentedTransposeMatrix.matrix[k][j].equals(zero)) {
                        pivot = augmentedTransposeMatrix.matrix[k][j];
                        augmentedTransposeMatrix.exchangeRows(k, i);
                        break
                    }
                }

            if (pivot === undefined) {
                j++;
                continue;
            }
            else {
                pivots.push([i, j]);
                augmentedTransposeMatrix.multiplyRowBy(i, pivot.inverse());
                for (let k = i + 1; k < height; k++) {
                    augmentedTransposeMatrix.addToRow(i, augmentedTransposeMatrix.matrix[k][j].negative(), k)
                }
            }
            i++;
            j++;
        }

        // Backward substitution
        while (pivots.length > 0) {
            [i, j] = pivots.pop();
            for (let k = 0; k < i - 1; k++) {
                augmentedTransposeMatrix.addToRow(i, augmentedTransposeMatrix.matrix[k][j].negative(), k)
            }
        }

        return augmentedTransposeMatrix.matrix.filter((rowVector) => {
            for (let colIndex = 0; colIndex < width; colIndex++) {
                if (!rowVector[colIndex].equals(new Fraction(0))) {
                    return false;
                }
            }
            return true;
        }).map((rowVector) => {
            return rowVector.slice(width)
        })
    }

}


class ChemicalEquationBalancer extends Component {
    // TODO handle parentheses (consider nested)
    // TODO omit the '^' for charges + automatically distinguish coefficient from charge using lookup table? (to facilitate copy-paste)
    // TODO acknowledge the use of e^-
    constructor() {
        super(...arguments);
        this.state = {
            inputText: "",
            status: "default",
            message: <p/>,
            result: <p/>,
            done: true
        };
    }

    componentDidMount() {
        this.balanceEquation(this.props.defaultText);
    }

    balanceEquation(equationFormula) {
        this.setState({
            inputText: equationFormula,
            status: "default",
            message: <p>processing ...</p>,
            result: <p/>,
            done: false
        });

        let errorMessages = [];
        let warningMessages = [];

        let equationFormulaWithoutWhitespace = equationFormula
            .replace(/ /g, '')
            .replace(/\^\+/g, '´')
            .replace(/\^-/g, '`');
        let illegalCharactersCheckString = equationFormulaWithoutWhitespace
            .replace(/(\d*[A-Z][a-z]{0,2}\d*)/g, '')
            .replace(/\+/g, '')
            .replace(/->/g, '')
            .replace(/´/g, '')
            .replace(/`/g, '');

        if (illegalCharactersCheckString !== "") {
            errorMessages.push(`Illegal character(s): ${illegalCharactersCheckString}`);
        }
        if (equationFormulaWithoutWhitespace.match(/\^\d[+-]/g) || equationFormulaWithoutWhitespace.match(/e`/g)) {
            errorMessages.push("Using 'e^-' is not supported here. Please go on ",
                <a href="https://chemaths.herokuapp.com">https://chemaths.herokuapp.com.</a>);
        }

        if (equationFormulaWithoutWhitespace.match(/[()[\]]/g)) {
            errorMessages.push(["(Nested) parentheses are not supported here. Please go on ",
                <a href="https://chemaths.herokuapp.com">https://chemaths.herokuapp.com.</a>]);
        }

        let reactantsJoined, productsJoined;
        [reactantsJoined, productsJoined] = equationFormulaWithoutWhitespace.split("->");

        if (!reactantsJoined) // undefined or empty string
            errorMessages.push("Reactants expected to the left of '->'; empty string given.");
        if (!productsJoined)  // undefined or empty string
            errorMessages.push("Products expected to the right of '->; empty string given.");

        let balancedEquation = "";
        if (errorMessages.length === 0) {
            let elements = {charge: []};
            let reactants = [], products = [];
            reactantsJoined.split('+').forEach((reactant, index) => {
                let reactantFormatted = [];
                if (!reactant)
                    errorMessages.push(`Molecular formula of reactant expected; '${reactant}' given.`);
                else if (Number.isInteger(reactant[0]))
                    warningMessages.push(`Unbalanced equation expected; coefficient(s) given (${reactant[0]}) ignored.`);
                else {
                    for (let element of reactant.match(/[A-Z][a-z]{0,2}\d*/g)) {
                        let coefficient = element.match(/\d+/g);
                        if (coefficient === "1")
                            warningMessages.push("The coefficient '1' should be omitted.");
                        if (coefficient === null)
                            coefficient = "1";
                        else
                            element = element.replace(coefficient, '');
                        reactantFormatted.push(element);
                        if (coefficient !== "1") {
                            reactantFormatted.push(<sub key={reactant + index + element}>{coefficient}</sub>)
                        }
                        if (!recognizedElements.includes(element)) {
                            warningMessages.push(`Unrecognized element: ${element}`)
                        }

                        if (!(element in elements)) {
                            elements[element] = []
                        }
                        while (elements[element].length < index) {
                            elements[element].push(new Fraction(0))
                        }
                        if (elements[element].length > index) {
                            elements[element][elements[element].length - 1] = elements[element][elements[element].length - 1].addFraction(new Fraction(-parseInt(coefficient, 10)))
                        } else {
                            elements[element].push(new Fraction(parseInt(coefficient, 10)))
                        }
                    }
                }
                let charge = reactant.slice(-1);
                if (charge === '´')
                    reactantFormatted.push(<sup key={reactant + index}>+</sup>);
                else if (charge === '`')
                    reactantFormatted.push(<sup key={reactant + index}>-</sup>);
                reactants.push(reactantFormatted);

                while (elements.charge.length < index) {
                    elements.charge.push(new Fraction(0))
                }
                elements.charge.push(new Fraction(
                    charge === '´' ? 1 : charge === '`' ? -1 : 0
                ))
            });

            productsJoined.split('+').forEach((product, index) => {
                let productFormatted = [];
                if (!product)
                    errorMessages.push(`Molecular formula of product expected; '${product}' given.`);
                else if (Number.isInteger(product[0])) {
                    warningMessages.push(`Unbalanced equation expected; coefficient(s) given (${product[0]}) ignored.`)
                }
                else {
                    for (let element of product.match(/[A-Z][a-z]{0,2}\d*/g)) {
                        let coefficient = element.match(/\d+/g);
                        if (coefficient === "1")
                            warningMessages.push("The coefficient '1' should be omitted.");
                        if (coefficient === null)
                            coefficient = "1";
                        else
                            element = element.replace(coefficient, '');

                        productFormatted.push(element);
                        if (coefficient !== "1")
                            productFormatted.push(<sub key={product + index + element}>{coefficient}</sub>);

                        if (!recognizedElements.includes(element)) {
                            warningMessages.push(`Unrecognized element: ${element}`)
                        }

                        if (!(element in elements)) {
                            elements[element] = [];
                            errorMessages.push(`Element ${element} found in products but not in reactants.`)
                        }

                        while (elements[element].length < reactants.length + index) {
                            elements[element].push(new Fraction(0))
                        }
                        // notice the negative sign: products are on the other side of the system of equations
                        if (elements[element].length > reactants.length + index) {
                            elements[element][elements[element].length - 1] = elements[element][elements[element].length - 1].addFraction(new Fraction(-parseInt(coefficient, 10)))
                        } else {
                            elements[element].push(new Fraction(-parseInt(coefficient, 10)))
                        }
                    }
                }
                let charge = product.slice(-1);
                if (charge === '´')
                    productFormatted.push(<sup key={product + index}>+</sup>);
                else if (charge === '`')
                    productFormatted.push(<sup key={product + index}>-</sup>);

                products.push(productFormatted);

                while (elements.charge.length < reactants.length + index) {
                    elements.charge.push(new Fraction(0))
                }
                elements.charge.push(new Fraction(
                    charge === '´' ? -1 : charge === '`' ? +1 : 0
                ))
            });

            for (let element in elements) {
                while (elements[element].length < reactants.length + products.length)
                    elements[element].push(new Fraction(0))
            }

            if (errorMessages.length === 0) {
                let coefficients = new Matrix(elements).getNullSpace();
                let coefficientsInteger;
                if (coefficients.length > 1) {
                    warningMessages.push(`Equation ${equationFormula} can be balanced in infinitely many ways, `
                        + `because it consists of two or more different equations, `
                        + `or contains immutable group(s).`)
                }
                if (coefficients.length > 0) {
                    coefficients = coefficients.reduce((sum, currentSolutionVector) => {
                        if (sum === currentSolutionVector)
                            return sum;
                        else
                            for (let col = 0; col < currentSolutionVector.length; col++)
                                sum[col] = sum[col].addFraction(currentSolutionVector[col]);
                        return sum;
                    }, coefficients[0]);
                    let coefficientsCommonDenominator = coefficients.reduce((accumulator, current) =>
                        accumulator * current.denominator / Fraction.gcd(accumulator, current.denominator), 1);
                    coefficientsInteger = coefficients.map((fractionCoefficient) =>
                        fractionCoefficient.numerator * coefficientsCommonDenominator / fractionCoefficient.denominator);
                    if (coefficientsInteger.some(coefficient => coefficient === 0))
                        warningMessages.push("One or more reactants / products did not participate in the reaction.");
                } else {
                    warningMessages.push(`Equation ${equationFormula} cannot be balanced.`);
                    coefficientsInteger = new Array(reactants.length + products.length).fill(0);
                }
                balancedEquation = [];
                Array.prototype.concat(reactants, products).forEach((chemical, ptr) => {
                    balancedEquation.push(
                        <span key={chemical + ptr}>
                            <span className="number" key={ptr + chemical}>
                                {coefficientsInteger[ptr] !== 1 ? coefficientsInteger[ptr] : ""}
                            </span>
                            {chemical}
                        </span>
                    );
                    if (ptr !== reactants.length - 1 && ptr !== reactants.length + products.length - 1) {
                        balancedEquation.push(<span key={ptr + chemical + '+'}>+</span>)
                    }
                    else if (ptr === reactants.length - 1) {
                        balancedEquation.push(<span key={ptr + chemical + '->'}>&rarr;</span>)
                    }
                })
            }
        }

        this.setState({
            inputText: equationFormula,
            status: errorMessages.length !== 0 ? 'error' : warningMessages.length !== 0 ? 'warning' : 'ok',
            message: Array.prototype.concat(
                errorMessages.map((errorMessage) => <li className="errorMessage"
                                                        key={errorMessage}>{errorMessage}</li>),
                warningMessages.map((warningMessage) => <li className="warningMessage"
                                                            key={warningMessage}>{warningMessage}</li>)
            ),
            result: balancedEquation,
            done: true
        })
    }

    render() {
        return (
            <div>
                <input placeholder={this.props.defaultText}
                       value={this.state.inputText}
                       onChange={(e) => this.balanceEquation(e.target.value)}
                       disabled={!this.state.done}
                       className={this.state.status}
                       id="chemistryInput"/>
                <ul id="errorMessages">{this.state.message}</ul>
                <div id="result">{this.state.result}</div>
            </div>
        )
    }
}


ChemicalEquationBalancer.propTypes = {
    defaultText: PropTypes.string.isRequired,
};


export default ChemicalEquationBalancer
