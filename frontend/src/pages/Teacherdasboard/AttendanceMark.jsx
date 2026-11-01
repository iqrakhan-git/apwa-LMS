import { useMemo, useState } from "react";
import {
 
  Search,
  Bell,
  CheckCircle2,
  Clock3,
  XCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";
import Sidebar2 from "../../components/Sidebar2";

// Sidebar menu


// Initial student data
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

// Attendance status styles
const statusStyles = {
  Present: "bg-primary/10 text-primary",
  Absent: "bg-primary-dark/10 text-primary-dark",
  Late: "bg-secondary/10 text-secondary",
  Leave: "bg-accent/20 text-primary-dark",
};

// Attendance status icons
const statusIcons = {
  Present: CheckCircle2,
  Absent: XCircle,
  Late: Clock3,
  Leave: Calendar,
};

// Reusable StatusBadge component
function StatusBadge({ status }) {
  const Icon = statusIcons[status] || AlertCircle;

  const style =
    statusStyles[status] || "bg-primary/10 text-muted";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${style}`}
    >
      <Icon size={12} />
      {status || "Unknown"}
    </span>
  );
}

// Sidebar component


// Navbar component
function Navbar() {
  return (
    <header className="fixed left-56 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card/95 px-7 backdrop-blur">
      <div className="flex w-72 items-center gap-2 rounded-lg bg-background px-3 py-2">
        <Search size={16} className="text-muted" />

        <input
          type="text"
          placeholder="Search anything..."
          className="w-full bg-transparent text-sm text-heading outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative text-muted"
        >
          <Bell size={18} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Teacher profile"
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-heading">
              Ms. Ayesha Khan
            </p>
            <p className="text-[10px] text-muted">
              Teacher
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

// Attendance summary component
function AttendanceSummary({ students }) {
  const counts = useMemo(() => {
    return students.reduce(
      (result, student) => {
        if (Object.prototype.hasOwnProperty.call(
          result,
          student.status
        )) {
          result[student.status] += 1;
        }

        return result;
      },
      {
        Present: 0,
        Absent: 0,
        Late: 0,
        Leave: 0,
      }
    );
  }, [students]);

  const total = students.length;

  const attendanceRate = total
    ? Math.round(((counts.Present + counts.Late) / total) * 100)
    : 0;

  const segments = [
    { name: "Present", color: "#7C3AED" },
    { name: "Absent", color: "#5B21B6" },
    { name: "Late", color: "#9333EA" },
    { name: "Leave", color: "#C084FC" },
  ];

  let cumulative = 0;

  const gradient = segments
    .map((segment) => {
      const start = cumulative;

      cumulative += total
        ? (counts[segment.name] / total) * 100
        : 0;

      return `${segment.color} ${start}% ${cumulative}%`;
    })
    .join(", ");

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-bold text-heading">
        Attendance Summary
      </h3>

      <div className="my-6 flex justify-center">
        <div
          className="relative flex h-32 w-32 items-center justify-center rounded-full"
          style={{
            background: total
              ? `conic-gradient(${gradient})`
              : "#ede9fe",
          }}
        >
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-card">
            <span className="text-2xl font-bold text-heading">
              {attendanceRate}%
            </span>

            <span className="text-[10px] text-muted">
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
            <div className="flex items-center gap-2 text-muted">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: segment.color }}
              />

              {segment.name}
            </div>

            <span className="font-semibold text-heading">
              {counts[segment.name]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
        <span className="text-muted">Total Students</span>

        <span className="font-bold text-heading">
          {total}
        </span>
      </div>
    </section>
  );
}

// Main Attendance page
export default function AttendanceMark() {
  const [students, setStudents] = useState(initialStudents);

  // Set the date to today
  const [date, setDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });

  const [selectedClass, setSelectedClass] =
    useState("CS-101");

  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  // Filter students by class and name
  const filteredStudents = students.filter((student) => {
    const matchesClass =
      selectedClass === "All Classes" ||
      student.class === selectedClass;

    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    return matchesClass && matchesSearch;
  });

  // Update student attendance or remarks
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

  // Mark students in the selected class as present
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

  // Save current attendance in the UI
  function saveAttendance() {
    setSaved(true);
  }

  return (
    <div className="min-h-screen ">
      <Sidebar2 />

       <Navbar />

      <main className="ml-62 min-h-screen px-7 pb-10 pt-24 bg-background ">
       
        {/* Heading and controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-heading">
              Attendance
            </h2>

            <p className="mt-1 text-sm text-muted">
              Mark and manage student attendance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <Calendar
                size={15}
                className="text-muted"
              />

              <input
                type="date"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  setSaved(false);
                }}
                className="w-32 bg-transparent text-xs text-heading outline-none"
              />
            </label>

            <select
              value={selectedClass}
              onChange={(event) => {
                setSelectedClass(event.target.value);
                setSaved(false);
              }}
              className="rounded-lg border border-border bg-card px-3 py-2.5 text-xs text-heading outline-none"
            >
              <option value="All Classes">All Classes</option>
              <option value="CS-101">CS-101</option>
              <option value="CS-102">CS-102</option>
              <option value="CS-103">CS-103</option>
            </select>

            <button
              type="button"
              onClick={saveAttendance}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-dark"
            >
              <CheckCircle2 size={15} />
              Save Attendance
            </button>
          </div>
        </div>

        {/* Save confirmation */}
        {saved && (
          <div
            role="status"
            className="mb-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary"
          >
            Attendance updated for {date}.
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_260px]">
          {/* Attendance table */}
          <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
              <div>
                <h3 className="text-sm font-bold text-heading">
                  Student Attendance
                </h3>

                <p className="mt-1 text-xs text-muted">
                  Update each student's status and remarks.
                </p>
              </div>

              <button
                type="button"
                onClick={markAllPresent}
                className="rounded-lg border border-primary/20 px-3 py-2 text-xs font-medium text-primary transition hover:bg-primary/5"
              >
                Mark All Present
              </button>
            </div>

            {/* Search */}
            <div className="border-b border-border p-3">
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                <Search
                  size={15}
                  className="text-muted"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search student name..."
                  className="w-full bg-transparent text-xs text-heading outline-none"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-primary/5">
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
                        className="px-4 py-3 text-xs font-semibold text-muted"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className="transition hover:bg-primary/5"
                    >
                      <td className="px-4 py-3 text-xs text-muted">
                        {index + 1}
                      </td>

                      {/* Student name */}
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={`https://i.pravatar.cc/100?img=${
                              [47, 12, 44, 68, 49, 32][
                                (student.id - 1) % 6
                              ]
                            }`}
                            alt={student.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />

                          <span className="text-xs font-semibold text-heading">
                            {student.name}
                          </span>
                        </div>
                      </td>

                      {/* Attendance status */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={student.status} />

                          <select
                            aria-label={`Attendance status for ${student.name}`}
                            value={student.status}
                            onChange={(event) =>
                              updateStudent(
                                student.id,
                                "status",
                                event.target.value
                              )
                            }
                            className="max-w-24 rounded-md border border-border bg-card px-1.5 py-1.5 text-xs text-heading outline-none focus:border-primary"
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                            <option value="Leave">Leave</option>
                          </select>
                        </div>
                      </td>

                      {/* Remarks */}
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={student.remarks}
                          onChange={(event) =>
                            updateStudent(
                              student.id,
                              "remarks",
                              event.target.value
                            )
                          }
                          placeholder="Add remark..."
                          aria-label={`Remarks for ${student.name}`}
                          className="w-24 rounded-md border border-transparent bg-transparent px-2 py-1.5 text-xs text-heading outline-none placeholder:text-muted focus:border-primary/30 focus:bg-card"
                        />
                      </td>

                      {/* Class */}
                      <td className="px-4 py-3 text-xs text-muted">
                        {student.class}
                      </td>
                    </tr>
                  ))}

                  {filteredStudents.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-sm text-muted"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-border px-4 py-3 text-xs text-muted">
              Showing {filteredStudents.length} students
            </div>
          </section>

          {/* Attendance summary */}
          <AttendanceSummary students={filteredStudents} />
        </div>
      </main>
    </div>
  );
}