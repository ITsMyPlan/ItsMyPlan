import React, {useState} from "react";
import {Task, AddTaskProps} from "../types/types";
import {addTask} from "../utils/api";
import {v4 as uuidv4} from "uuid";

const AddTask: React.FC<AddTaskProps> = ({onAdd}) => {
	const [title, setTitle] = useState("");
	const [detail, setDetail] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newTask: Task = {
			id: uuidv4(),
			title,
			detail,
			time: new Date().toISOString(),
		};
		console.log("Sending to server:", newTask);
		try {
			await addTask(newTask);
			onAdd(newTask);
			setTitle("");
			setDetail("");
		} catch (error) {
			console.error("Error adding task:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='p-4 bg-gray-100 rounded shadow-md'>
			<div className='mb-2'>
				<label className='block mb-1'>제목</label>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='w-full p-2 border rounded'
				/>
			</div>
			<div className='mb-4'>
				<label className='block mb-1'>내용</label>
				<input
					type='text'
					value={detail}
					onChange={(e) => setDetail(e.target.value)}
					className='w-full p-2 border rounded'
				/>
			</div>
			<button type='submit' className='w-full p-2 text-white rounded bg-cyan-700'>
				추가
			</button>
		</form>
	);
};

export default AddTask;
