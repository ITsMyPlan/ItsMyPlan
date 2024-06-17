import React, {useState} from "react";
import {format, addDays, startOfWeek} from "date-fns";
import {DayPickerProps} from "../types";

const DayPicker: React.FC<DayPickerProps> = ({selectedDate, onSelectDate}) => {
	const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), {weekStartsOn: 1}));

	const days = Array.from({length: 7}, (_, i) => addDays(currentWeek, i));

	const handlePrevWeek = () => {
		const newWeek = addDays(currentWeek, -7);
		setCurrentWeek(newWeek);
	};

	const handleNextWeek = () => {
		const newWeek = addDays(currentWeek, 7);
		setCurrentWeek(newWeek);
	};

	return (
		<div className='flex items-center justify-center w-full p-4 '>
			<button onClick={handlePrevWeek} className='px-4 py-2 mr-4 bg-gray-300 rounded-lg'>
				&lt;
			</button>
			<div className='flex flex-grow w-full overflow-x-hidden'>
				{days.map((day) => (
					<button
						key={day.toISOString()}
						onClick={() => onSelectDate(day)}
						className={`flex flex-col  items-center p-2 mx-1 rounded-lg flex-1 ${
							day.toDateString() === selectedDate.toDateString()
								? "bg-cyan-500 text-white"
								: "bg-stone-50 text-gray-800"
						}`}
						style={{minWidth: "80px"}}>
						<span className='text-sm'>{format(day, "MMM")}</span>
						<strong className='text-lg'>{format(day, "d")}</strong>
						<span className='text-xs'>{format(day, "EEE")}</span>
					</button>
				))}
			</div>
			<button onClick={handleNextWeek} className='px-4 py-2 ml-4 bg-gray-300 rounded-lg'>
				&gt;
			</button>
		</div>
	);
};

export default DayPicker;
