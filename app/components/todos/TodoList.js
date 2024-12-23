import TodoCard from './TodoCard';

const TodoList = async({ category = "Regalos" }) => {
  
  const response = await fetch(`http://localhost:3000/api/todos/category/${category}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log(data)
  const todosArray = Array.isArray(data.todo?.payload) ? data.todo?.payload : [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-center border border-gray-300">Id</th>
            <th className="p-2 text-center border border-gray-300">Title</th>
            <th className="p-2 text-center border border-gray-300">Category</th>
            <th className="p-2 text-center border border-gray-300">Description</th>
            <th className="p-2 text-center border border-gray-300">Priority</th>
            <th className="p-2 text-center border border-gray-300">Completed</th>
            <th className="p-2 text-center border border-gray-300">Created At</th>
            <th className="p-2 text-center border border-gray-300">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {todosArray.map((task) => (
            <TodoCard key={task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;