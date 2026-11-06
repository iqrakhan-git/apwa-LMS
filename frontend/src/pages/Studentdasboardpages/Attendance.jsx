import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Palmtree,
} from "lucide-react";

import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

// Available months
const months = [
  { label: "Nov 2026", year: 2026, month: 10 },
  { label: "Oct 2026", year: 2026, month: 9 },
  { label: "Sep 2026", year: 2026, month: 8 },
  { label: "Aug 2026", year: 2026, month: 7 },
];

// Monthly attendance data
const attendanceData = {
  "Nov 2026": [
    { day: 2, status: "Present" },
    { day: 4, status: "Present" },
    { day: 6, status: "Absent" },
  ],

  "Oct 2026": [
    { day: 2, status: "Present" },
    { day: 7, status: "Late" },
    { day: 12, status: "Present" },
    { day: 14, status: "Absent" },
    { day: 19, status: "Present" },
    { day: 21, status: "Leave" },
    { day: 26, status: "Present" },
  ],

  "Sep 2026": [
    { day: 1, status: "Present" },
    { day: 3, status: "Present" },
    { day: 8, status: "Absent" },
    { day: 10, status: "Present" },
    { day: 15, status: "Present" },
    { day: 17, status: "Leave" },
    { day: 22, status: "Present" },
    { day: 24, status: "Present" },
    { day: 29, status: "Present" },
  ],

  "Aug 2026": [
    { day: 3, status: "Present" },
    { day: 5, status: "Present" },
    { day: 10, status: "Absent" },
    { day: 12, status: "Present" },
    { day: 17, status: "Present" },
    { day: 19, status: "Present" },
    { day: 24, status: "Leave" },
    { day: 26, status: "Present" },
    { day: 31, status: "Present" },
  ],
};

// Reusable Stat Card
function StatCard({ title, value, icon: Icon, color, iconBg }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-bold tracking-tight text-heading">
            {value}
          </p>

          <p className="mt-2 text-sm font-medium text-muted">
            {title}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${color}`}
        >
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}

// Attendance Statistics
function AttendanceStats({ records }) {
  const total = records.length;

  const present = records.filter(
    (r) => r.status === "Present"
  ).length;

  const absent = records.filter(
    (r) => r.status === "Absent"
  ).length;

  const leave = records.filter(
    (r) => r.status === "Leave"
  ).length;

 

  const percentage = total
    ? Math.round((present / total) * 100)
    : 0;

  return (
    <>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Classes"
          value={total}
          icon={CalendarDays}
          color="text-primary"
          iconBg="bg-primary/10"
        />

        <StatCard
          title="Present"
          value={present}
          icon={CheckCircle2}
          color="text-secondary"
          iconBg="bg-secondary/10"
        />

        <StatCard
          title="Leave"
          value={leave}
          icon={Palmtree}
          color="text-accent"
          iconBg="bg-accent/20"
        />

        <StatCard
          title="Absent"
          value={absent}
          icon={XCircle}
          color="text-primary-dark"
          iconBg="bg-primary/10"
        />

      </div>

      {/* Attendance Overview */}
      <section className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-xl font-bold text-heading">
              Attendance Overview
            </h2>

            <p className="mt-2 text-sm text-muted">
              {percentage >= 75
                ? "Your attendance is good. Keep it up!"
                : "Keep working on improving your attendance."}
            </p>
          </div>

          <p className="text-3xl font-bold text-primary">
            {percentage}%
          </p>

        </div>

        <div
          className="mt-5 h-2.5 overflow-hidden rounded-full bg-primary/10"
          role="progressbar"
          aria-label="Attendance percentage"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-3 flex justify-between text-xs text-muted">
          <span>0%</span>
          <span>Attendance Target: 75%</span>
          <span>100%</span>
        </div>

      </section>
    </>
  );
}

// Attendance Table
function AttendanceTable({ records, month }) {

  const rows = useMemo(() => {

    return records
      .map((record, index) => {

        const date = new Date(
          month.year,
          month.month,
          record.day,
          12
        );

        return {
          ...record,
          id: `${month.year}-${month.month}-${record.day}-${index}`,
          date,
        };

      })
      .sort((a, b) => a.date - b.date);

  }, [records, month]);

  const badgeStyles = {
    Present: "border-success/30 bg-success/10 text-success",
    Absent: "border-danger/30 bg-danger/10 text-danger",
    Late: "border-accent/40 bg-accent/20 text-primary-dark",
    Leave: "border-yellow/40 bg-yellow/20 text-yellow",
  };

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

      {/* Table Header */}
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

        <div>
          <h2 className="text-lg font-bold text-heading">
            Attendance Records
          </h2>

          <p className="mt-1 text-sm text-muted">
            View your classes and attendance status.
          </p>
        </div>

        <div className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          {month.label}
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[500px] text-left">

          <thead className="bg-primary/5">
            <tr>

              <th className="px-5 py-4 text-xs font-semibold text-muted sm:px-6">
                Class
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-muted sm:px-6">
                Date
              </th>

              <th className="px-5 py-4 text-xs font-semibold text-muted sm:px-6">
                Status
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-border">

            {rows.map((row, index) => (

              <tr
                key={row.id}
                className="transition hover:bg-primary/5"
              >

                <td className="px-5 py-4 text-sm font-medium text-heading sm:px-6">
                  {index + 1}
                </td>

                <td className="px-5 py-4 text-sm text-muted sm:px-6">
                  {row.date.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                <td className="px-5 py-4 sm:px-6">

                  <span
                    className={`inline-flex rounded-lg border px-3 py-1 text-xs font-semibold ${
                      badgeStyles[row.status] || "border-border bg-background text-muted"
                    }`}
                  >
                    {row.status.toUpperCase()}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* Empty State */}
        {rows.length === 0 && (

          <div className="flex flex-col items-center justify-center p-10 text-center">

            <CalendarDays
              size={40}
              className="mb-3 text-muted"
            />

            <h3 className="font-semibold text-heading">
              No Attendance Records
            </h3>

            <p className="mt-1 text-sm text-muted">
              No attendance data available for {month.label}.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

// Main Attendance Page
export default function Attendance() {

  const [selectedMonth, setSelectedMonth] = useState("Oct 2026");

  const month = months.find(
    (item) => item.label === selectedMonth
  ) || months[0];

  // Get selected month's attendance
  const records = attendanceData[selectedMonth] || [];

  return (

    <div className="min-h-screen bg-background">

      <Sidebar />

      <main className="min-h-screen md:pl-64">

        <Navbar />

        <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">

          {/* Page Heading */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <CalendarDays size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                  Attendance
                </h1>

                <p className="mt-1 text-sm text-muted">
                  Track your classes and attendance performance.
                </p>
              </div>

            </div>

            {/* Month Selector */}
            <select
              value={selectedMonth}
              onChange={(event) =>
                setSelectedMonth(event.target.value)
              }
              className="w-full max-w-[200px] rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-heading shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              aria-label="Choose attendance month"
            >

              {months.map((item) => (

                <option
                  key={item.label}
                  value={item.label}
                >
                  {item.label}
                </option>

              ))}

            </select>

          </div>

          {/* Statistics */}
          <AttendanceStats records={records} />

          {/* Attendance Table */}
          <AttendanceTable
            records={records}
            month={month}
          />

        </div>

      </main>

    </div>

  );
}