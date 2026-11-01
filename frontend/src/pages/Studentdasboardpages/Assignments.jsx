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
  High: "bg-primary/10 text-primary-dark",
  Medium: "bg-secondary/10 text-secondary",
  Low: "bg-accent/20 text-primary-dark",
};

const iconStyles = [
  "bg-primary/10 text-primary",
  "bg-secondary/10 text-secondary",
  "bg-accent/20 text-primary-dark",
  "bg-primary/10 text-primary-dark",
  "bg-secondary/10 text-secondary",
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
    <tr className="group border-b border-border last:border-b-0 transition hover:bg-primary/5">
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <AssignmentIcon index={index} />

          <div>
            <p className="text-sm font-semibold text-heading">
              {assignment.title}
            </p>

            <p className="mt-1 text-xs text-muted sm:hidden">
              {assignment.course}
            </p>
          </div>
        </div>
      </td>

      <td className="hidden px-4 py-4 text-sm text-muted sm:table-cell">
        {assignment.course}
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted">
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
          className="rounded-lg p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-heading/30 p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="assignment-title"
        className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Assignment Details
            </p>

            <h2
              id="assignment-title"
              className="mt-2 text-xl font-bold text-heading"
            >
              {assignment.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-muted hover:bg-primary/10"
            aria-label="Close details"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted">Course</span>
            <span className="font-semibold text-heading">
              {assignment.course}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted">Due date</span>
            <span className="font-semibold text-heading">
              {formatDate(assignment.dueDate)}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted">Priority</span>
            <span className="font-semibold text-heading">
              {assignment.priority}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted">Status</span>
            <span className="font-semibold text-primary">
              {assignment.status}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleComplete(assignment.id)}
          className="mt-7 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
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
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="min-h-screen pl-64">
        <Navbar />

        <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
          {/* Heading */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                My Assignments
              </h1>

              <p className="mt-2 text-sm text-muted">
                View and manage your assignments.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search assignments..."
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-heading outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
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
                      ? "bg-primary text-white shadow-sm"
                      : "border border-border bg-card text-muted hover:border-primary/40 hover:text-primary"
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
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="px-4 py-4 text-xs font-semibold text-muted sm:px-6">
                      Title
                    </th>

                    <th className="hidden px-4 py-4 text-xs font-semibold text-muted sm:table-cell">
                      Course
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold text-muted">
                      Due Date
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold text-muted">
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
                  className="mx-auto text-muted"
                />

                <p className="mt-3 font-semibold text-heading">
                  No assignments found
                </p>

                <p className="mt-1 text-sm text-muted">
                  Try another filter or search term.
                </p>
              </div>
            )}
          </section>

          <p className="mt-4 text-xs text-muted">
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