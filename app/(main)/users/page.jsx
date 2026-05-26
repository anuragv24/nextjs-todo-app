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
      <div>
        <h1 className="text-4xl font-bold">Users</h1>

        <p className="text-zinc-400 mt-2">Registered users of the platform</p>
      </div>

      <section className="space-y-6">
        <div
          className="
            flex items-center justify-between
          "
        >
          <h2 className="text-2xl font-semibold">All Users</h2>

          <span className="text-zinc-500 text-sm">{users.length} Users</span>
        </div>

        {users.length === 0 ? (
          <div
            className="
                bg-[#171717]
                border border-dashed border-zinc-800
                rounded-2xl
                p-12
                text-center
              "
          >
            <p className="text-zinc-500">No users found.</p>
          </div>
        ) : (
          <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-5
              "
          >
            {users.map((user) => (
              <div
                key={user._id}
                className="  bg-[#171717]   border border-zinc-800  rounded-2xl   p-6    hover:border-zinc-700   transition-all duration-200 "
              >
                <h3 className="text-xl font-semibold text-white">
                  {user.name}
                </h3>

                <p className="text-zinc-400 mt-2 break-all">{user.email}</p>

                <div className="mt-6 pt-4  border-t border-zinc-800   flex items-center justify-between">
                  <span className="text-sm text-zinc-500">Joined</span>

                  <span className="text-sm text-zinc-400">
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
