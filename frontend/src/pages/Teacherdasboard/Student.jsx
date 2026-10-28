
import  { useState } from "react";
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
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

const initialStudents = [
  {
    id: "STU-001",
    name: "Ayesha Ali",
    class: "CS-101",
    email: "ayesha@email.com",
    status: "Active",
    avatar: 47,
  },
  {
    id: "STU-002",
    name: "Bilal Khan",
    class: "CS-101",
    email: "bilal@email.com",
    status: "Active",
    avatar: 12,
  },
  {
    id: "STU-003",
    name: "Sara Ahmed",
    class: "CS-102",
    email: "sara@email.com",
    status: "Active",
    avatar: 44,
  },
  {
    id: "STU-004",
    name: "Usman Raza",
    class: "CS-102",
    email: "usman@email.com",
    status: "Active",
    avatar: 68,
  },
  {
    id: "STU-005",
    name: "Fatima Noor",
    class: "CS-103",
    email: "fatima@email.com",
    status: "Active",
    avatar: 49,
  },
  {
    id: "STU-006",
    name: "Hamza Malik",
    class: "CS-104",
    email: "hamza@email.com",
    status: "Active",
    avatar: 13,
  },
  {
    id: "STU-007",
    name: "Mariam Shah",
    class: "CS-103",
    email: "mariam@email.com",
    status: "Active",
    avatar: 32,
  },
];

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

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => {
              if (name !== "Students") {
                alert(`${name} page selected`);
              }
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              name === "Students"
                ? "bg-emerald-700 text-white"
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
    <header className="fixed left-56 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-7">
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

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);

  const pageSize = 5;

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query);

    const matchesClass =
      selectedClass === "All Classes" ||
      student.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const visibleStudents = filteredStudents.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  function updateSearch(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function updateClass(value) {
    setSelectedClass(value);
    setCurrentPage(1);
  }

  function addStudent() {
    const name = window.prompt("Enter student name:");
    if (!name?.trim()) return;

    const id = `STU-${String(students.length + 1).padStart(3, "0")}`;

    const newStudent = {
      id,
      name: name.trim(),
      class: "CS-101",
      email: `${name.trim().toLowerCase().replace(/\s+/g, ".")}@email.com`,
      status: "Active",
      avatar: 12,
    };

    setStudents((previous) => [...previous, newStudent]);
    setSearch("");
    setSelectedClass("All Classes");
    setCurrentPage(Math.ceil((students.length + 1) / pageSize));
  }

  function deleteStudent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this student?"
    );

    if (!confirmed) return;

    setStudents((previous) =>
      previous.filter((student) => student.id !== id)
    );

    setActiveMenu(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50/60">
      <Sidebar />
      <Navbar />

      <main className="ml-56 min-h-screen px-7 pb-8 pt-24">
        {/* Page heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Students
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage your students.
            </p>
          </div>

          <button
            onClick={addStudent}
            className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            <Plus size={17} />
            Add Student
          </button>
        </div>

        {/* Search and filter */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="flex max-w-md flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
            <Search size={17} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search student by name or ID..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <select
            value={selectedClass}
            onChange={(event) => updateClass(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none sm:w-48"
          >
            <option>All Classes</option>
            <option>CS-101</option>
            <option>CS-102</option>
            <option>CS-103</option>
            <option>CS-104</option>
          </select>
        </div>

        {/* Students table */}
        <div className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  {[
                    "Image",
                    "Name",
                    "Student ID",
                    "Class",
                    "Email",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-4 text-xs font-semibold text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {visibleStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-emerald-50/40"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={`https://i.pravatar.cc/100?img=${student.avatar}`}
                        alt={student.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-800">
                      {student.name}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                      {student.id}
                    </td>

                    <td className="px-4 py-3 text-xs text-slate-600">
                      {student.class}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                      {student.email}
                    </td>

                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                        {student.status}
                      </span>
                    </td>

                    <td className="relative px-4 py-3">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === student.id
                              ? null
                              : student.id
                          )
                        }
                        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
                        aria-label={`Actions for ${student.name}`}
                      >
                        <MoreVertical size={17} />
                      </button>

                      {activeMenu === student.id && (
                        <div className="absolute right-6 top-10 z-10 w-36 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                          <button
                            onClick={() => {
                              alert(
                                `${student.name}\n${student.id}\n${student.email}\nClass: ${student.class}`
                              );
                              setActiveMenu(null);
                            }}
                            className="w-full rounded px-3 py-2 text-left text-xs hover:bg-slate-50"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() => deleteStudent(student.id)}
                            className="w-full rounded px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
                          >
                            Remove Student
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {visibleStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm text-slate-500"
                    >
                      No students found. Try another search or class.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-4">
            <p className="text-xs text-slate-500">
              Showing{" "}
              {filteredStudents.length === 0
                ? 0
                : (safePage - 1) * pageSize + 1}
              {" - "}
              {Math.min(safePage * pageSize, filteredStudents.length)}
              {" of "}
              {filteredStudents.length} students
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={safePage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 min-w-8 rounded-md px-2 text-xs font-medium ${
                      safePage === page
                        ? "bg-emerald-700 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={safePage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
