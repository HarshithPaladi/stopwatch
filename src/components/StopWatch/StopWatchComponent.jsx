import "./StopWatchComponent.css";
import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faPause,
	faStop,
	faRedo,
} from "@fortawesome/free-solid-svg-icons";

function StopWatchComponent() {
	const [startTime, setStartTime] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [timerOn, setTimerOn] = useState(false);

	useEffect(() => {
		if (timerOn) {
			const timer = setInterval(() => {
				setCurrentTime(Date.now() - startTime);
			}, 50);

			return () => clearInterval(timer);
		}
	}, [timerOn, startTime]);

	const startTimer = () => {
		setTimerOn(true);
		setStartTime(Date.now() - currentTime);
	};

	const pauseTimer = () => {
		setTimerOn(false);
	};

	const stopTimer = () => {
		setTimerOn(false);
		setCurrentTime(0);
	};

	const resetTimer = () => {
		setStartTime(Date.now());
		setCurrentTime(0);
	};

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1>
							<a href="/">StopWatch</a>
						</h1>
						<div className="stopwatch">
							<div className="stopwatch__time">
								<span className="stopwatch__text">
									{("0" + Math.floor((currentTime / 60000) % 60)).slice(-2)}
								</span>
								{/* <span className="stopwatch__unit">H</span> */}
								<span className="stopwatch__text">:</span>
								<span className="stopwatch__text">
									{("0" + Math.floor((currentTime / 1000) % 60)).slice(-2)}
								</span>
								{/* <span className="stopwatch__unit">M</span> */}
								<span className="stopwatch__text">.</span>
								<span className="stopwatch__text ms">
									{("0" + Math.floor((currentTime % 1000) / 10)).slice(-2)}
								</span>
								{/* <span className="stopwatch__unit">ms</span> */}
							</div>
							<div className="stopwatch__buttons">
								{!timerOn && currentTime === 0 && (
									<button className="stopwatch__button" onClick={startTimer}>
										<FontAwesomeIcon icon={faPlay} />
									</button>
								)}
								{timerOn && (
									<Fragment>
										<button className="stopwatch__button" onClick={pauseTimer}>
											<FontAwesomeIcon icon={faPause} />
										</button>
										<button className="stopwatch__button" onClick={stopTimer}>
											<FontAwesomeIcon icon={faStop} />
										</button>
									</Fragment>
								)}
								{!timerOn && currentTime > 0 && (
									<Fragment>
										<button className="stopwatch__button" onClick={startTimer}>
											<FontAwesomeIcon icon={faPlay} />
										</button>
										<button className="stopwatch__button" onClick={resetTimer}>
											<FontAwesomeIcon icon={faRedo} />
										</button>
									</Fragment>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default StopWatchComponent;
