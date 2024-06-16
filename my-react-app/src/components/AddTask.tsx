import React, { useState } from "react";
import { Task, AddTaskProps } from "../types";
import { addTask } from "../api";

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      title,
      detail,
      time: new Date().toISOString(),
    };
    console.log("Sending to server:", newTask);
    try {
      const addedTask = await addTask(newTask);
      onAdd(addedTask); // 부모 컴포넌트에 추가된 태스크 전달
      setTitle("");
      setDetail("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
      <div className="mb-2">
        <label className="block mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">내용</label>
        <input
          type="text"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        추가
      </button>
    </form>
  );
};

export default AddTask;
