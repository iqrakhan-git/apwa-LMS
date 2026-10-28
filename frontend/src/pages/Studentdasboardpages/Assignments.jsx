
import { ChevronRight, ClipboardList, Search } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useMemo, useState } from "react";

const initialAssignments = [
  {
    id: 1,
    title: "Web Development Assignment",
    course: "CS-101",
    dueDate: "2025-04-25",
    priority: "High",
    status: "Pending",
    icon: "code",
  },
  {
    id: 2,
    title: "Database Project",
    course: "CS-102",
    dueDate: "2025-04-26",
    priority: "Medium",
    status: "Pending",
    icon: "database",
  },
  {
    id: 3,
    title: "UI/UX Design Task",
    course: "CS-103",
    dueDate: "2025-04-30",
    priority: "Low",
    status: "Pending",
    icon: "design",
  },
  {
    id: 4,
    title: "Computer Science Quiz",
    course: "CS-104",
    dueDate: "2025-05-05",
    priority: "Medium",
    status: "Completed",
    icon: "computer",
  },
  {
    id: 5,
    title: "English Essay",
    course: "ENG-101",
    dueDate: "2025-05-08",
    priority: "Low",
    status: "Pending",
    icon: "essay",
  },
];

const priorityStyles = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700",
};

const iconStyles = [
  "bg-purple-50 text-purple-700",
  "bg-sky-50 text-sky-700",
  "bg-emerald-50 text-emerald-700",
  "bg-cyan-50 text-cyan-700",
  "bg-amber-50 text-amber-700",
];

const tabs = ["All", "Pending", "Completed"];

function formatDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function AssignmentIcon({ index }) {
  const symbols = ["WD", "DB", "UI", "CS", "EN"];

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
        iconStyles[index % iconStyles.length]
      }`}
    >
      {symbols[index % symbols.length]}
    </div>
  );
}

function AssignmentRow({ assignment, index, onOpen }) {
  return (
    <tr className="group border-b border-gray-100 last:border-b-0 transition hover:bg-emerald-50/40">
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <AssignmentIcon index={index} />

          <div>
            <p className="text-sm font-semibold text-[#173d33]">
              {assignment.title}
            </p>

            <p className="mt-1 text-xs text-gray-400 sm:hidden">
              {assignment.course}
            </p>
          </div>
        </div>
      </td>

      <td className="hidden px-4 py-4 text-sm text-gray-500 sm:table-cell">
        {assignment.course}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
        {formatDate(assignment.dueDate)}
      </td>

      <td className="px-4 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            priorityStyles[assignment.priority]
          }`}
        >
          {assignment.priority}
        </span>
      </td>

      <td className="px-3 py-4 text-right">
        <button
          type="button"
          onClick={() => onOpen(assignment)}
          aria-label={`View ${assignment.title}`}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-emerald-100 hover:text-emerald-800"
        >
          <ChevronRight
            size={19}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </td>
    </tr>
  );
}

function AssignmentDetails({ assignment, onClose, onToggleComplete }) {
  if (!assignment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="assignment-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Assignment Details
            </p>

            <h2
              id="assignment-title"
              className="mt-2 text-xl font-bold text-[#173d33]"
            >
              {assignment.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close details"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Course</span>
            <span className="font-semibold text-gray-800">
              {assignment.course}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Due date</span>
            <span className="font-semibold text-gray-800">
              {formatDate(assignment.dueDate)}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Priority</span>
            <span className="font-semibold text-gray-800">
              {assignment.priority}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Status</span>
            <span className="font-semibold text-emerald-700">
              {assignment.status}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleComplete(assignment.id)}
          className="mt-7 w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          {assignment.status === "Completed"
            ? "Mark as Pending"
            : "Mark as Completed"}
        </button>
      </section>
    </div>
  );
}

export default function Assignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const pendingCount = assignments.filter(
    (item) => item.status === "Pending"
  ).length;

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesTab =
        activeTab === "All" || item.status === activeTab;

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.course.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [assignments, activeTab, search]);

  const toggleComplete = (id) => {
    setAssignments((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Completed" ? "Pending" : "Completed",
            }
          : item
      )
    );

    setSelectedAssignment((current) =>
      current?.id === id
        ? {
            ...current,
            status:
              current.status === "Completed" ? "Pending" : "Completed",
          }
        : current
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa]">
      <Sidebar />

      <main className="min-h-screen pl-64">
        <Navbar />

        <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
          {/* Heading */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#173d33] sm:text-3xl">
                My Assignments
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                View and manage your assignments.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search assignments..."
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const count =
                tab === "Pending"
                  ? pendingCount
                  : tab === "Completed"
                    ? assignments.filter(
                        (item) => item.status === "Completed"
                      ).length
                    : assignments.length;

              return (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:text-emerald-800"
                  }`}
                >
                  {tab}
                  {tab !== "All" && (
                    <span className="ml-1.5 opacity-75">
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Assignments Table */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-emerald-50/70">
                  <tr>
                    <th className="px-4 py-4 text-xs font-semibold text-gray-500 sm:px-6">
                      Title
                    </th>

                    <th className="hidden px-4 py-4 text-xs font-semibold text-gray-500 sm:table-cell">
                      Course
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold text-gray-500">
                      Due Date
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold text-gray-500">
                      Priority
                    </th>

                    <th className="px-3 py-4" aria-label="Actions" />
                  </tr>
                </thead>

                <tbody>
                  {filteredAssignments.map((assignment) => (
                    <AssignmentRow
                      key={assignment.id}
                      assignment={assignment}
                      index={assignments.findIndex(
                        (item) => item.id === assignment.id
                      )}
                      onOpen={setSelectedAssignment}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAssignments.length === 0 && (
              <div className="px-5 py-12 text-center">
                <ClipboardList
                  size={32}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 font-semibold text-gray-700">
                  No assignments found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Try another filter or search term.
                </p>
              </div>
            )}
          </section>

          <p className="mt-4 text-xs text-gray-400">
            Showing {filteredAssignments.length} of {assignments.length} assignments
          </p>
        </div>
      </main>

      <AssignmentDetails
        assignment={selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}
