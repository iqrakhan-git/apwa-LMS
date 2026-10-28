
import { Link } from "react-router-dom";
import {
  Code2,
  Database,
  Palette,
  Monitor,
  BookOpen,
  Calculator,
  ArrowRight,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const courses = [
  {
    title: "Web Development",
    code: "CS-101",
    progress: 75,
    icon: Code2,
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-100",
    barColor: "bg-emerald-600",
  },
  {
    title: "Database Systems",
    code: "CS-102",
    progress: 60,
    icon: Database,
    iconColor: "text-sky-700",
    iconBg: "bg-sky-100",
    barColor: "bg-emerald-600",
  },
  {
    title: "UI/UX Design",
    code: "CS-103",
    progress: 40,
    icon: Palette,
    iconColor: "text-purple-700",
    iconBg: "bg-purple-100",
    barColor: "bg-emerald-600",
  },
  {
    title: "Computer Science",
    code: "CS-104",
    progress: 80,
    icon: Monitor,
    iconColor: "text-blue-700",
    iconBg: "bg-blue-100",
    barColor: "bg-emerald-600",
  },
  {
    title: "English Communication",
    code: "ENG-101",
    progress: 55,
    icon: BookOpen,
    iconColor: "text-orange-700",
    iconBg: "bg-orange-100",
    barColor: "bg-emerald-600",
  },
  {
    title: "Mathematics",
    code: "MTH-101",
    progress: 70,
    icon: Calculator,
    iconColor: "text-amber-700",
    iconBg: "bg-amber-100",
    barColor: "bg-emerald-600",
  },
];

function CourseCard({ course }) {
  const Icon = course.icon;

  return (
    <article className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg sm:p-6">

      {/* Course Icon */}
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${course.iconBg} ${course.iconColor} transition-transform duration-300 group-hover:scale-105`}
      >
        <Icon size={25} strokeWidth={2.2} />
      </div>

      {/* Course Information */}
      <div className="mb-5">
        <h2 className="text-base font-bold text-[#173d33]">
          {course.title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {course.code}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-auto">

        <div className="flex items-center gap-3">

          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-label={`${course.title} progress`}
            aria-valuenow={course.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full rounded-full ${course.barColor} transition-all duration-700`}
              style={{ width: `${course.progress}%` }}
            />
          </div>

          <span className="text-xs font-semibold text-gray-600">
            {course.progress}%
          </span>

        </div>

        {/* View Course */}
        <Link
          to={`/courses/${course.code}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
        >
          View Course

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>

      </div>

    </article>
  );
}

export default function Courses() {
  return (
    <div className="min-h-screen bg-[#f5f8fa]">

      {/* Reusable Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-h-screen pl-64">

        {/* Reusable Navbar */}
        <Navbar />

        <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">

          {/* Page Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight text-[#173d33] sm:text-3xl">
              My Courses
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Access your enrolled courses and track your progress.
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {courses.map((course) => (
              <CourseCard
                key={course.code}
                course={course}
              />
            ))}

          </div>

        </div>
      </main>
    </div>
  );
}
