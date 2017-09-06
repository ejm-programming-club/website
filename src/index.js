import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
// Pages
import Homepage from './pages/Home';
import About from './pages/About';
import Registration from './pages/Registration';
import Preparation from './pages/Preparation';
import Success from './pages/Success';
import './commonStyle.css';


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/about" component={About}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/preparation" component={Preparation}/>
                    <Route path="/success" component={Success}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
