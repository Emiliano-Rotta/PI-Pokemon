import React from "react";
// import style from "./Home.module.css";
import "./Loading.module.css";

const Loading = () => {
	return (
		<div className='loader' role='progressbar' aria-label='loading pokethings'>
			<div className='pokeball-container'>
				<div className='pokeball'></div>
			</div>
		</div>
	);
};

export default Loading;