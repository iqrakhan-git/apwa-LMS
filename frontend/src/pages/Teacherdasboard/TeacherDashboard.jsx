
// import React from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Users,
  BookOpen,
  ClipboardCheck,
  CalendarDays,
  FileText,
  GraduationCap,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  CircleAlert,
  Video,
  Palette,
  Leaf,
} from "lucide-react";
import Sidebar2 from "../../components/Sidebar2";

/* =========================
   TOP NAVBAR
========================= */

function Navbar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-20 flex h-[76px] items-center justify-between border-b border-border bg-card/95 px-8 backdrop-blur-md">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />

        <input
          type="search"
          placeholder="Search anything..."
          className="w-full rounded-xl border border-transparent bg-background py-3 pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary"
        />
      </div>

      <div className="ml-6 flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted transition hover:bg-background hover:text-primary"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-secondary ring-2 ring-card" />
        </button>

        <div className="hidden h-8 w-px bg-border sm:block" />

        <button
          type="button"
          className="flex items-center gap-3 text-left"
        >
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Ms. Ayesha Khan"
            className="h-10 w-10 rounded-full border-2 border-border object-cover"
          />

          <div className="hidden sm:block">
            <p className="text-sm font-bold text-heading">
              Ms. Ayesha Khan
            </p>
            <p className="mt-0.5 text-xs text-muted">
              Teacher
            </p>
          </div>

          <ChevronDown size={16} className="text-muted" />
        </button>
      </div>
    </header>
  );
}

/* =========================
   STATISTICS CARD
========================= */

const statistics = [
  {
    title: "Total Classes",
    value: "5",
    change: "+1 this month",
    icon: BookOpen,
  },
  {
    title: "Total Students",
    value: "120",
    change: "+12 this month",
    icon: Users,
  },
  {
    title: "Pending Assignments",
    value: "8",
    change: "Needs attention",
    icon: FileText,
  },
  {
    title: "Today's Attendance",
    value: "92%",
    change: "+4% this week",
    icon: ClipboardCheck,
  },
];

function StatCard({ item, index }) {
  const Icon = item.icon;

  return (
    <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-muted">
            {item.title}
          </p>

          <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-heading">
            {item.value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            index % 2 === 0
              ? "bg-primary/10 text-primary"
              : "bg-secondary/10 text-secondary"
          }`}
        >
          <Icon size={21} strokeWidth={2} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-[11px] text-muted">
        <ArrowUpRight size={14} className="text-primary" />
        <span>{item.change}</span>
      </div>
    </div>
  );
}

/* =========================
   ATTENDANCE CHART
========================= */

function AttendanceChart() {
  const days = [
    { day: "Mon", x: 20, y: 112 },
    { day: "Tue", x: 70, y: 64 },
    { day: "Wed", x: 120, y: 92 },
    { day: "Thu", x: 170, y: 82 },
    { day: "Fri", x: 220, y: 66 },
    { day: "Sat", x: 270, y: 96 },
    { day: "Sun", x: 320, y: 64 },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-heading">
            Attendance Overview
          </h3>
          <p className="mt-1 text-xs text-muted">
            Weekly class attendance statistics
          </p>
        </div>

        <select
          defaultValue="This Week"
          aria-label="Attendance period"
          className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-heading outline-none focus:border-primary"
        >
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="mt-6 flex gap-3">
        <div className="flex h-48 flex-col justify-between pb-6 text-[10px] text-muted">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        <div className="min-w-0 flex-1">
          <svg
            viewBox="0 0 340 155"
            className="h-48 w-full overflow-visible"
            preserveAspectRatio="none"
            role="img"
            aria-label="Weekly attendance line chart"
          >
            <defs>
              <linearGradient
                id="attendanceFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity="0.25"
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity="0.01"
                />
              </linearGradient>
            </defs>

            {[15, 45, 75, 105, 135].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="340"
                y2={y}
                stroke="var(--border)"
                strokeDasharray="4 5"
                strokeWidth="1"
              />
            ))}

            <path
              d="M20 112 Q45 78 70 64 T120 92 T170 82 T220 66 T270 96 T320 64 L320 135 L20 135 Z"
              fill="url(#attendanceFill)"
            />

            <path
              d="M20 112 Q45 78 70 64 T120 92 T170 82 T220 66 T270 96 T320 64"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {days.map((point) => (
              <circle
                key={point.day}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="var(--card)"
                stroke="var(--primary)"
                strokeWidth="2.5"
              />
            ))}
          </svg>

          <div className="mt-1 flex justify-between text-[10px] font-medium text-muted">
            {days.map((point) => (
              <span key={point.day}>{point.day}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-background px-4 py-3">
        <div>
          <p className="text-xs text-muted">
            Average attendance
          </p>
          <p className="mt-1 text-lg font-bold text-heading">
            84.5%
          </p>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          This week
        </span>
      </div>
    </section>
  );
}

/* =========================
   UPCOMING CLASSES
========================= */

const upcomingClasses = [
  {
    title: "Web Development",
    time: "09:00 AM - 10:00 AM",
    room: "Room 101",
    status: "Live",
    icon: Video,
  },
  {
    title: "Database Systems",
    time: "11:00 AM - 12:00 PM",
    room: "Room 102",
    status: "Upcoming",
    icon: BookOpen,
  },
  {
    title: "UI/UX Design",
    time: "02:00 PM - 03:00 PM",
    room: "Room 104",
    status: "Upcoming",
    icon: Palette,
  },
];

function UpcomingClasses() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-heading">
            Upcoming Classes
          </h3>
          <p className="mt-1 text-xs text-muted">
            Your teaching schedule
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-primary transition hover:text-primary-dark"
        >
          View All
        </button>
      </div>

      <div className="mt-5 space-y-1">
        {upcomingClasses.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-background"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="truncate text-xs font-bold text-heading">
                  {item.title}
                </h4>

                <p className="mt-1 text-[10px] text-muted">
                  {item.time}
                </p>

                <p className="mt-0.5 text-[10px] text-muted">
                  {item.room}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  index === 0
                    ? "bg-primary/10 text-primary"
                    : "bg-background text-muted"
                }`}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-xs font-semibold text-heading transition hover:border-primary hover:text-primary"
      >
        <CalendarDays size={15} />
        View Full Schedule
      </button>
    </section>
  );
}

