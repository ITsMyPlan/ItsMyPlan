import React, {useState} from "react";
import Header from "./components/Header";
import CalendarPopup from "./components/CalendarPopup";
import TaskItem from "./components/TaskItem";
import AddTask from "./components/AddTask";
import DayPicker from "./components/DayPicker";
import {Task} from "./types";

const App: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const toggleCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
	};

	const addTask = (task: Task) => {
		// 현재 시간을 ISO 형식으로 설정
		const currentTime = new Date().toISOString();
		setTasks([...tasks, {...task, time: currentTime}]);
	};

	const handleSelectDate = (date: Date) => {
		setSelectedDate(date);
	};

	return (
		<div className='min-h-screen bg-gray-200'>
			<Header onToggleCalendar={toggleCalendar} />
			<CalendarPopup isOpen={isCalendarOpen} />
			<div className='p-4'>
				<DayPicker selectedDate={selectedDate} onSelectDate={handleSelectDate} />
				<div className='mt-4'>
					{tasks.map((task, index) => (
						<TaskItem key={index} task={task} />
					))}
				</div>
				<AddTask onAdd={addTask} />
			</div>
		</div>
	);
};

export default App;
