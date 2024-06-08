import React from "react";

interface CalendarPopupProps {
  isOpen: boolean;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-0 bg-white p-4 rounded shadow-lg">
      <div className="text-center mb-4">April 2022</div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
        {[...Array(30).keys()].map((_, i) => (
          <div key={i + 1} className="p-2">
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPopup;