/* =========================
   RECENT ACTIVITY
========================= */

const activities = [
  {
    text: "Ayesha Ali submitted assignment 'Project 2'",
    time: "2 hours ago",
    icon: FileText,
  },
  {
    text: "Bilal Khan marked present in Web Development",
    time: "3 hours ago",
    icon: CheckCircle2,
  },
  {
    text: "Sara Ahmed scored 85% in Quiz 1",
    time: "4 hours ago",
    icon: GraduationCap,
  },
];

function RecentActivity() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-heading">
            Recent Activity
          </h3>
          <p className="mt-1 text-xs text-muted">
            Latest classroom updates
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-primary transition hover:text-primary-dark"
        >
          View All
        </button>
      </div>

      <div className="mt-5 divide-y divide-border">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.text}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={17} />
              </div>

              <p className="min-w-0 flex-1 text-xs leading-5 text-heading">
                {activity.text}
              </p>

              <span className="shrink-0 text-[10px] text-muted">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================
   MOTIVATIONAL CARD
========================= */

function MotivationCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-primary/5 p-5">
      <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Leaf size={38} strokeWidth={1.5} />
        </div>

        <div>
          <p className="text-base font-extrabold leading-6 text-heading">
            Great teachers
            <br />
            change the world!
          </p>

          <p className="mt-2 text-xs text-muted">
            Keep inspiring!
            <span className="ml-1 text-primary">♥</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================
   WELCOME HEADER
========================= */

function WelcomeHeader() {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Teacher Workspace
        </p>

        <h2 className="text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
          Good Morning, Ms. Ayesha! 👋
        </h2>

        <p className="mt-2 text-sm text-muted">
          Here's what's happening in your classes today.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-medium text-muted shadow-sm">
        <Clock size={15} className="text-primary" />
        Saturday, October 31
      </div>
    </div>
  );
}

/* =========================
   MAIN DASHBOARD
========================= */

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-background font-sans text-heading">
      <Sidebar2 />

      <Navbar />

      <main className="ml-64 min-h-screen px-5 pb-10 pt-[108px] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <WelcomeHeader />

          {/* Statistics */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((item, index) => (
              <StatCard
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-5">
            <div className="space-y-6 xl:col-span-3">
              <AttendanceChart />
              <RecentActivity />
            </div>

            <div className="space-y-6 xl:col-span-2">
              <UpcomingClasses />
              <MotivationCard />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-xs text-muted">
            <p>
              © 2026 TeachHub. All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              <CircleAlert size={14} />
              <span>Teacher Dashboard</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
