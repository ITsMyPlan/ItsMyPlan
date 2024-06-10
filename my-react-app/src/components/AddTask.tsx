import React, {useState} from "react";
import {Task, AddTaskProps} from "../types";

const AddTask: React.FC<AddTaskProps> = ({onAdd}) => {
	const [title, setTitle] = useState("");
	const [detail, setDetail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newTask: Task = {
			title,
			detail,
			time: new Date().toISOString(), // 여기에서 시간 설정
		};
		onAdd(newTask);
		setTitle("");
		setDetail("");
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
			<button type='submit' className='bg-blue-500 text-white p-2 rounded w-full'>
				추가
			</button>
		</form>
	);
};

export default AddTask;
