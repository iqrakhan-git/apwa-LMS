import Sidebar2 from "../../components/Sidebar2";
import  { useState } from "react";
import {
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Search,
} from "lucide-react";

const initialGrades = [
  {
    id: 1,
    name: "Ayesha Ali",
    assignment: 90,
    quiz: 85,
    project: 92,
  },
  {
    id: 2,
    name: "Bilal Khan",
    assignment: 78,
    quiz: 88,
    project: 85,
  },
  {
    id: 3,
    name: "Sara Ahmed",
    assignment: 95,
    quiz: 90,
    project: 80,
  },
  {
    id: 4,
    name: "Usman Raza",
    assignment: 70,
    quiz: 75,
    project: 80,
  },
  {
    id: 5,
    name: "Fatima Noor",
    assignment: 88,
    quiz: 82,
    project: 90,
  },
  {
    id: 6,
    name: "Hamza Khan",
    assignment: 84,
    quiz: 79,
    project: 86,
  },
  {
    id: 7,
    name: "Iqra Ahmed",
    assignment: 92,
    quiz: 94,
    project: 89,
  },
  {
    id: 8,
    name: "Ahmed Hassan",
    assignment: 76,
    quiz: 81,
    project: 78,
  },
  {
    id: 9,
    name: "Zainab Ali",
    assignment: 89,
    quiz: 91,
    project: 93,
  },
  {
    id: 10,
    name: "Muhammad Saad",
    assignment: 82,
    quiz: 80,
    project: 84,
  },
];

const courses = [
  { code: "Eng-101", name: "Enlish" },
  { code: "UR-102", name: "Urdu" },
  { code: "M-103", name: "Math" },
];

const ITEMS_PER_PAGE = 5;

function calculateGrade(student) {
  return Math.round(
    (student.assignment + student.quiz + student.project) / 3
  );
}

function getGradeColor(grade) {
  if (grade >= 85) {
    return "text-emerald-600 bg-emerald-50";
  }

  if (grade >= 70) {
    return "text-primary bg-primary/10";
  }

  return "text-rose-600 bg-rose-50";
}

function Grades() {
  const [grades, setGrades] = useState(initialGrades);
  const [selectedCourse, setSelectedCourse] = useState("CS-101");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);

  const filteredGrades = grades.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredGrades.length / ITEMS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const visibleGrades = filteredGrades.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const updateGrade = (e) => {
    e.preventDefault();

    setGrades((previous) =>
      previous.map((student) =>
        student.id === editingStudent.id
          ? {
              ...student,
              assignment: Number(editingStudent.assignment),
              quiz: Number(editingStudent.quiz),
              project: Number(editingStudent.project),
            }
          : student
      )
    );

    setEditingStudent(null);
  };

  const exportCSV = () => {
    const headers = [
      "Student Name",
      "English",
      "Urdu",
      "Math",
      "Final Grade",
    ];

    const rows = filteredGrades.map((student) => [
      student.name,
      student.assignment,
      student.quiz,
      student.project,
      `${calculateGrade(student)}%`,
    ]);

    const escapeCSV = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    // Add BOM for better Excel compatibility.
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `grades-${selectedCourse}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-7 font-sans text-heading sm:px-7 lg:px-10">
      <Sidebar2/>
      <div className="md:pl-65 pl-1 mx-auto max-w-[1500px]">

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
              Grades
            </h1>

            <p className="mt-2 text-sm text-muted">
              View and manage student grades.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Course Selection */}
            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Select course"
                className="min-w-[125px] appearance-none rounded-xl border border-border bg-card py-3 pl-4 pr-10 text-sm font-semibold text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                {courses.map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>

            {/* Export Button */}
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
            >
              <Download size={17} />
              Export
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search student..."
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary"
            />
          </div>

          <p className="text-xs text-muted">
            Total Students:{" "}
            <span className="font-bold text-heading">
              {filteredGrades.length}
            </span>
          </p>
        </div>

        {/* Grades Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

          {/* Table Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileSpreadsheet size={19} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-heading">
                  Student Gradebook
                </h2>

                <p className="mt-1 text-xs text-muted">
                  {courses.find(
                    (course) => course.code === selectedCourse
                  )?.name || "Selected Class"}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              {filteredGrades.length} Students
            </span>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-background/70">
                  <th className="w-14 px-5 py-4 text-xs font-bold text-muted">
                    #
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    Student Name
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    English
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    Urdu
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    Math
                  </th>

                  <th className="px-5 py-4 text-xs font-bold text-muted">
                    Final Grade
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {visibleGrades.map((student, index) => {
                  const finalGrade = calculateGrade(student);

                  return (
                    <tr
                      key={student.id}
                      className="transition hover:bg-primary/[0.035]"
                    >
                      <td className="px-5 py-4 text-xs text-muted">
                        {startIndex + index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {student.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")}
                          </div>

                          <span className="whitespace-nowrap text-sm font-semibold text-heading">
                            {student.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-heading">
                        {student.assignment}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-heading">
                        {student.quiz}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-heading">
                        {student.project}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          title="Click to edit grades"
                          onClick={() => setEditingStudent({ ...student })}
                          className={`rounded-full px-3 py-1.5 text-xs font-bold transition hover:ring-2 hover:ring-primary/20 ${getGradeColor(
                            finalGrade
                          )}`}
                        >
                          {finalGrade.toFixed(1)}%
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {visibleGrades.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-14 text-center"
                    >
                      <div className="text-sm font-semibold text-heading">
                        No students found
                      </div>

                      <p className="mt-2 text-xs text-muted">
                        Try searching with a different name.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              Showing{" "}
              <span className="font-semibold text-heading">
                {filteredGrades.length === 0 ? 0 : startIndex + 1}
                {" - "}
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredGrades.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-heading">
                {filteredGrades.length}
              </span>{" "}
              students
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  aria-current={safePage === page ? "page" : undefined}
                  className={`h-9 min-w-9 rounded-lg px-3 text-xs font-semibold transition ${
                    safePage === page
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted hover:bg-background hover:text-heading"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-5 rounded-xl border border-border bg-card px-5 py-4">
          <p className="text-xs leading-5 text-muted">
            <span className="font-semibold text-heading">
              Grading information:
            </span>{" "}
            Final grades are calculated as the average of English,
            Urdu, and Project scores. Click a final grade to edit the
            student's scores.
          </p>
        </div>
      </div>

      {/* Edit Grades Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-grade-title"
            className="my-auto w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2
                  id="edit-grade-title"
                  className="text-xl font-extrabold text-heading"
                >
                  Edit Grades
                </h2>

                <p className="mt-2 text-sm text-muted">
                  {editingStudent.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                aria-label="Close edit grades"
                className="rounded-lg px-3 py-2 text-muted hover:bg-background"
              >
                ✕
              </button>
            </div>

            <form onSubmit={updateGrade} className="space-y-5">
              {[
                { key: "assignment", label: "English" },
                { key: "quiz", label: "Urdu" },
                { key: "project", label: "Math" },
              ].map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={`grade-${field.key}`}
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    {field.label}
                  </label>

                  <input
                    id={`grade-${field.key}`}
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={editingStudent[field.key]}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        [field.key]: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none focus:border-primary"
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-heading hover:bg-background"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Save Grades
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Grades;
