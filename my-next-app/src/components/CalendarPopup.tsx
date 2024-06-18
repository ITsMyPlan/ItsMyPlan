import React, {forwardRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarPopupProps {
	isOpen: boolean;
	onSelectDate: (date: Date | null) => void;
	selectedDate: Date;
}

const CalendarPopup = forwardRef<HTMLDivElement, CalendarPopupProps>(({isOpen, onSelectDate, selectedDate}, ref) => {
	if (!isOpen) return null;

	return (
		<div ref={ref} className='absolute right-0 p-4 bg-white rounded shadow-lg top-16'>
			<DatePicker inline selected={selectedDate} onChange={onSelectDate} dateFormat='yyyy-MM-dd' />
		</div>
	);
});

export default CalendarPopup;
