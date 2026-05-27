"use client";

import LogoutButton from "@/components/todo/LogoutButton";


import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import {LayoutDashboard,
  CheckSquare,
  Users, Menu,
  X,
} from "lucide-react"

export default function DashboardLayout({ children }) {

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tasks",
      href: "/tasks",
       icon: CheckSquare,
    },
    {
      name: "Users",
      href: "/users",
       icon: Users,
    },
  ];

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#020617] text-white">

            <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-indigo-600/20 blur-3xl"></div>

            <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl"></div>


      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50
          h-screen
          w-72
          border-r border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
          transform
          transition-transform
          duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="mb-10 flex items-center justify-between">

          <div className="flex items-center gap-3">
            

            <div>
              <h1 className="text-lg font-semibold">Todo App</h1>

              <p className="text-sm text-slate-400">
                Manage your workflow
              </p>
            </div>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  group
                  flex items-center gap-3
                  rounded-2xl
                  px-4 py-3
                  transition-all duration-200

                  ${
                    active
                      ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-white/10 text-white shadow-lg"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`
                    transition-transform duration-200
                    group-hover:scale-110
                  `}
                />
<span className="font-medium">
                  {link.name}
                </span> 
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
            <p className="mb-3 text-sm text-slate-400">
              Logged in securely
            </p>

            <LogoutButton />
          </div>
        </div>

      </aside>


      <div className="relative flex flex-1 flex-col overflow-hidden">

        <header
          className="
            sticky top-0 z-30
            flex h-16 items-center justify-between
            border-b border-white/10
            bg-[#020617]/70
            px-6
            backdrop-blur-xl
          "
        >
          <button
            className="
              rounded-xl
              p-2
              text-slate-300
              transition
              hover:bg-white/10
              hover:text-white
              md:hidden
            "
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div>
            <h2 className="text-lg font-semibold">
              Welcome Back 👋
            </h2>

            <p className="text-sm text-slate-400">
              Stay productive today
            </p>
          </div>

         <div className="hidden md:block">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
