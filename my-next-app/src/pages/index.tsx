import React, {useState, useEffect, useRef} from "react";
import {useMutation, useQueryClient, useQuery} from "@tanstack/react-query";

import Header from "../components/Header";
import CalendarPopup from "../components/CalendarPopup";
import TaskItem from "../components/TaskItem";
import AddTask from "../components/AddTask";
import DayPicker from "../components/DayPicker";
import {Task} from "../types/types";
import {fetchTasks, deleteTaskFromAPI} from "../utils/api";
import "react-datepicker/dist/react-datepicker.css";

const HomePage: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const calendarRef = useRef<HTMLDivElement>(null);
	const queryClient = useQueryClient();

	const {
		data: initialTasks,
		isLoading,
		error,
	} = useQuery<Task[], Error>({
		queryKey: ["tasks"],
		queryFn: fetchTasks,
		initialData: [], // 초기 데이터 설정
	});

	useEffect(() => {
		if (initialTasks) {
			setTasks(initialTasks);
		}
	}, [initialTasks]);

	const deleteMutation = useMutation<void, Error, string>({
		mutationFn: deleteTaskFromAPI,
		onSuccess: () => {
			setTasks(tasks.filter((task) => task.id !== deleteMutation.variables)); // 로컬 상태에서 삭제
			queryClient.invalidateQueries({
				queryKey: ["tasks"],
			});
		},
		onError: (error: Error) => {
			console.error("Failed to delete task:", error.message);
		},
	});
	const deleteTask = (id: string) => {
		console.log(id);
		deleteMutation.mutate(id);
	};

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

export default HomePage;
