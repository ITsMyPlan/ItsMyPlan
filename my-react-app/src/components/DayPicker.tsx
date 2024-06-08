// src/components/DayPicker.tsx
import React from "react";

interface DayPickerProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const DayPicker: React.FC<DayPickerProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const days = Array.from({ length: 30 }, (_, i) => new Date(2022, 3, i + 1)); // 예를 들어 2022년 4월의 30일을 생성

  return (
    <div className="flex overflow-x-auto p-4 bg-white rounded shadow-lg">
      {days.map((day) => (
        <button
          key={day.toDateString()}
          onClick={() => onSelectDate(day)}
          className={`p-2 m-1 rounded flex-shrink-0 ${
            day.toDateString() === selectedDate.toDateString()
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
          style={{ minWidth: "50px" }}
        >
          {day.getDate()}
        </button>
      ))}
    </div>
  );
};

export default DayPicker;
