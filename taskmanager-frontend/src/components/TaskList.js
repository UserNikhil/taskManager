
import React, { useState } from 'react';

const TaskList = ({ tasks, onToggle, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const handleSave = (task) => {
    onUpdate(task.id, { ...task, title: editValue });
    setEditingId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <div className="task-content">
            {editingId === task.id ? (
              <input
                type="text"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
              />
            ) : (
              <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                onClick={() => onToggle(task)}
              >
                {task.title}
              </span>
            )}
          </div>
          <div className="task-actions">
            {editingId === task.id ? (
              <>
                <button onClick={() => handleSave(task)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => onDelete(task.id)}>Delete</button>
                <button onClick={() => handleEditClick(task)}>Update</button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
