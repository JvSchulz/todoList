
import React, { useState, useEffect, useCallback } from 'react';
import { ToDoItem, ViewMode } from './types';
import { LOCAL_STORAGE_KEY, ListIcon, GanttIcon } from './constants';
import TodoForm from './components/TodoForm.tsx';
import TodoListView from './components/TodoListView.tsx';
import GanttChartView from './components/GanttChartView.tsx';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.LIST);

  // Load todos from localStorage on initial mount
  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      // Optionally set to empty array or handle error state
      setTodos([]);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) { // Added curly braces here
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  const handleAddTodo = useCallback((task: string, startDate: string, endDate: string) => {
    if (!task.trim() || !startDate || !endDate) {
      alert("Task description, start date, and end date are required.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }
    const newTodo: ToDoItem = {
      id: crypto.randomUUID(),
      task,
      startDate,
      endDate,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, []);

  const handleToggleComplete = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDeleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          TaskMaster Pro
        </h1>
        <p className="text-slate-400 mt-2">Organize Your Life, Visualize Your Progress</p>
      </header>

      <div className="max-w-4xl mx-auto bg-slate-800 shadow-2xl rounded-lg p-6">
        <TodoForm onAddTodo={handleAddTodo} />

        <div className="my-6 flex justify-center items-center space-x-2 border-b border-slate-700 pb-4 mb-6">
          <button
            onClick={() => setViewMode(ViewMode.LIST)}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 ease-in-out
                        ${viewMode === ViewMode.LIST ? 'bg-indigo-600 text-white shadow-lg transform scale-105' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            aria-pressed={viewMode === ViewMode.LIST}
          >
            <ListIcon />
            <span>List View</span>
          </button>
          <button
            onClick={() => setViewMode(ViewMode.GANTT)}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 ease-in-out
                        ${viewMode === ViewMode.GANTT ? 'bg-indigo-600 text-white shadow-lg transform scale-105' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
            aria-pressed={viewMode === ViewMode.GANTT}
          >
            <GanttIcon />
            <span>Gantt View</span>
          </button>
        </div>
        
        {viewMode === ViewMode.LIST ? (
          <TodoListView
            todos={todos}
            onToggleComplete={handleToggleComplete}
            onDeleteTodo={handleDeleteTodo}
          />
        ) : (
          <GanttChartView todos={todos} />
        )}
      </div>
      <footer className="text-center mt-12 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} TaskMaster Pro. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;