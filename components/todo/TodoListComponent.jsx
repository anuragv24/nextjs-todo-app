import TodoItem from "./TodoItem";

const TodoListComponent = ({ todos }) => {
  if (!todos.length) {
    return (
      <p className="text-center text-sm text-zinc-500 py-6">
        No todos added yet.
      </p>
    );
  }

  return (
    <div className="w-full">
      <ul className="space-y-2.5">
        {todos.map((todo) => (
          <li key={todo._id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListComponent;
