export type TaskCategory = "Planting" | "Harvesting" | "Irrigation" | "Fertilizing" | "Pest Control" | "General";
export type TaskPriority = "Critical" | "High" | "Medium" | "Low";
export type TaskStatus = "Pending" | "In Progress" | "Done" | "Overdue";

export interface FarmTask {
  id: number;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  date: string;
  time?: string;
  farm?: string;
  assignee?: string;
  notes?: string;
  recurringDays?: number;
}
