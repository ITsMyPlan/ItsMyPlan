import React, {useState} from "react";
import {TaskItemProps} from "../types";

const TaskItem: React.FC<TaskItemProps> = ({task, index, onDelete}) => {
	const [showDetails, setShowDetails] = useState(false);
	const toggleDetails = () => setShowDetails(!showDetails);

	const displayTime = new Date(task.time).toLocaleTimeString();
	const isValidDate = !isNaN(new Date(task.time).getTime());
	//   console.log(displayTime, isValidDate);

	return (
		<div className='flex flex-col justify-between p-4 mb-2 bg-white rounded shadow'>
			<div onClick={toggleDetails} className='cursor-pointer'>
				<h2 className='text-xl'>{task.title}</h2>
				{showDetails && <p>{task.detail}</p>}
			</div>
			<div className='flex items-center justify-between'>
				<p>{isValidDate ? displayTime : "Invalid time"}</p>
				<button onClick={() => onDelete(task.id)} className='p-2 text-white rounded bg-rose-600'>
					삭제
				</button>
			</div>
		</div>
	);
};

export default TaskItem;
