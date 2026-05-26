"use client";

import LogoutButton from "@/components/todo/LogoutButton";


import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Tasks",
      href: "/tasks",
    },
    {
      name: "Users",
      href: "/users",
    },
  ];

  return (
    <div className="min-h-screen h-screen bg-black text-white flex overflow-hidden">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-40 h-screen w-64 bg-zinc-950 border-r border-zinc-800 p-5 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold mb-8 ">Todo App</h1>

          <button
            className="md:hidden text-xl"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                    px-4 py-3 rounded-xl transition-all

                    ${
                      active
                        ? "bg-white text-black font-medium"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }
                  `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header
          className="
            h-16
            border-b border-zinc-800
            bg-[#0f0f0f]/80
            backdrop-blur-md
            flex items-center justify-between
            px-6
            sticky top-0 z-30
          "
        >
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
          <div>
            <h2 className="font-semibold text-lg"></h2>
          </div>
          {/* <button
            className="
              bg-zinc-900
              border border-zinc-800
              px-4 py-2
              rounded-lg
              hover:bg-zinc-800
              transition
            "
          >
            Logout
          </button> */}
          <div className="flex items-center justify-end text-sm border-b border-zinc-800/60 pb-4">
                    <LogoutButton />
                  </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
