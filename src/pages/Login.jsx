
import {
  GraduationCap,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      setMessage("Please enter your Student ID and password.");
      return;
    }

    // Connect your authentication API or Firebase here.
    setMessage("Login form submitted successfully!");
  };

  const handleSocialLogin = (provider) => {
    setMessage(`${provider} authentication is not connected yet.`);
  };

  return (
    <div className="min-h-screen bg-[#edf3f0] flex items-center justify-center p-3 sm:p-6">

      {/* Main Container */}
      <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="relative min-h-[280px] lg:min-h-[650px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85')",
          }}
        >
          {/* Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#063e31]/80 via-[#064c3a]/55 to-[#032d22]/95"></div>

          <div className="relative z-10 h-full min-h-[280px] lg:min-h-[650px] flex flex-col justify-between p-6 sm:p-9 lg:p-10 text-white">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-white/15 backdrop-blur-md p-2 rounded-lg">
                <GraduationCap size={27} />
              </div>

              <div>
                <h2 className="font-bold text-lg tracking-wide">
                  Student Portal
                </h2>

                <p className="text-[11px] text-white/70">
                  Your learning journey starts here
                </p>
              </div>
            </div>

            {/* Hero Content */}
            <div className="max-w-md py-8 lg:py-0">

              <span className="inline-block mb-4 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
                Welcome to your campus
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight tracking-tight">
                Learn.
                <br />
                Grow.
                <br />
                <span className="text-emerald-300">
                  Achieve.
                </span>
              </h1>

              <p className="mt-5 max-w-sm text-sm sm:text-base leading-7 text-white/85">
                Your journey to a brighter future starts here.
                Access your courses, assignments, grades and more
                — all in one place.
              </p>

              {/* Decorative Line */}
              <div className="mt-7 flex items-center gap-2">
                <div className="h-1 w-12 rounded-full bg-emerald-300"></div>
                <div className="h-1 w-5 rounded-full bg-white/40"></div>
                <div className="h-1 w-5 rounded-full bg-white/40"></div>
              </div>

            </div>

            {/* Footer */}
            <div className="hidden lg:flex items-center justify-between gap-4 border-t border-white/20 pt-5 text-xs text-white/70">
              <p>Empowering students every day.</p>

              <p>© 2026 Student Portal</p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-5 sm:p-10 lg:p-12 xl:p-16">

          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-8">

              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <GraduationCap size={27} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#173d33]">
                Welcome Back{" "}
                <span className="inline-block text-2xl">👋</span>
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Login to your student account
              </p>

            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email / Student ID */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email or Student ID
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email or student ID"
                    autoComplete="username"
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-emerald-800"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* Remember Me / Forgot Password */}
              <div className="flex flex-wrap items-center justify-between gap-3">

                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-emerald-800"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  onClick={() =>
                    setMessage("Connect your password reset flow here.")
                  }
                  className="text-xs font-semibold text-emerald-700 transition hover:text-emerald-900"
                >
                  Forgot password?
                </button>

              </div>

              {/* Feedback */}
              {message && (
                <div
                  role="status"
                  className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                >
                  {message}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#07543f] to-[#006747] py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-900/20 active:translate-y-0"
              >
                Login

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200"></div>

              <span className="text-xs text-gray-400">
                or continue with
              </span>

              <div className="h-px flex-1 bg-gray-200"></div>

            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">

              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition hover:border-emerald-700 hover:bg-emerald-50/50"
              >
                <FcGoogle size={19} />
                Google
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleSocialLogin("Apple")}
                className="flex items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition hover:border-emerald-700 hover:bg-emerald-50/50"
              >
                <FaApple size={19} />
                Apple
              </button>

            </div>

            {/* Signup */}
            <p className="mt-7 text-center text-sm text-gray-500">

              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => {
                  setMessage("Connect your signup page here.");
                }}
                className="font-semibold text-emerald-700 transition hover:text-emerald-900"
              >
                Sign Up
              </button>

            </p>

            {/* Mobile Footer */}
            <p className="mt-8 text-center text-xs text-gray-400 lg:hidden">
              © 2026 Student Portal. All rights reserved.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;