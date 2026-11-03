import {
  BookOpen,
  ClipboardList,
  CalendarCheck,
  Award,
} from "lucide-react";

const stats = [
  {
    title: "Enrolled Courses",
    value: "50%",
    icon: BookOpen,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    cardBg: "bg-primary/5",
    border: "border-primary/20",
  },
  {
    title: "Pending Assignments",
    value: "60%",
    icon: ClipboardList,
    iconColor: "text-primary-dark",
    iconBg: "bg-primary-dark/10",
    cardBg: "bg-primary-dark/5",
    border: "border-primary-dark/20",
  },
  {
    title: "Attendance Rate",
    value: "92%",
    icon: CalendarCheck,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
    cardBg: "bg-secondary/5",
    border: "border-secondary/20",
  },
  {
    title: "Overall Grades",
    value: "79%",
    icon: Award,
    iconColor: "text-primary",
    iconBg: "bg-accent/20",
    cardBg: "bg-accent/10",
    border: "border-accent/30",
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
            <p className="text-sm font-medium text-muted">
              {stat.title}
            </p>

            {/* Value */}
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-heading">
              {stat.value}
            </h2>
          </div>
        );
      })}

    </div>
  );
}