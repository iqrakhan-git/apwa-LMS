import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  Award,
  Download,
  Search,
} from "lucide-react";

const gradesData = [
  {
    code: "ENG-301",
    subject: "English ",
    credit: 0,
    marks: 40,
    grade: "C",
    Total: 100,
    status: "Excellent",
  },
  {
    code: "CS-302",
    subject: "Computer Science",
    credit: 3,
    marks: 87,
    grade: "A",
    Total: 100,
    status: "Excellent",
  },
  {
    code: "SN-303",
    subject: "Sindhi",
    credit: 3,
    marks: 82,
    grade: "A-",
    Total: 100,
    status: "Very Good",
  },
  {
    code: "M-304",
    subject: "Math",
    credit: 3,
    marks: 78,
    grade: "B+",
    Total: 100,
    status: "Good",
  },
  {
    code: "PST-305",
    subject: "Pakistan Stadies",
    credit: 3,
    marks: 90,
    grade: "A+",
    Total: 100,
    status: "Excellent",
  },
  {
    code: "CH-306",
    subject: "Chemistry",
    credit: 3,
    marks: 85,
    grade: "A",
    Total: 100,
    status: "Very Good",
  },
  {
    code: "PHY-306",
    subject: "Physics",
    credit: 3,
    marks: 85,
    grade: "A",
    Total:100 ,
    status: "Very Good",
  },
];

export default function Grades() {
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


  const handleExport = () => {
    const headers = [
      "Class Code",
      "Subject",
      "Credits",
      "Marks",
      "Grade",
      "Total Mark",
    ];

    const rows = filteredGrades.map((item) => [
      item.code,
      item.subject,
      item.credit,
      item.marks,
      item.grade,
      item.Total,
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
    <div className="min-h-screen ml-63 bg-background md:flex">
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
              <p className="mb-2 text-sm text-muted">
                Student Portal / Academic
              </p>

              <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                My Grades
              </h1>

              <p className="mt-2 text-sm text-muted">
                View your academic performance and semester results.
              </p>
            </div>

            <button
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              <Download size={18} />
              Export Grades
            </button>
          </div>

          {/* Performance Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-sidebar p-6 text-white sm:p-8">
            <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium">
                  <Award size={15} />
                  Academic Performance
                </div>

                <h2 className="text-2xl font-bold">
                  Keep up the great work!
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                  Review your subject-wise results and keep working toward
                  your academic goals.
                </p>
              </div>

              <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <span className="text-3xl font-bold">A</span>
                <span className="text-xs text-white/80">
                  Grade level
                </span>
              </div>
            </div>

            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-20 right-40 h-44 w-44 rounded-full bg-white/5" />
          </div>

          {/* Grades Table */}
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-heading">
                  Subject-wise Grades
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Your marks, credits and Total Marks.
                </p>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search subject or code..."
                  className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-heading outline-none transition focus:border-primary"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-primary/5 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Clases</th>
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
                      Total Marks
                    </th>
                    <th className="px-5 py-4 font-semibold">Performance</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredGrades.map((item) => (
                    <tr
                      key={item.code}
                      className="transition hover:bg-primary/5"
                    >
                      <td className="whitespace-nowrap px-5 py-5 font-semibold text-primary">
                        {item.code}
                      </td>

                      <td className="px-5 py-5 font-medium text-heading">
                        {item.subject}
                      </td>

                      <td className="px-5 py-5 text-center text-muted">
                        {item.credit}
                      </td>

                      <td className="px-5 py-5 text-center font-semibold text-heading">
                        {item.marks}
                      </td>

                      <td className="px-5 py-5 text-center">
                        <span className="inline-flex min-w-11 items-center justify-center rounded-lg bg-primary/10 px-3 py-1.5 font-bold text-primary">
                          {item.grade}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-center font-medium text-heading">
                        {item.Total}
                      </td>

                      <td className="px-5 py-5">
                        <span className="whitespace-nowrap rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredGrades.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-muted"
                      >
                        No subjects found. Try another search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2 border-t border-border px-5 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filteredGrades.length} of {gradesData.length} subjects
              </p>
              <p>
                Total displayed credits:{" "}
                <span className="font-semibold text-heading">
                  {totalCredits}
                </span>
              </p>
            </div>
          </section>

          {/* Footer */}
          <p className="pb-2 text-center text-xs text-muted">
            Student Portal · Academic Records
          </p>
        </main>
      </div>
    </div>
  );
}