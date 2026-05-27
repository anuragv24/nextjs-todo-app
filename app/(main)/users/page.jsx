import connectDB from "@/lib/db";
import User from "@/models/User";

function transformUser(userDoc) {
  return {
    _id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
    createdAt: userDoc.createdAt.toISOString(),
  };
}

export default async function Users() {
  await connectDB();

  const rawUsers = await User.find({})
    .select("-password")
    .sort({ createdAt: -1 });

  const users = rawUsers.map(transformUser);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Users
          </h1>

          <p className="mt-2 text-slate-400">
            Registered users of the platform
          </p>
        </div>

        <div
          className="
            w-fit rounded-2xl
            border border-white/10
            bg-white/5
            px-5 py-4
            backdrop-blur-xl
          "
        >
          <p className="text-sm text-slate-400">Total Users</p>

          <h2 className="mt-1 text-3xl font-bold text-white">{users.length}</h2>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">All Users</h2>
          </div>

          <span
            className="
              rounded-full
              border border-white/10
              bg-white/5
              px-4 py-2
              text-sm text-slate-300
            "
          >
            {users.length} Users
          </span>
        </div>

        {/* Empty State */}
        {users.length === 0 ? (
          <div
            className="
              rounded-3xl
              border border-dashed border-white/10
              bg-white/5
              p-16
              text-center
              backdrop-blur-xl
            "
          >
            <div
              className="
                mx-auto mb-5
                flex h-16 w-16
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500/20
                to-cyan-500/20
                text-2xl
              "
            >
              👥
            </div>

            <h3 className="text-xl font-semibold text-white">No users found</h3>

            <p className="mt-2 text-slate-400">
              Users will appear here once they register.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {users.map((user) => (
              <div
                key={user._id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-white/5
                  p-6
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-indigo-500/30
                  hover:shadow-2xl hover:shadow-indigo-500/10
                "
              >
                {/* Glow Effect */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-br
                    from-indigo-500/0
                    to-cyan-500/0
                    opacity-0
                    transition-opacity duration-300
                    group-hover:opacity-100
                  "
                />

                {/* User Top */}
                <div className="relative z-10 flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="
                      flex h-14 w-14
                      items-center justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-indigo-500
                      to-cyan-500
                      text-lg font-bold text-white
                      shadow-lg
                    "
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  {/* User Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xl font-semibold text-white">
                      {user.name}
                    </h3>

                    <p className="mt-1 break-all text-sm text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="
                    relative z-10
                    mt-6
                    flex items-center justify-between
                    border-t border-white/10
                    pt-4
                  "
                >
                  <span className="text-sm text-slate-500">Joined</span>

                  <span className="text-sm font-medium text-slate-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
