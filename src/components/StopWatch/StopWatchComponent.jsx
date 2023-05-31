import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faPause,
	faStop,
	faRedo,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";

function StopWatchComponent() {
	const [time, setTime] = React.useState(0);
	const [timerOn, setTimerOn] = React.useState(false);

	React.useEffect(() => {
		let interval = null;

		if (timerOn) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 10);
			}, 10);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [timerOn]);

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1>StopWatch</h1>
						<div className="stopwatch">
							<div className="stopwatch__time">
								<span className="stopwatch__text">
									{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
								</span>
								<span className="stopwatch__text">
									{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
								</span>
								<span className="stopwatch__text">
									{("0" + ((time / 10) % 100)).slice(-2)}
								</span>
								<span className="stopwatch__text">
									{("0" + (time % 10)).slice(-1)}
								</span>
							</div>
							<div className="stopwatch__buttons">
								{!timerOn && time === 0 && (
									<button
										className="stopwatch__button"
										onClick={() => setTimerOn(true)}
									>
										<FontAwesomeIcon icon={faPlay} />
									</button>
								)}
								{timerOn && (
									<button
										className="stopwatch__button"
										onClick={() => setTimerOn(false)}
									>
										<FontAwesomeIcon icon={faPause} />
									</button>
								)}
								{timerOn && (
									<button
										className="stopwatch__button"
										onClick={() => {
											setTimerOn(false);
											setTime(0);
										}}
									>
										<FontAwesomeIcon icon={faStop} />
									</button>
								)}
								{!timerOn && time > 0 && (
									<Fragment>
										<button
											className="stopwatch__button"
											onClick={() => setTimerOn(true)}
										>
											<FontAwesomeIcon icon={faPlay} />
										</button>
										<button
											className="stopwatch__button"
											onClick={() => setTime(0)}
										>
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
