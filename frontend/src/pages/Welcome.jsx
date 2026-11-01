
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ShieldCheck,
  Users,
  BookOpen,
  CheckCircle2,

} from "lucide-react";

export default function Welcome() {
  const features = [
    {
      icon: CalendarDays,
      title: "Attendance Management",
      description: (
        <>
          Track student attendance
          <br />
          with ease and accuracy.
        </>
      ),
    },
    {
      icon: ChartNoAxesColumnIncreasing,
      title: "Performance Tracking",
      description: (
        <>
          Monitor progress and
          <br />
          improve results.
        </>
      ),
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description: (
        <>
          Your data is always
          <br />
          safe with us.
        </>
      ),
    },
    {
      icon: Users,
      title: "Better Communication",
      description: (
        <>
          Stay connected with
          <br />
          teachers and students.
        </>
      ),
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white text-[#17133D]">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-16 top-4 h-28 w-28 rounded-full bg-purple-100/70 blur-2xl" />
      <div className="pointer-events-none absolute -right-20 top-32 h-72 w-72 rounded-full bg-purple-100/60 blur-3xl" />

      {/* Main Content */}
      <main className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-8 sm:px-10 lg:px-16">

        {/* Hero Section */}
        <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">

          {/* Left Content */}
          <div className="relative z-10 order-2 lg:order-1">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold text-purple-700">
              <GraduationCap size={17} />
              Smart Learning Management System
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-[#17133D] sm:text-5xl lg:text-[58px]">
              Welcome to
              <span className="mt-1 block bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                APWA-LMS
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-md text-sm leading-6 text-[#66628A] sm:text-base">
              A simple and efficient platform for managing
              attendance, tracking performance and building
              a better learning environment.
            </p>

            {/* Login Buttons */}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row">

              {/* Teacher Login */}
              <Link
                to="/teacher/login"
                className="group flex items-center justify-center gap-3 rounded-xl border border-purple-100 bg-purple-100 px-5 py-3.5 text-sm font-semibold text-purple-800 transition duration-300 hover:-translate-y-1 hover:bg-purple-200"
              >
                <div className="flex items-center gap-2">
                  <BookOpen size={20} />
                  Login as Teacher
                </div>

                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              {/* Student Login */}
              <Link
                to="/student/login"
                className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition duration-300 hover:-translate-y-1 hover:shadow-purple-300 "
              >
                <div className="flex items-center gap-2">
                  <GraduationCap size={20} />
                  Login as Student
                </div>

                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>

          </div>

          {/* Right Illustration */}
          <div className="relative order-1 flex min-h-[300px] items-center justify-center lg:order-2 lg:min-h-[390px]">

            {/* Background Shape */}
            <div className="absolute inset-5 rounded-[45%] bg-gradient-to-br from-purple-50 via-purple-100/70 to-purple-50" />

            <div className="relative z-10 w-full max-w-[540px]">

              {/* Calendar */}
              <div className="absolute -right-1 -top-5 z-20 rounded-2xl border border-purple-100 bg-white p-3 shadow-xl sm:right-5">
                <CalendarDays size={40} className="text-purple-600" />
              </div>

              {/* Graduation Badge */}
              <div className="absolute -right-1 top-28 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg sm:right-0">
                <GraduationCap size={34} />
              </div>

              {/* Dashboard Window */}
              <div className="mx-auto w-[85%] rounded-2xl border border-purple-100 bg-white p-4 shadow-xl sm:p-5">

                <div className="mb-4 flex items-center justify-between">
                  <div className="h-3 w-2/5 rounded-full bg-purple-300" />
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-purple-300" />
                    <span className="h-2 w-2 rounded-full bg-purple-200" />
                    <span className="h-2 w-2 rounded-full bg-purple-100" />
                  </div>
                </div>

                <div className="grid grid-cols-[90px_1fr] gap-3">

                  {/* Profile Panel */}
                  <div className="rounded-xl bg-purple-50 p-3">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-200 text-purple-700">
                      <Users size={23} />
                    </div>
                    <div className="mb-2 h-2 rounded-full bg-purple-200" />
                    <div className="h-2 w-3/4 rounded-full bg-purple-100" />
                  </div>

                  {/* Statistics */}
                  <div className="space-y-3">
                    <div className="h-3 w-3/4 rounded-full bg-purple-200" />
                    <div className="h-3 w-1/2 rounded-full bg-purple-100" />

                    <div className="flex items-end gap-2 pt-2">
                      {[35, 55, 42, 75, 60, 95, 70].map((height, index) => (
                        <div
                          key={index}
                          style={{ height: `${height}px` }}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-purple-700 to-purple-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="mt-4 space-y-2 rounded-xl bg-purple-50 p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-purple-600" />
                    <div className="h-2 w-2/3 rounded-full bg-purple-200" />
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-purple-600" />
                    <div className="h-2 w-1/2 rounded-full bg-purple-200" />
                  </div>
                </div>
              </div>

              {/* Teacher and Student Illustration Cards */}
              <div className="relative -mt-5 flex items-end justify-between px-2 sm:px-8">

                {/* Teacher */}
                <div className="flex flex-col items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-purple-200 to-purple-400 text-5xl shadow-lg sm:h-32 sm:w-32 sm:text-6xl">
                    👩🏻‍🏫
                  </div>
                  <div className="mt-2 rounded-full bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    Teacher
                  </div>
                </div>

                {/* Student */}
                <div className="flex flex-col items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-purple-200 to-purple-400 text-5xl shadow-lg sm:h-32 sm:w-32 sm:text-6xl">
                    👨🏻‍🎓
                  </div>
                  <div className="mt-2 rounded-full bg-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    Student
                  </div>
                </div>
              </div>

              {/* Laptop */}
              <div className="mx-auto mt-3 flex h-5 w-[75%] items-center justify-center rounded-b-xl bg-gradient-to-r from-purple-700 to-purple-500 shadow-lg">
                <div className="h-1 w-16 rounded-full bg-purple-300" />
              </div>

            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-16 grid grid-cols-1 gap-8 border-t border-purple-100 pt-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-0">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`flex flex-col items-center px-4 text-center ${
                  index !== 0 ? "lg:border-l lg:border-purple-100" : ""
                }`}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 transition duration-300 hover:-translate-y-1 hover:bg-purple-200">
                  <Icon size={25} />
                </div>

                <h3 className="text-sm font-bold text-[#211A4A]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#77739C]">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </section>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 px-4 py-5 text-white">

        <div className="pointer-events-none absolute -bottom-16 -left-5 h-36 w-36 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -right-10 -top-20 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative flex flex-wrap items-center justify-center gap-3 text-center text-[10px] sm:text-xs">
          <span>APWA-LMS © 2025</span>
          <span className="hidden sm:inline">|</span>
          <span>Learn Today, Build Tomorrow</span>
        </div>
      </footer>

    </div>
  );
}
