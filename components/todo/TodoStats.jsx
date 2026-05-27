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

  const stats = [
    {
      title: "Total Tasks",
      value: totalTodos,
      color: "text-white",
    },
    {
      title: "Pending",
      value: pendingTodos,
      color: "text-yellow-400",
    },
    {
      title: "In Progress",
      value: inProgressTodos,
      color: "text-blue-400",
    },
    {
      title: "Completed",
      value: completedTodos,
      color: "text-emerald-400",
    },
  ];



  return (
    <div
      className="
        grid grid-cols-2
        gap-4
        md:grid-cols-4
      "
    >
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            rounded-2xl
            border border-white/10
            bg-black/20
            p-5
            transition-all duration-200
            hover:border-white/20
          "
        >
          <p className="text-sm text-slate-400">
            {stat.title}
          </p>

          <h2
            className={`
              mt-3 text-3xl font-bold
              ${stat.color}
            `}
          >
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default TodoStats;
