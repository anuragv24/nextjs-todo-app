const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;

const completedTodos = todos.filter(
    (todo) => todo.status === "completed"
  ).length;

  const pendingTodos = todos.filter(
    (todo) => todo.status === "pending"
  ).length;

  const inProgressTodos = todos.filter(
    (todo) => todo.status === "in-progress"
  ).length;


  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm tracking-tight font-medium">
      <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-4 py-3 text-center">
        <p className="text-zinc-400">Total Tasks</p>

        <span className="text-zinc-100 text-lg font-semibold">
          {totalTodos}
        </span>
      </div>

      <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-4 py-3 text-center">
        <p className="text-zinc-400">Pending</p>

        <span className="text-yellow-400 text-lg font-semibold">
          {pendingTodos}
        </span>
      </div>

      <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-4 py-3 text-center">
        <p className="text-zinc-400">In Progress</p>

        <span className="text-blue-400 text-lg font-semibold">
          {inProgressTodos}
        </span>
      </div>

      <div className="bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-4 py-3 text-center">
        <p className="text-zinc-400">Completed</p>

        <span className="text-emerald-400 text-lg font-semibold">
          {completedTodos}
        </span>
      </div>
    </div>
  );
};

export default TodoStats;
