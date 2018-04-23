class Stopwatch extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            running: false,
            resultList: [],
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
        };
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }
        });
    }

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

	step() {
    if (!this.state.running) return;
    this.calculate();
	}

	calculate() {
	    let { minutes, seconds, milliseconds } = this.state.times;

        milliseconds += 1;
        if (milliseconds >= 100) {
            seconds += 1;
            milliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState({
            times: {
                minutes: minutes,
                seconds: seconds,
                milliseconds: milliseconds
            }
        });
    }

	stop() {
	    if (this.state.running) {
	    	this.setState({
                running: false
            });
	    clearInterval(this.watch);
		}
	}

	zero() {
        if (!this.state.running) {
            this.reset();
        }
    }

    render() {
    return (
        <div className='border'>
            <div className='controls text-center'>
                <a href='#' className='button btn btn-lg btn-success' onClick={this.start.bind(this)}>Start</a>
                <a href='#' className='button btn btn-lg btn-danger' onClick={this.stop.bind(this)}>Stop</a>
                <a href='#' className='button btn btn-lg btn-warning' onClick={this.zero.bind(this)}>Reset</a>
            </div>
            <div>
            {this.format(this.state.times)}
            </div>
        </div>
        );
    }

}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }

    return result;
}


ReactDOM.render(<Stopwatch/>, document.querySelector('.stopwatch'))


