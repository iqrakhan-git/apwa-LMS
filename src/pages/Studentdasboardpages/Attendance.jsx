

import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Palmtree,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useMemo, useState } from "react";

const attendanceRecords = [
  { day: 5, status: "Present" },
  { day: 7, status: "Present" },
  { day: 12, status: "Present" },
  { day: 14, status: "Absent" },
  { day: 19, status: "Present" },
  { day: 21, status: "Present" },
  { day: 26, status: "Present" },
];

const months = [
  { label: "Oct 2026", year: 2026, month: 9 },
  { label: "Sep 2026", year: 2026, month: 8 },
  { label: "Aug 2026", year: 2026, month: 7 },
  { label: "Jul 2026", year: 2026, month: 6 },
];

function StatCard({ title, value, icon: Icon, color, iconBg }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-bold tracking-tight text-[#173d33]">
            {value}
          </p>
          <p className="mt-2 text-sm font-medium text-gray-500">
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Classes"
          value={total}
          icon={CalendarDays}
          color="text-emerald-700"
          iconBg="bg-emerald-50"
        />

        <StatCard
          title="Present"
          value={present}
          icon={CheckCircle2}
          color="text-emerald-600"
          iconBg="bg-emerald-50"
        />

        <StatCard
          title="Leave"
          value={leave}
          icon={Palmtree}
          color="text-amber-600"
          iconBg="bg-amber-50"
        />

        <StatCard
          title="Absent"
          value={absent}
          icon={XCircle}
          color="text-red-500"
          iconBg="bg-red-50"
        />
      </div>

      <section className="mt-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-[#173d33]">
              Attendance Overview
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {percentage >= 75
                ? "Your attendance is good. Keep it up!"
                : "Keep working on improving your attendance."}
            </p>
          </div>

          <p className="text-3xl font-bold text-emerald-700">
            {percentage}%
          </p>
        </div>

        <div
          className="mt-5 h-2.5 overflow-hidden rounded-full bg-gray-100"
          role="progressbar"
          aria-label="Attendance percentage"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </section>
    </>
  );
}

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
    Present: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Absent: "border-red-200 bg-red-50 text-red-600",
    Late: "border-amber-200 bg-amber-50 text-amber-700",
    Leave: "border-orange-200 bg-orange-50 text-orange-700",
  };

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-lg font-bold text-[#173d33]">
            Attendance Records
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View your classes and attendance status.
          </p>
        </div>

        <label className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Month</span>
          <select
            value={month.label}
            onChange={() => {
              // Parent updates the month.
            }}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#173d33] outline-none focus:border-emerald-600"
            disabled
            aria-label="Selected attendance month"
          >
            <option>{month.label}</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-left">
          <thead className="bg-emerald-50/70">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 sm:px-6">
                Class
              </th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 sm:px-6">
                Date
              </th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 sm:px-6">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className="transition hover:bg-emerald-50/30"
              >
                <td className="px-5 py-4 text-sm font-medium text-[#173d33] sm:px-6">
                  {index + 1}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600 sm:px-6">
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
                      badgeStyles[row.status]
                    }`}
                  >
                    {row.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No attendance records for this month.
          </p>
        )}
      </div>
    </section>
  );
}

export default function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState("Oct 2026");

  const month = months.find(
    (item) => item.label === selectedMonth
  ) || months[0];

  // Demo data is available for October 2026 only.
  const records = selectedMonth === "Oct 2026"
    ? attendanceRecords
    : [];

  return (
    <div className="min-h-screen bg-[#f5f8fa]">
      <Sidebar />

      <main className="min-h-screen pl-64">
        <Navbar />

        <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-800">
                <CalendarDays size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#173d33] sm:text-3xl">
                  Attendance
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Track your classes and attendance performance.
                </p>
              </div>
            </div>
          </div>

          <AttendanceStats records={records} />

          <div className="mt-6 flex justify-end">
            <select
              value={selectedMonth}
              onChange={(event) =>
                setSelectedMonth(event.target.value)
              }
              className="w-full max-w-[200px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#173d33] shadow-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
              aria-label="Choose attendance month"
            >
              {months.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <AttendanceTable
            records={records}
            month={month}
          />
        </div>
      </main>
    </div>
  );
}
