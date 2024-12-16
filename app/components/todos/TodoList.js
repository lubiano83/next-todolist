import React from 'react';
import TodoCard from './TodoCard';

const TodoList = async() => {

    const response = await fetch("http://localhost:3000/api/todo", { cache: "no-store" });
    const data = await response.json();
    const dataTodos = data.payload.todos;
    const todosArray = Array.isArray(dataTodos) ? dataTodos : [dataTodos];

  return (
    <div>
        {
            todosArray.map(task => (
                <TodoCard key={task._id} task={task} />
            ))
        }
    </div>
  )
}

export default TodoList;