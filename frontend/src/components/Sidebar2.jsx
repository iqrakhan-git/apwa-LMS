
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
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
  { name: "Subject", path: "/teacher/classes", icon: BookOpen },
  { name: "Assignments", path: "/teacher/assignments", icon: ClipboardList },
  { name: "ClassSchedule", path: "/teacher/class-schedule", icon: Megaphone },
  { name: "Attendance", path: "/teacher/attendance", icon: CalendarCheck },
  { name: "Grades", path: "/teacher/grades", icon: Award },
  { name: "Profile", path: "/teacher/profile", icon: UserRound },
  { name: "Settings", path: "/teacher/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar px-4 py-5 text-white">

      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-3 px-2">
          <GraduationCap size={30} className="shrink-0 text-accent" />

          <span className="text-lg font-bold">
            APWA Synapse
          </span>
        </div>

        <span className="ml-9 text-sm text-white/60">
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
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-white/75 hover:bg-primary/15 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        className="mt-5 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-primary/15 hover:text-white"
      >
        <LogOut size={19} />
        <span>Logout</span>
      </button>

    </aside>
  );
}
