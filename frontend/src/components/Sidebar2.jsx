
import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  Award,
  Megaphone,
  UserRound,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Subject",
    path: "/teacher/classes",
    icon: BookOpen,
  },
  {
    name: "Assignments",
    path: "/teacher/assignments",
    icon: ClipboardList,
  },
  {
    name: "Class Schedule",
    path: "/teacher/class-schedule",
    icon: Megaphone,
  }, {
    name: "Student",
    path: "/teacher/student",
    icon: Megaphone,
  },
  {
    name: "Attendance",
    path: "/teacher/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Grades",
    path: "/teacher/grades",
    icon: Award,
  },
  {
    name: "Profile",
    path: "/teacher/profile",
    icon: UserRound,
  },
  {
    name: "Settings",
    path: "/teacher/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-sidebar px-4 text-white md:hidden">

        <div className="flex items-center gap-2">
          <GraduationCap size={27} className="text-accent" />

          <span className="text-lg font-bold">
            APWA Synapse
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 transition hover:bg-primary/20"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          border-r border-border
          bg-sidebar px-4 py-5 text-white
          transition-transform duration-300 ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
          md:w-56
          lg:w-64
        `}
      >

        {/* Logo */}
        <div className="mb-10 shrink-0">

          <div className="flex items-center gap-3 px-2">

            <GraduationCap
              size={30}
              className="shrink-0 text-accent"
            />

            <span className="text-lg font-bold">
              APWA Synapse
            </span>

          </div>

          <span className="ml-9 text-xs text-white/60">
            Intelligent Learning Portal
          </span>

        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto">

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-white/75 hover:bg-primary/15 hover:text-white"
                  }`
                }
              >

                <Icon
                  size={19}
                  className="shrink-0"
                />

                <span>
                  {item.name}
                </span>

              </NavLink>
            );
          })}

        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="mt-5 flex shrink-0 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-primary/15 hover:text-white"
        >

          <LogOut size={19} />

          <span>Logout</span>

        </button>

      </aside>
    </>
  );
}
