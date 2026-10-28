
import {
  BookOpen,
  ClipboardList,
  CalendarCheck,
  Award,
} from "lucide-react";

const stats = [
  {
    title: "Enrolled Courses",
    value: "5",
    icon: BookOpen,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    cardBg: "bg-emerald-50/60",
    border: "border-emerald-100",
  },
  {
    title: "Pending Assignments",
    value: "3",
    icon: ClipboardList,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    cardBg: "bg-amber-50/60",
    border: "border-amber-100",
  },
  {
    title: "Attendance Rate",
    value: "92%",
    icon: CalendarCheck,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
    cardBg: "bg-sky-50/60",
    border: "border-sky-100",
  },
  {
    title: "Overall GPA",
    value: "3.8",
    icon: Award,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    cardBg: "bg-purple-50/60",
    border: "border-purple-100",
  },
];

export default function StatsCards() {
  return (
    <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`rounded-xl border ${stat.border} ${stat.cardBg} p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            {/* Icon */}
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconColor}`}
            >
              <Icon size={21} />
            </div>

            {/* Title */}
            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>

            {/* Value */}
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-[#173d33]">
              {stat.value}
            </h2>
          </div>
        );
      })}

    </div>
  );
}