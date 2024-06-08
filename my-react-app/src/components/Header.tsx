import React from "react";

interface HeaderProps {
  onToggleCalendar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleCalendar }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-2xl">투두 리스트</h1>
      <button
        onClick={onToggleCalendar}
        className="bg-white text-blue-500 p-2 rounded"
      >
        더보기
      </button>
    </div>
  );
};

export default Header;
