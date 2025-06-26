
import React from 'react';
import { ToDoItem } from '../types';
import { TrashIcon, SquareIcon, CheckedSquareIcon } from '../constants';

interface TodoListViewProps {
  todos: ToDoItem[];
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoListView: React.FC<TodoListViewProps> = ({ todos, onToggleComplete, onDeleteTodo }) => {
  if (todos.length === 0) {
    return <p className="text-center text-slate-400 py-8">No tasks yet. Add some to get started!</p>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={`p-4 rounded-lg shadow-lg flex items-center justify-between transition-all duration-300 ease-in-out transform hover:scale-[1.02]
                      ${todo.completed ? 'bg-slate-700 opacity-70' : 'bg-slate-700/80 hover:bg-slate-600/90'}`}
        >
          <div className="flex items-center space-x-3 flex-grow">
            <button
              onClick={() => onToggleComplete(todo.id)}
              className={`focus:outline-none transition-colors duration-200 p-1 rounded-md ${todo.completed ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-400 hover:text-slate-200'}`}
              aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {todo.completed ? <CheckedSquareIcon className="w-6 h-6" /> : <SquareIcon className="w-6 h-6" />}
            </button>
            <div className="flex-grow">
              <p className={`font-semibold text-lg ${todo.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                {todo.task}
              </p>
              <p className={`text-xs ${todo.completed ? 'text-slate-500' : 'text-slate-400'}`}>
                {formatDate(todo.startDate)} - {formatDate(todo.endDate)}
              </p>
            </div>
          </div>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="text-pink-500 hover:text-pink-400 focus:outline-none transition-colors duration-200 p-1 rounded-md"
            aria-label="Delete task"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoListView;
