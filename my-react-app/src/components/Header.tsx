import React from "react";
import {HeaderProps} from "../types";

const Header: React.FC<HeaderProps> = ({onToggleCalendar}) => {
	return (
		<div className='flex justify-between items-center p-4 text-black shadow-md font-helvetica'>
			<h1 className='text-2xl font-normal'>It's My Plan</h1>
			<button
				onClick={onToggleCalendar}
				className='transition duration-300 ease-in-out transform hover:scale-110 bg-white text-blue-500 p-2 rounded shadow'
				style={{transition: "all 0.3s ease-in-out"}}>
				더보기
			</button>
		</div>
	);
};

export default Header;
