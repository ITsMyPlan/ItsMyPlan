import React, { useState } from "react";
import { TaskItemProps } from "../types";

const TaskItem: React.FC<TaskItemProps> = ({ task, index, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  // 날짜 유효성 검사
  console.log(`task: ${JSON.stringify(task)}, task.time: ${task.time}`);

  const displayTime = new Date(task.time).toLocaleTimeString();
  const isValidDate = !isNaN(new Date(task.time).getTime());
  //   console.log(displayTime, isValidDate);

  return (
    <div className="flex flex-col justify-between bg-white p-4 rounded shadow mb-2">
      <div onClick={toggleDetails} className="cursor-pointer">
        <h2 className="text-xl">{task.title}</h2>
        {showDetails && <p>{task.detail}</p>}
      </div>
      <div className="flex justify-between items-center">
        <p>{isValidDate ? displayTime : "Invalid time"}</p>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white p-2 rounded"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
