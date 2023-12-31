import React from "react";

import Countdown from "react-countdown";
const renderer = ({ days, hours, minutes, seconds, completed, className }) => {
	hours = (days % 24) + hours;
	if (completed) {
		return <span style={{ color: "#DC3545" }}>Presale has Ended!</span>;
	} else {
		return (
			<div className={`countdown ${className}`}>
				<div className="item">
					<span className="subtitle">
						{hours < 10 ? `0${hours}` : hours}
					</span>
					<span>hrs</span>
				</div>
				<div className="item">
					<span className="subtitle">
						{minutes < 10 ? `0${minutes}` : minutes}
					</span>
					<span>mins</span>
				</div>
				<div className="item">
					<span className="subtitle">
						{seconds < 10 ? `0${seconds}` : seconds}
					</span>
					<span>secs</span>
				</div>
			</div>
		);
	}
};
const CountdownCard = ({ targetDate }) => {
	const convertDate = (date, tzString) => {
		return new Date(
			(typeof date === "string" ? new Date(date) : date).toLocaleString(
				"en-US",
				{ timeZone: tzString }
			)
		);
	};
	return (
		<Countdown
			date={convertDate(targetDate, "Asia/singapore")}
			renderer={renderer}
		/>
	);
};

export default CountdownCard;
