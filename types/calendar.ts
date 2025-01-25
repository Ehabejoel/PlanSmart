export interface Task {
  id: string;
  title: string;
  time: string;
  category: 'work' | 'personal';
  completed?: boolean;
}

export type TasksByDate = {
  [date: string]: Task[];
};
