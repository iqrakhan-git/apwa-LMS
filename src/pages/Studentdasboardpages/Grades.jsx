
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  GraduationCap,
  TrendingUp,
  BookOpen,
  Award,
  ChevronDown,
  Download,
  Search,
} from "lucide-react";

const gradesData = [
  {
    code: "CS-301",
    subject: "Data Structures & Algorithms",
    credit: 3,
    marks: 92,
    grade: "A+",
    points: 4.0,
    status: "Excellent",
  },
  {
    code: "CS-302",
    subject: "Database Management Systems",
    credit: 3,
    marks: 87,
    grade: "A",
    points: 4.0,
    status: "Excellent",
  },
  {
    code: "CS-303",
    subject: "Operating Systems",
    credit: 3,
    marks: 82,
    grade: "A-",
    points: 3.7,
    status: "Very Good",
  },
  {
    code: "CS-304",
    subject: "Computer Networks",
    credit: 3,
    marks: 78,
    grade: "B+",
    points: 3.3,
    status: "Good",
  },
  {
    code: "CS-305",
    subject: "Software Engineering",
    credit: 3,
    marks: 90,
    grade: "A+",
    points: 4.0,
    status: "Excellent",
  },
  {
    code: "CS-306",
    subject: "Web Development",
    credit: 3,
    marks: 85,
    grade: "A",
    points: 4.0,
    status: "Very Good",
  },
];

const semesters = ["Fall 2026", "Spring 2026", "Fall 2025"];

function SummaryCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-800">
            {value}
          </h2>
          <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
        </div>

        <div className="rounded-xl bg-green-50 p-3 text-green-800">
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}

export default function Grades() {
  const [semester, setSemester] = useState("Fall 2026");
  const [search, setSearch] = useState("");

  const filteredGrades = gradesData.filter((item) =>
    `${item.subject} ${item.code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalCredits = filteredGrades.reduce(
    (total, item) => total + item.credit,
    0
  );

  const averageMarks =
    filteredGrades.length > 0
      ? (
          filteredGrades.reduce((total, item) => total + item.marks, 0) /
          filteredGrades.length
        ).toFixed(1)
      : "0.0";

  const handleExport = () => {
    const headers = [
      "Course Code",
      "Subject",
      "Credits",
      "Marks",
      "Grade",
      "Grade Points",
    ];

    const rows = filteredGrades.map((item) => [
      item.code,
      item.subject,
      item.credit,
      item.marks,
      item.grade,
      item.points,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "student-grades.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen ml-70 bg-[#f6f8f6] md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Navbar */}
        <Navbar />

        <main className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Page Heading */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm text-gray-500">
                Student Portal / Academic
              </p>

              <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                My Grades
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                View your academic performance and semester results.
              </p>
            </div>

            <button
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#145c3b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10492f]"
            >
              <Download size={18} />
              Export Grades
            </button>
          </div>

          {/* Semester Selector */}
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-800">
                Academic Overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Select a semester to review your grades.
              </p>
            </div>

            <div className="relative">
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-green-700 sm:w-48"
              >
                {semesters.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              icon={GraduationCap}
              title="Current CGPA"
              value="3.85"
              subtitle="Out of 4.00"
            />

            <SummaryCard
              icon={TrendingUp}
              title="Semester GPA"
              value="3.83"
              subtitle={semester}
            />

            <SummaryCard
              icon={BookOpen}
              title="Total Credits"
              value="18"
              subtitle="Credits attempted"
            />

            <SummaryCard
              icon={Award}
              title="Average Marks"
              value={`${averageMarks}%`}
              subtitle="Across displayed courses"
            />
          </div>

          {/* Performance Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-[#145c3b] p-6 text-white sm:p-8">
            <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium">
                  <Award size={15} />
                  Academic Performance
                </div>

                <h2 className="text-2xl font-bold">
                  Keep up the great work!
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-green-100">
                  Review your subject-wise results and keep working toward
                  your academic goals.
                </p>
              </div>

              <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <span className="text-3xl font-bold">A</span>
                <span className="text-xs text-green-100">
                  Grade level
                </span>
              </div>
            </div>

            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-20 right-40 h-44 w-44 rounded-full bg-white/5" />
          </div>

          {/* Grades Table */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Subject-wise Grades
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Your marks, credits and grade points.
                </p>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search subject or code..."
                  className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-700"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-[#f5f8f5] text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Course</th>
                    <th className="px-5 py-4 font-semibold">Subject Name</th>
                    <th className="px-5 py-4 text-center font-semibold">
                      Credits
                    </th>
                    <th className="px-5 py-4 text-center font-semibold">
                      Marks
                    </th>
                    <th className="px-5 py-4 text-center font-semibold">
                      Grade
                    </th>
                    <th className="px-5 py-4 text-center font-semibold">
                      Grade Points
                    </th>
                    <th className="px-5 py-4 font-semibold">Performance</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredGrades.map((item) => (
                    <tr
                      key={item.code}
                      className="transition hover:bg-green-50/50"
                    >
                      <td className="whitespace-nowrap px-5 py-5 font-semibold text-[#145c3b]">
                        {item.code}
                      </td>

                      <td className="px-5 py-5 font-medium text-gray-700">
                        {item.subject}
                      </td>

                      <td className="px-5 py-5 text-center text-gray-600">
                        {item.credit}
                      </td>

                      <td className="px-5 py-5 text-center font-semibold text-gray-700">
                        {item.marks}%
                      </td>

                      <td className="px-5 py-5 text-center">
                        <span className="inline-flex min-w-11 items-center justify-center rounded-lg bg-green-100 px-3 py-1.5 font-bold text-green-800">
                          {item.grade}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-center font-medium text-gray-700">
                        {item.points.toFixed(1)}
                      </td>

                      <td className="px-5 py-5">
                        <span className="whitespace-nowrap rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-800">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredGrades.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-gray-500"
                      >
                        No subjects found. Try another search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filteredGrades.length} of {gradesData.length} subjects
              </p>
              <p>
                Total displayed credits:{" "}
                <span className="font-semibold text-gray-700">
                  {totalCredits}
                </span>
              </p>
            </div>
          </section>

          {/* Footer */}
          <p className="pb-2 text-center text-xs text-gray-400">
            Student Portal · Academic Records
          </p>
        </main>
      </div>
    </div>
  );
}
