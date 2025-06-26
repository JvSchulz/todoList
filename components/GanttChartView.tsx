
import React, { useMemo } from 'react';
import { ToDoItem, GanttChartDataItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';


const GanttChartView: React.FC<{ todos: ToDoItem[] }> = ({ todos }) => {
  const chartData = useMemo(() => {
    if (todos.length === 0) return [];

    const sortedTodos = [...todos].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    const overallMinDate = new Date(sortedTodos[0].startDate);

    return sortedTodos.map((todo): GanttChartDataItem => {
      const taskStartDate = new Date(todo.startDate);
      const taskEndDate = new Date(todo.endDate);

      const startOffset = Math.max(0, Math.round((taskStartDate.getTime() - overallMinDate.getTime()) / (1000 * 60 * 60 * 24)));
      let duration = Math.round((taskEndDate.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      if (duration < 1) duration = 1; // Ensure duration is at least 1 day

      return {
        id: todo.id,
        taskName: todo.task,
        startOffset,
        duration,
        originalStartDate: todo.startDate,
        originalEndDate: todo.endDate,
        completed: todo.completed,
      };
    });
  }, [todos]);

  if (todos.length === 0) {
    return <p className="text-center text-slate-400 py-8">No tasks to display in Gantt chart. Add some tasks first!</p>;
  }
  
  const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
    // Ensure 'active' is true, 'payload' array exists, and has at least two items
    // because comments indicate interest in payload[1] (the second entry).
    if (active && payload && payload.length > 1) {
      // payload is an array of TooltipPayload objects.
      // We are interested in the 'payload' property of the second entry (payload[1]), 
      // which corresponds to the 'duration' bar's data.
      const activePayloadEntry = payload[1]; // This is TooltipPayload<ValueType, NameType>

      // Check if this activePayloadEntry (TooltipPayload object) exists and 
      // if its 'payload' property (the actual data item) is defined.
      // The inner 'payload' is optional on the TooltipPayload type.
      if (activePayloadEntry && typeof activePayloadEntry.payload !== 'undefined') {
        const data = activePayloadEntry.payload as GanttChartDataItem;
        return (
          <div className="bg-slate-700 p-3 rounded shadow-lg border border-slate-600 text-sm">
            <p className="font-bold text-indigo-400 mb-1">{data.taskName}</p>
            <p className="text-slate-300">Start: {new Date(data.originalStartDate).toLocaleDateString()}</p>
            <p className="text-slate-300">End: {new Date(data.originalEndDate).toLocaleDateString()}</p>
            <p className="text-slate-300">Duration: {data.duration} day(s)</p>
            <p className={data.completed ? "text-emerald-400" : "text-amber-400"}>
              Status: {data.completed ? 'Completed' : 'Pending'}
            </p>
          </div>
        );
      }
    }
    return null;
  };
  
  const maxDomainValue = Math.max(...chartData.map(d => d.startOffset + d.duration), 0) + 5;


  return (
    <div className="w-full h-[500px] bg-slate-700 p-4 rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 5, right: 30, left: 100, bottom: 20 }} // Increased left margin for task names
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            type="number" 
            stroke="#94a3b8" 
            label={{ value: 'Days from Project Start', position: 'insideBottom', offset: -15, fill: '#94a3b8', fontSize: '0.9rem' }}
            domain={[0, maxDomainValue]}
            allowDecimals={false}
          />
          <YAxis 
            dataKey="taskName" 
            type="category" 
            stroke="#94a3b8" 
            width={150} // Ensure enough space for task names
            tick={{ fontSize: '0.8rem', fill: '#cbd5e1' }} // Style Y-axis ticks
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(71, 85, 105, 0.5)' }}/>
          <Legend wrapperStyle={{ color: '#e2e8f0', paddingTop: '10px' }}/>
          
          {/* Invisible bar for offset */}
          <Bar dataKey="startOffset" stackId="a" fill="transparent" stroke="transparent" legendType="none" />
          
          {/* Actual task bar */}
          <Bar dataKey="duration" stackId="a" name="Task Duration">
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={entry.completed ? '#34d399' /* emerald-400 */ : '#60a5fa' /* blue-400 */} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GanttChartView;
