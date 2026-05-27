import TodoItem from "./TodoItem";
import { ClipboardList } from "lucide-react";

const TodoListComponent = ({ todos }) => {
  if (!todos.length) {
    return (
      <div
        className="
          flex flex-col items-center justify-center
          rounded-3xl
          border border-dashed border-white/10
          bg-black/10
          px-6 py-16
          text-center
        "
      >
        {/* Icon */}
        <div
          className="
            mb-5
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-gradient-to-br
            from-indigo-500/20
            to-cyan-500/20
          "
        >
          <ClipboardList size={30} className="text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white">No tasks yet</h3>

        {/* Description */}
        <p className="mt-2 max-w-md text-sm text-slate-400">
          Start by adding your first task to this todo list.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full space-y-5">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Tasks</h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage and track your progress
          </p>
        </div>

        {/* Count Badge */}
        <div
          className="
            rounded-full
            border border-white/10
            bg-white/5
            px-4 py-2
            text-sm text-slate-300
            backdrop-blur-xl
          "
        >
          {todos.length} Tasks
        </div>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li
            key={todo._id}
            className="
              animate-in fade-in-0 slide-in-from-bottom-2
              duration-300
            "
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListComponent;
