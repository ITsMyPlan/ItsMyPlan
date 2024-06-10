import React, {useState} from "react";
import {TaskItemProps} from "../types";

const TaskItem: React.FC<TaskItemProps> = ({task, index, onDelete}) => {
	const [showDetails, setShowDetails] = useState(false);

	const toggleDetails = () => setShowDetails(!showDetails);

	return (
		<div className='flex flex-col justify-between bg-white p-4 rounded shadow mb-2'>
			<div onClick={toggleDetails} className='cursor-pointer'>
				<h2 className='text-xl'>{task.title}</h2>
				{showDetails && <p>{task.detail}</p>}
			</div>
			<div className='flex justify-between items-center'>
				<p>{new Date(task.time).toLocaleTimeString()}</p>
				<button onClick={() => onDelete(index)} className='bg-red-500 text-white p-2 rounded'>
					삭제
				</button>
			</div>
		</div>
	);
};

export default TaskItem;
