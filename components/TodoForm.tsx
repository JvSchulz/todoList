
import React, { useState } from 'react';
import { PlusIcon } from '../constants';

interface TodoFormProps {
  onAddTodo: (task: string, startDate: string, endDate: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [task, setTask] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim() || !startDate || !endDate) return;
    onAddTodo(task, startDate, endDate);
    setTask('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-slate-700 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-3">
          <label htmlFor="task" className="block text-sm font-medium text-slate-300 mb-1">
            Task Description
          </label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="E.g., Design homepage"
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-slate-100 placeholder-slate-400"
            required
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-slate-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-slate-100"
            required
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-slate-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-slate-100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto justify-self-start md:justify-self-end px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors flex items-center justify-center space-x-2"
        >
          <PlusIcon />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
