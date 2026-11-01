
import { useState } from "react";
import {
  Search,
  Bell,
  Plus,
  Eye,
  MoreVertical,
  X,
} from "lucide-react";
import Sidebar2 from "../../components/Sidebar2";

const initialAssignments = [
  {
    id: 1,
    title: "Web Project 2",
    course: "Web Development",
    dueDate: "29 Apr 2025",
    status: "Pending",
  },
  {
    id: 2,
    title: "Database Quiz",
    course: "Database Systems",
    dueDate: "25 Apr 2025",
    status: "Completed",
  },
  {
    id: 3,
    title: "UI Design Task",
    course: "UI/UX Design",
    dueDate: "30 Apr 2025",
    status: "Pending",
  },
  {
    id: 4,
    title: "Final Project",
    course: "Computer Science",
    dueDate: "05 May 2025",
    status: "Pending",
  },
  {
    id: 5,
    title: "English Essay",
    course: "English Communication",
    dueDate: "08 May 2025",
    status: "Completed",
  },
];

const statusStyles = {
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
};

function Navbar() {
  return (
    <header className="fixed left-56 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card/95 px-7 backdrop-blur">
      <div className="flex w-72 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <Search size={16} className="text-muted" />

        <input
          placeholder="Search anything..."
          className="w-full bg-transparent text-sm text-heading outline-none placeholder:text-muted"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative text-muted transition hover:text-primary"
        >
          <Bell size={18} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Teacher"
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-heading">
              Ms. Ayesha Khan
            </p>

            <p className="text-[10px] text-muted">Teacher</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[status] || "bg-background text-muted"
      }`}
    >
      {status}
    </span>
  );
}

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-heading outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function AssignmentMark() {
  const [assignments, setAssignments] = useState(initialAssignments);

  const [activeFilter, setActiveFilter] =
    useState("All Assignments");

  const [search, setSearch] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [selectedAssignment, setSelectedAssignment] =
    useState(null);

  const [menuId, setMenuId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    course: "Web Development",
    dueDate: "",
  });

  const filters = [
    "All Assignments",
    "Pending",
    "Completed",
  ];

  const pendingCount = assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  const completedCount = assignments.filter(
    (assignment) => assignment.status === "Completed"
  ).length;

  const filteredAssignments = assignments.filter(
    (assignment) => {
      const matchesFilter =
        activeFilter === "All Assignments" ||
        assignment.status === activeFilter;

      const matchesSearch =
        assignment.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        assignment.course
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    }
  );

  function createAssignment(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.dueDate) {
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title: form.title.trim(),
      course: form.course,
      dueDate: new Date(
        `${form.dueDate}T12:00:00`
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };

    setAssignments((previous) => [
      ...previous,
      newAssignment,
    ]);

    setForm({
      title: "",
      course: "Web Development",
      dueDate: "",
    });

    setShowCreateModal(false);
    setActiveFilter("All Assignments");
    setSearch("");
  }

  function toggleStatus(id) {
    setAssignments((previous) =>
      previous.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              status:
                assignment.status === "Pending"
                  ? "Completed"
                  : "Pending",
            }
          : assignment
      )
    );

    setSelectedAssignment((previous) =>
      previous?.id === id
        ? {
            ...previous,
            status:
              previous.status === "Pending"
                ? "Completed"
                : "Pending",
          }
        : previous
    );

    setMenuId(null);
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Sidebar2 />
      <Navbar />

      <main className="ml-65 min-h-screen px-7 pb-10 pt-24">
        {/* Page Heading */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-heading">
              Assignments
            </h2>

            <p className="mt-1 text-sm text-muted">
              Create, manage and grade assignments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <Plus size={17} />
            Create Assignment
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted">
              Total Assignments
            </p>

            <h3 className="mt-2 text-2xl font-bold text-heading">
              {assignments.length}
            </h3>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background">
              <div className="h-full w-full rounded-full bg-primary" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted">
              Pending Assignments
            </p>

            <h3 className="mt-2 text-2xl font-bold text-heading">
              {pendingCount}
            </h3>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{
                  width: `${
                    assignments.length
                      ? (pendingCount / assignments.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted">
              Completed Assignments
            </p>

            <h3 className="mt-2 text-2xl font-bold text-heading">
              {completedCount}
            </h3>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${
                    assignments.length
                      ? (completedCount / assignments.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-sm"
                    : "border border-border bg-card text-muted hover:border-primary/40 hover:text-primary"
                }`}
              >
                {filter}

                {filter === "All Assignments" &&
                  ` (${assignments.length})`}

                {filter === "Pending" &&
                  ` (${pendingCount})`}

                {filter === "Completed" &&
                  ` (${completedCount})`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Search size={15} className="text-muted" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search assignments..."
              className="w-40 bg-transparent text-xs text-heading outline-none placeholder:text-muted"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-muted hover:text-primary"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Assignments Table */}
        <div className="overflow-visible rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-background">
                <tr className="border-b border-border">
                  {[
                    "Title",
                    "Course",
                    "Due Date",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-xs font-semibold text-muted"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredAssignments.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="transition hover:bg-primary/5"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-heading">
                      {assignment.title}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-xs text-muted">
                      {assignment.course}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-xs text-muted">
                      {assignment.dueDate}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={assignment.status} />
                    </td>

                    <td className="relative px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          title="View assignment"
                          onClick={() =>
                            setSelectedAssignment(assignment)
                          }
                          className="rounded-md p-1.5 text-muted transition hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          title="More actions"
                          aria-label="More actions"
                          onClick={() =>
                            setMenuId(
                              menuId === assignment.id
                                ? null
                                : assignment.id
                            )
                          }
                          className="rounded-md p-1.5 text-muted transition hover:bg-background hover:text-primary"
                        >
                          <MoreVertical size={17} />
                        </button>
                      </div>

                      {menuId === assignment.id && (
                        <div className="absolute right-6 top-12 z-10 w-44 rounded-lg border border-border bg-card p-1 shadow-xl">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setMenuId(null);
                            }}
                            className="w-full rounded-md px-3 py-2 text-left text-xs text-heading hover:bg-primary/10 hover:text-primary"
                          >
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              toggleStatus(assignment.id)
                            }
                            className="w-full rounded-md px-3 py-2 text-left text-xs text-primary hover:bg-primary/10"
                          >
                            Mark as{" "}
                            {assignment.status === "Pending"
                              ? "Completed"
                              : "Pending"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredAssignments.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-sm text-muted"
                    >
                      No assignments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border px-5 py-3 text-xs text-muted">
            Showing {filteredAssignments.length} of{" "}
            {assignments.length} assignments
          </div>
        </div>
      </main>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <Modal
          onClose={() => setShowCreateModal(false)}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-heading">
                Create Assignment
              </h3>

              <p className="mt-1 text-xs text-muted">
                Add a new assignment to your courses.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              aria-label="Close modal"
              className="rounded-lg p-2 text-muted hover:bg-background hover:text-primary"
            >
              <X size={18} />
            </button>
          </div>

          <form
            onSubmit={createAssignment}
            className="space-y-4"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Assignment Title
              </label>

              <input
                required
                value={form.title}
                onChange={(event) =>
                  setForm({
                    ...form,
                    title: event.target.value,
                  })
                }
                placeholder="e.g. React Project"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Course
              </label>

              <select
                value={form.course}
                onChange={(event) =>
                  setForm({
                    ...form,
                    course: event.target.value,
                  })
                }
                className={inputClass}
              >
                <option>Web Development</option>
                <option>Database Systems</option>
                <option>UI/UX Design</option>
                <option>Computer Science</option>
                <option>English Communication</option>
                <option>Mathematics</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-heading">
                Due Date
              </label>

              <input
                required
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={form.dueDate}
                onChange={(event) =>
                  setForm({
                    ...form,
                    dueDate: event.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-background"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Create Assignment
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Assignment Details Modal */}
      {selectedAssignment && (
        <Modal
          onClose={() => setSelectedAssignment(null)}
        >
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-primary">
                Assignment Details
              </p>

              <h3 className="mt-1 text-xl font-bold text-heading">
                {selectedAssignment.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setSelectedAssignment(null)}
              aria-label="Close details"
              className="rounded-lg p-2 text-muted hover:bg-background hover:text-primary"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-background p-3">
              <p className="text-xs text-muted">Course</p>

              <p className="mt-1 text-sm font-semibold text-heading">
                {selectedAssignment.course}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-3">
              <p className="text-xs text-muted">Due Date</p>

              <p className="mt-1 text-sm font-semibold text-heading">
                {selectedAssignment.dueDate}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">
                Status
              </span>

              <StatusBadge
                status={selectedAssignment.status}
              />
            </div>

            <button
              type="button"
              onClick={() =>
                toggleStatus(selectedAssignment.id)
              }
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Mark as{" "}
              {selectedAssignment.status === "Pending"
                ? "Completed"
                : "Pending"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSelectedAssignment(null)}
            className="mt-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}