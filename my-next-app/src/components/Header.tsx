import React from "react";
import {HeaderProps} from "../types/types";

const Header: React.FC<HeaderProps> = ({onToggleCalendar}) => {
	return (
		<div className='flex items-center justify-between p-4 text-black shadow-md font-helvetica'>
			<h1 className='text-2xl font-normal'>It's My Plan</h1>
			<button
				onClick={onToggleCalendar}
				className='p-2 text-blue-500 bg-white rounded shadow hover:bg-blue-100'
				style={{transition: "background-color 0.3s ease-in-out"}}>
				더보기
			</button>
		</div>
	);
};

export default Header;
