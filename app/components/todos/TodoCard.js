import React from 'react';

const TodoCard = ({ task }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="p-3 text-center">{task._id || ""}</td>
      <td className="p-3 text-center">{task.category || ""}</td>
      <td className="p-3 text-center">{task.title || ""}</td>
      <td className="p-3 text-center">{task.description || ""}</td>
      <td className="p-3 text-center">{task.priority || ""}</td>
      <td className="p-3 text-center">{task.completed ? "Yes" : "No"}</td>
      <td className="p-3 text-center">{task.createdAt || ""}</td>
      <td className="p-3 text-center">{task.dueDate || ""}</td>
    </tr>
  );
};

export default TodoCard;