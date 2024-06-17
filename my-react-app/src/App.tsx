import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import CalendarPopup from "./components/CalendarPopup";
import TaskItem from "./components/TaskItem";
import AddTask from "./components/AddTask";
import DayPicker from "./components/DayPicker";
import {Task} from "./types";
import {fetchTasks, deleteTaskFromAPI} from "./api";

const App: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	useEffect(() => {
		const loadTasks = async () => {
			const loadedTasks = await fetchTasks();
			setTasks(loadedTasks);
		};
		loadTasks();
	}, []);

	const toggleCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
	};

	const addTasks = (newTask: Task) => {
		console.log(`newTask: ${JSON.stringify(newTask)}`);
		setTasks([...tasks, newTask]); // 상태 업데이트
	};

	const filteredTasks = tasks.filter((task) => new Date(task.time).toDateString() === selectedDate.toDateString());

	const handleSelectDate = (date: Date) => {
		setSelectedDate(date);
	};

	const deleteTask = async (id: string) => {
		console.log(`deleteTask 클릭: ${id}`);
		try {
			await deleteTaskFromAPI(id);
			const newTasks = tasks.filter((task) => task.id !== id);
			setTasks(newTasks);
		} catch (error) {
			console.error("Failed to delete task:", error);
		}
	};
	return (
		<div className='min-h-screen bg-gray-200'>
			<Header onToggleCalendar={toggleCalendar} />
			<CalendarPopup isOpen={isCalendarOpen} />
			<div className='p-4'>
				<DayPicker selectedDate={selectedDate} onSelectDate={handleSelectDate} tasks={tasks} />
				<div className='mt-4'>
					{filteredTasks.map((task, index) => (
						<TaskItem key={index} task={task} index={index} onDelete={deleteTask} />
					))}
				</div>
				<AddTask onAdd={addTasks} />
			</div>
		</div>
	);
};

export default App;
