export interface HeaderProps {
	onToggleCalendar: () => void;
}

export interface Task {
	id: string;
	title: string;
	detail: string;
	time: string;
}

export interface AddTaskProps {
	onAdd: (task: Task) => void;
}

export interface TaskItemProps {
	task: Task;
	index: number;
	onDelete: (id: string) => void;
}

export interface DayPickerProps {
	selectedDate: Date;
	onSelectDate: (date: Date) => void;
	tasks: Task[];
}

export interface CalendarPopupProps {
	isOpen: boolean;
	onSelectDate: (date: Date | null) => void;
	selectedDate: Date | null;
}
