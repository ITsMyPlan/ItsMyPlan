import React from "react";

interface TaskItemProps {
  task: {
    title: string;
    time: string;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-2">
      <div>
        <h2 className="text-xl">{task.title}</h2>
        <p>{task.time}</p>
      </div>
      <button className="bg-red-500 text-white p-2 rounded">삭제</button>
    </div>
  );
};

export default TaskItem;
