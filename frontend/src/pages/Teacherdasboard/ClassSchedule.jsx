
import { useState } from "react";
import Sidebar2 from "../../components/Sidebar2";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

const initialSchedule = [
  {
    day: "Monday",
    time: "09:00 - 10:00",
    course: "Web Development",
    room: "101",
    color: "bg-emerald-500",
  },
  {
    day: "Monday",
    time: "11:00 - 12:00",
    course: "Database Systems",
    room: "102",
    color: "bg-sky-500",
  },
  {
    day: "Tuesday",
    time: "09:00 - 10:00",
    course: "UI/UX Design",
    room: "104",
    color: "bg-amber-500",
  },
  {
    day: "Tuesday",
    time: "02:00 - 03:00",
    course: "Computer Science",
    room: "101",
    color: "bg-blue-500",
  },
  {
    day: "Wednesday",
    time: "09:00 - 10:00",
    course: "English Communication",
    room: "103",
    color: "bg-pink-500",
  },
  {
    day: "Thursday",
    time: "11:00 - 12:00",
    course: "Mathematics",
    room: "105",
    color: "bg-red-500",
  },
  {
    day: "Friday",
    time: "09:00 - 10:00",
    course: "Web Development",
    room: "101",
    color: "bg-primary",
  },
];

const weekRanges = [
  "21 - 27 Apr 2025",
  "28 Apr - 04 May 2025",
  "05 - 11 May 2025",
  "12 - 18 May 2025",
];

function ClassSchedule() {
  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedClass, setSelectedClass] = useState(null);

  const currentWeek = weekRanges[weekIndex];

  const days = [
    "All",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const filteredSchedule =
    selectedDay === "All"
      ? initialSchedule
      : initialSchedule.filter((item) => item.day === selectedDay);

  const previousWeek = () => {
    setWeekIndex((prev) => Math.max(0, prev - 1));
  };

  const nextWeek = () => {
    setWeekIndex((prev) =>
      Math.min(weekRanges.length - 1, prev + 1)
    );
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 font-sans text-heading sm:px-7 lg:px-10">
      <Sidebar2/>
      <div className="mx-auto max-w-[1500px] ml-63">
        {/* Page Header */}
        <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
              Class Schedule
            </h1>

            <p className="mt-2 text-sm text-muted">
              View your weekly class timetable.
            </p>
          </div>

          {/* Week Selector */}
          <div className="flex items-center gap-2 self-start rounded-xl border border-border bg-card p-1.5 sm:self-auto">
            <div className="flex items-center gap-2 px-2">
              <CalendarDays size={17} className="text-primary" />

              <span className="whitespace-nowrap text-xs font-semibold text-heading sm:text-sm">
                {currentWeek}
              </span>
            </div>

            <button
              type="button"
              onClick={previousWeek}
              disabled={weekIndex === 0}
              aria-label="Previous week"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              onClick={nextWeek}
              disabled={weekIndex === weekRanges.length - 1}
              aria-label="Next week"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted">
              Total Classes
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-heading">
              {initialSchedule.length}
            </h3>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted">
              Teaching Days
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-heading">
              {new Set(initialSchedule.map((item) => item.day)).size}
            </h3>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted">
              Class Rooms
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-heading">
              {new Set(initialSchedule.map((item) => item.room)).size}
            </h3>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted">
              Courses
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-heading">
              {new Set(initialSchedule.map((item) => item.course)).size}
            </h3>
          </div>
        </div>

        {/* Schedule Card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

          {/* Card Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-bold text-heading">
                Weekly Timetable
              </h2>

              <p className="mt-1 text-xs text-muted">
                Your scheduled classes for the selected week.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <CalendarDays size={14} />
              {currentWeek}
            </span>
          </div>

          {/* Day Filters */}
          <div className="flex gap-2 overflow-x-auto border-b border-border px-5 py-3">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  selectedDay === day
                    ? "bg-primary text-white"
                    : "bg-background text-muted hover:text-primary"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-background/70">
                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    Day
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    Time
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    Course
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    Room
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredSchedule.map((item, index) => {
                  const previousItem = filteredSchedule[index - 1];

                  const showDay =
                    !previousItem || previousItem.day !== item.day;

                  return (
                    <tr
                      key={`${item.day}-${item.time}-${item.course}`}
                      className="transition hover:bg-primary/[0.035]"
                    >
                      {/* Day */}
                      <td className="px-5 py-4">
                        {showDay ? (
                          <span className="text-sm font-semibold text-heading">
                            {item.day}
                          </span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>

                      {/* Time */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 whitespace-nowrap text-sm text-muted">
                          <Clock3
                            size={14}
                            className="shrink-0 text-primary"
                          />

                          {item.time}
                        </div>
                      </td>

                      {/* Course */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`}
                          />

                          <span className="whitespace-nowrap text-sm font-medium text-heading">
                            {item.course}
                          </span>
                        </div>
                      </td>

                      {/* Room */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <MapPin size={14} className="text-primary" />
                          {item.room}
                        </div>
                      </td>

                      {/* Details */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedClass(item)}
                          className="rounded-lg px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredSchedule.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-sm text-muted"
                    >
                      No classes scheduled for this day.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-col gap-2 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              Showing{" "}
              <span className="font-semibold text-heading">
                {filteredSchedule.length}
              </span>{" "}
              scheduled classes
            </p>

            <p className="text-xs text-muted">
              Week:{" "}
              <span className="font-semibold text-heading">
                {currentWeek}
              </span>
            </p>
          </div>
        </div>

        {/* Course Legend */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-bold text-heading">
            Course Legend
          </h3>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              ...new Map(
                initialSchedule.map((item) => [item.course, item])
              ).values(),
            ].map((item) => (
              <div
                key={item.course}
                className="flex items-center gap-2"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                />

                <span className="text-xs text-muted">
                  {item.course}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="class-details-title"
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="class-details-title"
                  className="text-xl font-extrabold text-heading"
                >
                  Class Details
                </h2>

                <p className="mt-2 text-sm text-muted">
                  Your scheduled lesson information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClass(null)}
                aria-label="Close class details"
                className="rounded-lg px-3 py-2 text-muted hover:bg-background"
              >
                ✕
              </button>
            </div>

            <div className="mb-5 rounded-xl bg-primary/10 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${selectedClass.color}`}
                />

                <span className="text-xs font-semibold text-primary">
                  Scheduled Class
                </span>
              </div>

              <h3 className="text-lg font-bold text-heading">
                {selectedClass.course}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted">Day</span>
                <span className="text-sm font-semibold text-heading">
                  {selectedClass.day}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted">Time</span>
                <span className="text-sm font-semibold text-heading">
                  {selectedClass.time}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted">Room</span>
                <span className="text-sm font-semibold text-heading">
                  {selectedClass.room}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted">Week</span>
                <span className="text-sm font-semibold text-heading">
                  {currentWeek}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedClass(null)}
              className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassSchedule;
