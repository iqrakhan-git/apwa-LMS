
import React, { useState } from "react";
import {
  Search,
  Plus,
  Database,
  Palette,
  Monitor,
  BookOpen,
  Calculator,
  ArrowRight,
  X,
  Users,
} from "lucide-react";
import Sidebar2 from "../../components/Sidebar2";

// Course data
const initialCourses = [
  {
    id: 1,
    title: "Urdu",
    code: "UR-101",
    students: 28,
    icon: BookOpen,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    description:
      "Learn HTML, CSS, JavaScript, React and modern web development.",
  },
  {
    id: 2,
    title: "Sindhi",
    code: "SHI-103",
    students: 24,
    icon: Database,
    color: "text-sky-600",
    bg: "bg-sky-100",
    description:
      "Understand database design, SQL queries and data management.",
  },
  {
    id: 3,
    title: "Pakistan Studies",
    code: "PST-101",
    students: 18,
    icon: Palette,
    color: "text-purple-600",
    bg: "bg-purple-100",
    description:
      "Explore user interface design, wireframes and user experience.",
  },
  {
    id: 4,
    title: "Computer Science",
    code: "CS-104",
    students: 22,
    icon: Monitor,
    color: "text-primary",
    bg: "bg-primary/10",
    description:
      "Study fundamental computer science concepts and programming.",
  },
  {
    id: 5,
    title: "English Communication",
    code: "ENG-101",
    students: 20,
    icon: BookOpen,
    color: "text-rose-600",
    bg: "bg-rose-100",
    description:
      "Improve written communication, grammar and speaking skills.",
  },
  {
    id: 6,
    title: "Mathematics",
    code: "MTH-101",
    students: 16,
    icon: Calculator,
    color: "text-green-600",
    bg: "bg-green-100",
    description:
      "Learn mathematical concepts, problem-solving and calculations.",
  },
];

export default function MyClasses() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [newCourse, setNewCourse] = useState({
    title: "",
    code: "",
    students: "",
    description: "",
  });

  const filteredCourses = courses.filter((course) => {
    const query = search.toLowerCase();

    return (
      course.title.toLowerCase().includes(query) ||
      course.code.toLowerCase().includes(query)
    );
  });

  const handleAddCourse = (e) => {
    e.preventDefault();

    if (!newCourse.title.trim() || !newCourse.code.trim()) {
      return;
    }

    const addedCourse = {
      id: Date.now(),
      title: newCourse.title.trim(),
      code: newCourse.code.trim().toUpperCase(),
      students: Number(newCourse.students) || 0,
      description:
        newCourse.description.trim() ||
        "No course description has been added yet.",
      icon: BookOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    };

    setCourses((previous) => [...previous, addedCourse]);

    setNewCourse({
      title: "",
      code: "",
      students: "",
      description: "",
    });

    setShowAddModal(false);
  };

  return (
    <div className="">
       <Sidebar2/>
      <div className="min-h-screen bg-background  pl-70 py-8 font-sans text-heading pr-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
              My Courses
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage your assigned courses and classes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Plus size={19} />
            Add Course
          </button>
        </div>

        {/* Search and course count */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <p className="text-sm text-muted">
            Showing{" "}
            <span className="font-bold text-heading">
              {filteredCourses.length}
            </span>{" "}
            courses
          </p>
        </div>

        {/* Course Cards */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => {
              const Icon = course.icon;

              return (
                <article
                  key={course.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  {/* Card Content */}
                  <div className="flex-1 p-5 sm:p-6">

                    {/* Course Icon */}
                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${course.bg} ${course.color}`}
                    >
                      <Icon size={25} strokeWidth={2} />
                    </div>

                    {/* Course Title */}
                    <h2 className="text-base font-bold text-heading transition group-hover:text-primary">
                      {course.title}
                    </h2>

                    {/* Course Code */}
                    <p className="mt-2 text-sm font-medium text-muted">
                      {course.code}
                    </p>

                    {/* Students */}
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                      <Users size={16} className="text-primary" />

                      <span>
                        Students:{" "}
                        <span className="font-semibold text-heading">
                          {course.students}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="border-t border-border bg-card">
                    <button
                      type="button"
                      onClick={() => setSelectedCourse(course)}
                      className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-primary transition hover:bg-primary/5 sm:px-6"
                    >
                      <span>View Details</span>

                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Search size={26} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-heading">
              No courses found
            </h3>

            <p className="mt-2 text-sm text-muted">
              Try another search term or add a new course.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setShowAddModal(true);
              }}
              className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Add Course
            </button>
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddModal(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-course-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2
                  id="add-course-title"
                  className="text-xl font-extrabold text-heading"
                >
                  Add New Course
                </h2>

                <p className="mt-2 text-sm text-muted">
                  Enter the details for your new course.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                aria-label="Close modal"
                className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-heading"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-5">
              <div>
                <label
                  htmlFor="course-title"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Course Name *
                </label>

                <input
                  id="course-title"
                  required
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Web Development"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none placeholder:text-muted focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="course-code"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Course Code *
                </label>

                <input
                  id="course-code"
                  required
                  value={newCourse.code}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      code: e.target.value,
                    })
                  }
                  placeholder="e.g. CS-101"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none placeholder:text-muted focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="course-students"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Number of Students
                </label>

                <input
                  id="course-students"
                  type="number"
                  min="0"
                  value={newCourse.students}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      students: e.target.value,
                    })
                  }
                  placeholder="e.g. 28"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none placeholder:text-muted focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="course-description"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Description
                </label>

                <textarea
                  id="course-description"
                  rows={3}
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      description: e.target.value,
                    })
                  }
                  placeholder="Write a short course description..."
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none placeholder:text-muted focus:border-primary"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-heading transition hover:bg-background"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-details-title"
            className="my-auto w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${selectedCourse.bg} ${selectedCourse.color}`}
              >
                {React.createElement(selectedCourse.icon, {
                  size: 28,
                })}
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                aria-label="Close course details"
                className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-heading"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="course-details-title"
              className="mt-5 text-xl font-extrabold text-heading"
            >
              {selectedCourse.title}
            </h2>

            <p className="mt-2 text-sm text-muted">
              Course Code: {selectedCourse.code}
            </p>

            <p className="mt-5 text-sm leading-6 text-muted">
              {selectedCourse.description}
            </p>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-background p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users size={20} />
              </div>

              <div>
                <p className="text-xs text-muted">
                  Enrolled Students
                </p>

                <p className="mt-1 text-lg font-bold text-heading">
                  {selectedCourse.students}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCourse(null)}
              className="mt-6 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}