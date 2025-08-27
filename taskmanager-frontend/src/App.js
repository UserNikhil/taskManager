import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (task) => {
    await createTask(task);
    loadTasks();
  };

  const handleToggle = async (task) => {
    await updateTask(task.id, { ...task, completed: !task.completed });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleUpdate = async (id, updatedTask) => {
    await updateTask(id, updatedTask);
    loadTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm onAdd={handleAdd} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
