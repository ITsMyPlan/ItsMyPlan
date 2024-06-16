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
