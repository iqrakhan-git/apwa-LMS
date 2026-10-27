
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
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", path: "/courses", icon: BookOpen },
  { name: "Assignments", path: "/assignments", icon: ClipboardList },
  { name: "Attendance", path: "/attendance", icon: CalendarCheck },
  { name: "Grades", path: "/grades", icon: Award },
  { name: "Announcements", path: "/announcements", icon: Megaphone },
  { name: "Profile", path: "/profile", icon: UserRound },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#064e3b] px-4 py-5 text-white">

      {/* Logo */}
      <div className="mb-9 flex items-center gap-3 px-2">
        <GraduationCap size={30} />

        <span className="text-lg font-bold tracking-tight">
          Student Portal
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
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-emerald-100 hover:bg-white/10 hover:text-white"
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
        className="mt-5 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-400 transition hover:bg-white/10  hover:text-red-500"
      > 
        <LogOut size={19} />
        Logout
        
      </button>

    </aside>
  );
}