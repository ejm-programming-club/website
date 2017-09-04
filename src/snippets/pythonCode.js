import React, {Component} from 'react'
import './pythonCode.css'


class PythonCodeConsole extends Component {
    render() {
        return (
            <pre className="code">
                <span className="comment"># Clock in Python 3.6</span><br/>
                <span className="keyWord">import</span> datetime<br/>
                <span className="keyWord">import</span> sys<br/>
                <br/>
                <br/>
                <span className="keyWord">def</span> <span className="functionName">f</span>(<span className="param">number</span>):<br/>
                {'    '}<span className="keyWord">return</span> <span className="builtIn">str</span>(<span className="param">number</span>).zfill(2)<br/>
                <br/>
                <br/>
                <span className="keyWord">while True</span>:<br/>
                {'    '}now <span className="functionName">=</span> datetime.datetime.now()<br/>
                {'    '}<span className="comment"># clears the screen; print() does not do so</span><br/>
                {'    '}sys.stdout.write(<br/>
                {'        '}<span className="string">'<span className="escaped">\r</span>'</span><br/>
                {'        '}<span className="functionName">+</span> <span className="string">f"{'{'}<span className="formattedString">f(now.hour)</span>{'}'}:{'{'}<span className="formattedString">f(now.minute)</span>{'}'}:{'{'}<span className="formattedString">f(now.second)</span>{'}'}"</span><br/>
                {'          '}<span className="string">f" 周{'{'}<span className="formattedString">'一二三四五六日' <span className="functionName">[</span>now.weekday()<span className="functionName">]</span></span>} {'{'}<span className="formattedString">now.date()</span>{'}'}"</span><br/>
                {'    '})<br/>{'\n'}{/*Empty line at the end of file is very important! (it's actually a space)*/}
            </pre>
        )
    }
}


const f = function (s) {
    s = String(s);
    while (s.length < 2) {
        s = "0" + s;
    }
    return s;
};

export class ConsoleClock extends Component {
    constructor() {
        super();
        this.state = {
            timeNow: new Date()
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({timeNow: new Date()}), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const timeNow = this.state.timeNow;
        return (
            <pre className="terminal">
                {f(timeNow.getHours())}:{f(timeNow.getMinutes())}:{f(timeNow.getSeconds())}
                {' '}
                周{'一二三四五六日'.slice(timeNow.getDay() - 1, timeNow.getDay())}
                {' '}
                {timeNow.getFullYear()}-{f(timeNow.getMonth())}-{f(timeNow.getDate())}
                {/*21:05:34 周一, 2017-09-04*/}
            </pre>
        )
    }
}


export default PythonCodeConsole
