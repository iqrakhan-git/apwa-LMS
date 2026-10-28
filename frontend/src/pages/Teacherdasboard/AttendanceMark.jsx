
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
  CheckCircle2,
  Clock3,
  XCircle,
  Calendar,
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
    id: 1,
    name: "Ayesha Ali",
    class: "CS-101",
    status: "Present",
    remarks: "",
  },
  {
    id: 2,
    name: "Bilal Khan",
    class: "CS-101",
    status: "Present",
    remarks: "",
  },
  {
    id: 3,
    name: "Sara Ahmed",
    class: "CS-102",
    status: "Absent",
    remarks: "Sick",
  },
  {
    id: 4,
    name: "Usman Raza",
    class: "CS-101",
    status: "Late",
    remarks: "Traffic",
  },
  {
    id: 5,
    name: "Fatima Noor",
    class: "CS-103",
    status: "Present",
    remarks: "",
  },
  {
    id: 6,
    name: "Zainab Iqbal",
    class: "CS-102",
    status: "Leave",
    remarks: "Medical",
  },
];

const statusStyles = {
  Present: "bg-emerald-100 text-emerald-700",
  Absent: "bg-rose-100 text-rose-700",
  Late: "bg-amber-100 text-amber-700",
  Leave: "bg-blue-100 text-blue-700",
};

const statusIcons = {
  Present: CheckCircle2,
  Absent: XCircle,
  Late: Clock3,
  Leave: Calendar,
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
              if (name !== "Attendance") {
                alert(`${name} page selected`);
              }
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
              name === "Attendance"
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
  const Icon = statusIcons[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function AttendanceSummary({ students }) {
  const counts = useMemo(
    () =>
      students.reduce(
        (result, student) => {
          result[student.status] += 1;
          return result;
        },
        { Present: 0, Absent: 0, Late: 0, Leave: 0 }
      ),
    [students]
  );

  const total = students.length;

  const attendanceRate = total
    ? Math.round(((counts.Present + counts.Late) / total) * 100)
    : 0;

  const segments = [
    { name: "Present", color: "#059669" },
    { name: "Absent", color: "#f87171" },
    { name: "Late", color: "#fbbf24" },
    { name: "Leave", color: "#3b82f6" },
  ];

  let cumulative = 0;

  const gradient = segments
    .map((segment) => {
      const start = cumulative;
      cumulative += total ? (counts[segment.name] / total) * 100 : 0;

      return `${segment.color} ${start}% ${cumulative}%`;
    })
    .join(", ");

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800">
        Attendance Summary
      </h3>

      <div className="my-6 flex justify-center">
        <div
          className="relative flex h-32 w-32 items-center justify-center rounded-full"
          style={{
            background: total
              ? `conic-gradient(${gradient})`
              : "#e2e8f0",
          }}
        >
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-2xl font-bold text-slate-800">
              {attendanceRate}%
            </span>
            <span className="text-[10px] text-slate-500">
              Attendance
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {segments.map((segment) => (
          <div
            key={segment.name}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <div className="flex items-center gap-2 text-slate-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              {segment.name}
            </div>
            <span className="font-semibold text-slate-700">
              {counts[segment.name]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
        <span className="text-slate-500">Total Students</span>
        <span className="font-bold text-slate-800">{total}</span>
      </div>
    </section>
  );
}

export default function Attendance() {
  const [students, setStudents] = useState(initialStudents);
  const [date, setDate] = useState("2025-04-25");
  const [selectedClass, setSelectedClass] = useState("CS-101");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  const filteredStudents = students.filter((student) => {
    const matchesClass =
      selectedClass === "All Classes" ||
      student.class === selectedClass;

    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesClass && matchesSearch;
  });

  function updateStudent(id, field, value) {
    setStudents((previous) =>
      previous.map((student) =>
        student.id === id
          ? { ...student, [field]: value }
          : student
      )
    );

    setSaved(false);
  }

  function markAllPresent() {
    setStudents((previous) =>
      previous.map((student) =>
        selectedClass === "All Classes" ||
        student.class === selectedClass
          ? { ...student, status: "Present" }
          : student
      )
    );

    setSaved(false);
  }

  function saveAttendance() {
    setSaved(true);
    alert(`Attendance updated for ${date}.`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50/60">
      <Sidebar />
      <Navbar />

      <main className="ml-56 min-h-screen px-7 pb-10 pt-24">
        {/* Heading and controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Attendance
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Mark and manage student attendance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
              <Calendar size={15} className="text-slate-500" />
              <input
                type="date"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  setSaved(false);
                }}
                className="w-32 bg-transparent text-xs text-slate-700 outline-none"
              />
            </label>

            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none"
            >
              <option>All Classes</option>
              <option>CS-101</option>
              <option>CS-102</option>
              <option>CS-103</option>
            </select>

            <button
              onClick={saveAttendance}
              className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              <CheckCircle2 size={15} />
              Save Attendance
            </button>
          </div>
        </div>

        {saved && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Attendance updated for {date}.
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_260px]">
          {/* Attendance table */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Student Attendance
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Update each student's status and remarks.
                </p>
              </div>

              <button
                onClick={markAllPresent}
                className="rounded-lg border border-emerald-200 px-3 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50"
              >
                Mark All Present
              </button>
            </div>

            <div className="border-b border-slate-100 p-3">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                <Search size={15} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search student name..."
                  className="w-full text-xs outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "#",
                      "Student Name",
                      "Status",
                      "Remarks",
                      "Class",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-xs font-semibold text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className="transition hover:bg-emerald-50/40"
                    >
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {index + 1}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={`https://i.pravatar.cc/100?img=${[
                              47, 12, 44, 68, 49, 32,
                            ][(student.id - 1) % 6]}`}
                            alt={student.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span className="text-xs font-semibold text-slate-700">
                            {student.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <select
                          value={student.status}
                          onChange={(event) =>
                            updateStudent(
                              student.id,
                              "status",
                              event.target.value
                            )
                          }
                          className={`cursor-pointer rounded-full border-0 px-2 py-1.5 text-xs font-medium outline-none ${statusStyles[student.status]}`}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                          <option value="Leave">Leave</option>
                        </select>
                      </td>

                      <td className="px-4 py-3">
                        <input
                          value={student.remarks}
                          onChange={(event) =>
                            updateStudent(
                              student.id,
                              "remarks",
                              event.target.value
                            )
                          }
                          placeholder="Add remark..."
                          className="w-24 rounded-md border border-transparent bg-transparent px-2 py-1.5 text-xs text-slate-600 outline-none placeholder:text-slate-400 focus:border-emerald-200 focus:bg-white"
                        />
                      </td>

                      <td className="px-4 py-3 text-xs text-slate-500">
                        {student.class}
                      </td>
                    </tr>
                  ))}

                  {filteredStudents.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-sm text-slate-500"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
              Showing {filteredStudents.length} students
            </div>
          </section>

          {/* Summary chart */}
          <AttendanceSummary students={filteredStudents} />
        </div>
      </main>
    </div>
  );
}
