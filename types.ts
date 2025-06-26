
export interface ToDoItem {
  id: string;
  task: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  completed: boolean;
}

export enum ViewMode {
  LIST = 'LIST',
  GANTT = 'GANTT',
}

// For Gantt chart data transformation
export interface GanttChartDataItem {
  id: string;
  taskName: string;
  startOffset: number; // Days from the earliest task start date
  duration: number;    // Duration in days
  originalStartDate: string;
  originalEndDate: string;
  completed: boolean;
}
