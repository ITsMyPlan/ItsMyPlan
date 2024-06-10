// src/components/TaskItem.tsx
import React from "react";
import {Task} from "../types"; // Task 인터페이스를 import 해야 해

interface TaskItemProps {
	task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({task}) => {
	return (
		<div className='flex justify-between items-center bg-white p-4 rounded shadow mb-2'>
			<div>
				<h2 className='text-xl'>{task.title}</h2>
				<p>{new Date(task.time).toLocaleTimeString()}</p>
			</div>
			<button className='bg-red-500 text-white p-2 rounded'>삭제</button>
		</div>
	);
};

export default TaskItem;
