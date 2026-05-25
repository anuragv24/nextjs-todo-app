const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;

  const completedTodos = todos.filter((t) => t.isCompleted).length;

  return (
    <div className="w-full flex gap-4 items-center justify-between text-xs sm:text-sm tracking-tight font-medium text-zinc-400">
      <div className="flex-1 bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-4 py-3 text-center">
        Total Tasks:{" "}
        <span className="text-zinc-100 ml-1 font-semibold">{totalTodos}</span>
      </div>
      <div className="flex-1 bg-zinc-950/50 border border-zinc-800/80 rounded-xl px-4 py-3 text-center">
        Completed:{" "}
        <span className="text-emerald-400 ml-1 font-semibold">
          {completedTodos}
        </span>
      </div>
    </div>
  );
};

export default TodoStats;
