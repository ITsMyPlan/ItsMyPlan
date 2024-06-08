import React, { useState } from "react";
import Header from "./components/Header";
import CalendarPopup from "./components/CalendarPopup";
import TaskItem from "./components/TaskItem";
import AddTask from "./components/AddTask";
import DayPicker from "./components/DayPicker";

interface Task {
  title: string;
  detail: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Header onToggleCalendar={toggleCalendar} />
      <CalendarPopup isOpen={isCalendarOpen} />
      <div className="p-4">
        <DayPicker
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
        />
        <AddTask onAdd={addTask} />
        <div className="mt-4">
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={{ title: task.title, time: task.detail }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
