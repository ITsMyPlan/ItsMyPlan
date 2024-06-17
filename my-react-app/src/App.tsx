import React, {useState, useEffect, useRef} from "react";
import Header from "./components/Header";
import CalendarPopup from "./components/CalendarPopup";
import TaskItem from "./components/TaskItem";
import AddTask from "./components/AddTask";
import DayPicker from "./components/DayPicker";
import {Task} from "./types";
import {fetchTasks, deleteTaskFromAPI} from "./api";
import "react-datepicker/dist/react-datepicker.css";

const App: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const calendarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadTasks = async () => {
			const loadedTasks = await fetchTasks();
			setTasks(loadedTasks);
		};
		loadTasks();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
				setIsCalendarOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
	};

	useEffect(() => {
		const loadTasks = async () => {
			const loadedTasks = await fetchTasks();
			setTasks(loadedTasks);
		};
		loadTasks();
	}, []);

	const handleSelectDate = (date: Date | null) => {
		setSelectedDate(date);
		setIsCalendarOpen(false);
	};

	const addTasks = (newTask: Task) => {
		console.log(`newTask: ${JSON.stringify(newTask)}`);
		setTasks([...tasks, newTask]);
	};

	const filteredTasks = selectedDate
		? tasks.filter((task) => new Date(task.time).toDateString() === selectedDate.toDateString())
		: tasks;

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
			{isCalendarOpen && (
				<CalendarPopup
					ref={calendarRef}
					isOpen={isCalendarOpen}
					onSelectDate={handleSelectDate}
					selectedDate={selectedDate || new Date()}
				/>
			)}
			<div className='p-4'>
				<DayPicker selectedDate={selectedDate || new Date()} onSelectDate={handleSelectDate} tasks={tasks} />
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
