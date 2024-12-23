"use client";
import React from 'react';

const TodoCard = ({ task }) => {

  console.log("task:", task)

  return (
    <tr className="border border-gray-300 bg-white hover:bg-gray-100">
      <td className="p-2 text-center border border-gray-300">{task._id || ""}</td>
      <td className="p-2 text-center border border-gray-300">{task.title || ""}</td>
      <td className="p-2 text-center border border-gray-300">{task.category || ""}</td>
      <td className="p-2 text-center border border-gray-300">{task.description || ""}</td>
      <td className="p-2 text-center border border-gray-300">{task.priority || ""}</td>
      <td className="p-2 text-center border border-gray-300">{task.completed ? "Yes" : "No"}</td>
      <td className="p-2 text-center border border-gray-300">{task.createdAt || ""}</td>
      <td className="p-2 text-center border border-gray-300">{task.dueDate || ""}</td>
    </tr>
  );
};

export default TodoCard;