
// import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  Megaphone,
  MessageSquare,
  CalendarDays,
  UserRound,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
  Eye,
  MoreVertical,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "My Courses", icon: BookOpen },
  { name: "Students", icon: Users },
  { name: "Attendance", icon: CalendarCheck },
  { name: "Assignments", icon: ClipboardList },
  { name: "Grades", icon: GraduationCap },
  { name: "Announcements", icon: Megaphone },
  { name: "Messages", icon: MessageSquare },
  { name: "Schedule", icon: CalendarDays },
  { name: "Profile", icon: UserRound },
  { name: "Settings", icon: Settings },
];

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
  Pending: "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col bg-gradient-to-b from-emerald-900 to-teal-950 text-white">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
        <GraduationCap size={28} />
        <div>
          <h1 className="text-base font-bold">TeachHub</h1>
          <p className="text-[10px] text-emerald-200">
            Teacher Portal
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menuItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => {
              if (name !== "Assignments") {
                alert(`${name} page selected`);
              }
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
              name === "Assignments"
                ? "bg-emerald-700 text-white shadow"
                : "text-emerald-50/80 hover:bg-white/10"
            }`}
          >
            <Icon size={17} />
            {name}
          </button>
        ))}
      </nav>

      <button className="flex items-center gap-3 border-t border-white/10 px-6 py-4 text-sm hover:bg-white/10">
        <LogOut size={17} />
        Logout
      </button>
    </aside>
  );
}

function Navbar() {
  return (
    <header className="fixed left-56 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-7 backdrop-blur">
      <div className="flex w-72 items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
        <Search size={16} className="text-slate-400" />
        <input
          placeholder="Search anything..."
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-slate-500">
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Teacher"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-800">
              Ms. Ayesha Khan
            </p>
            <p className="text-[10px] text-slate-500">Teacher</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AssignmentMark() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [activeFilter, setActiveFilter] = useState("All Assignments");
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
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

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesFilter =
      activeFilter === "All Assignments" ||
      assignment.status === activeFilter;

    const matchesSearch =
      assignment.title.toLowerCase().includes(search.toLowerCase()) ||
      assignment.course.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  function createAssignment(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.dueDate) return;

    const newAssignment = {
      id: Date.now(),
      title: form.title.trim(),
      course: form.course,
      dueDate: new Date(`${form.dueDate}T12:00:00`).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
      status: "Pending",
    };

    setAssignments((previous) => [...previous, newAssignment]);
    setForm({
      title: "",
      course: "Web Development",
      dueDate: "",
    });
    setShowCreateModal(false);
    setActiveFilter("All Assignments");
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

    setMenuId(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50/60">
      <Sidebar />
      <Navbar />

      <main className="ml-56 min-h-screen px-7 pb-10 pt-24">
        {/* Heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Assignments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create, manage and grade assignments.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            <Plus size={17} />
            Create Assignment
          </button>
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                  activeFilter === filter
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {filter}
                {filter === "All Assignments" &&
                  ` (${assignments.length})`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <Search size={15} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search assignments..."
              className="w-40 bg-transparent text-xs outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  {[
                    "Title",
                    "Course",
                    "Due Date",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-xs font-semibold text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredAssignments.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="transition hover:bg-emerald-50/40"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-800">
                      {assignment.title}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">
                      {assignment.course}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">
                      {assignment.dueDate}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={assignment.status} />
                    </td>

                    <td className="relative px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          title="View assignment"
                          onClick={() =>
                            setSelectedAssignment(assignment)
                          }
                          className="rounded-md p-1.5 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="More actions"
                          onClick={() =>
                            setMenuId(
                              menuId === assignment.id
                                ? null
                                : assignment.id
                            )
                          }
                          className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100"
                        >
                          <MoreVertical size={17} />
                        </button>
                      </div>

                      {menuId === assignment.id && (
                        <div className="absolute right-6 top-12 z-10 w-44 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                          <button
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setMenuId(null);
                            }}
                            className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() => toggleStatus(assignment.id)}
                            className="w-full rounded-md px-3 py-2 text-left text-xs text-emerald-700 hover:bg-emerald-50"
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
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No assignments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
            Showing {filteredAssignments.length} of{" "}
            {assignments.length} assignments
          </div>
        </div>
      </main>

      {/* Create assignment modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Create Assignment
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Add a new assignment to your courses.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={createAssignment} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Assignment Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  placeholder="e.g. React Project"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Course
                </label>
                <select
                  value={form.course}
                  onChange={(event) =>
                    setForm({ ...form, course: event.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
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
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Due Date
                </label>
                <input
                  required
                  type="date"
                  value={form.dueDate}
                  onChange={(event) =>
                    setForm({ ...form, dueDate: event.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignment details modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-emerald-700">
                  Assignment Details
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedAssignment.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedAssignment(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Course</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedAssignment.course}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Due Date</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedAssignment.dueDate}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Status</span>
                <StatusBadge status={selectedAssignment.status} />
              </div>
            </div>

            <button
              onClick={() => setSelectedAssignment(null)}
              className="mt-6 w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
