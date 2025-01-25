export interface Task {
  id: string;
  title: string;
  category: 'work' | 'personal' | 'shopping';
  dueTime?: string;
  isCompleted: boolean;
}

export interface MetricItem {
  label: string;
  value: number;
  icon: string;
  color: string;
  trend: string;
}
