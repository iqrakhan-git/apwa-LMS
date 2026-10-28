
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ContactRound,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/auth";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const [form, setForm] = useState({
    studentId: "",
    password: "",
  });

  const showMessage = (text, type = "error") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  // Login using Express + MongoDB backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentId = form.studentId.trim();
    const password = form.password;

    if (!studentId || !password) {
      showMessage("Please enter your Student ID and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message || "Invalid Student ID or password.");
        return;
      }

      // Expect the backend to return a student object.
      const student = data.student;

      if (!student) {
        showMessage("Student information was not returned by the server.");
        return;
      }

      if (
        student.role !== "student" ||
        student.studentId?.trim().toLowerCase() !==
          studentId.toLowerCase()
      ) {
        showMessage("This account is not authorized for the student portal.");
        return;
      }

      if (student.status && student.status !== "active") {
        showMessage("Your account is inactive. Please contact your administrator.");
        return;
      }

      // Store the token if the backend provides one.
      // Use sessionStorage when Remember Me is unchecked.
      if (data.token) {
        const storage = rememberMe ? localStorage : sessionStorage;

        // Clear a previously stored token from the other storage.
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        storage.setItem("token", data.token);
      }

      showMessage("Login successful!", "success");

      navigate("/dashboard", {
        replace: true,
        state: { profile: student },
      });
    } catch (error) {
      console.error("Login error:", error);

      showMessage(
        "Unable to connect to the server. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-3 sm:p-6">
      <div className="grid min-h-[650px] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-2xl bg-surface shadow-elevated lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="relative min-h-[280px] bg-cover bg-center lg:min-h-[650px]"
          style={{
            backgroundImage:
              "url('/WhatsApp Image 2026-10-28 at 9.23.42 AM(1).jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary/55 to-primary-dark/95" />

          <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-6 text-white sm:p-9 lg:min-h-[650px] lg:p-10">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/15 p-2 backdrop-blur-md">
                <GraduationCap size={27} />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-wide">
                  Student Portal
                </h2>
                <p className="text-[11px] text-white/70">
                  Your learning journey starts here
                </p>
              </div>
            </div>

            {/* Welcome Content */}
            <div className="max-w-md py-8 lg:py-0">
              <span className="mb-4 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
                Welcome to your campus
              </span>

              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Learn.
                <br />
                Grow.
                <br />
                <span className="text-primary-light">Achieve.</span>
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/85 sm:text-base">
                Your journey to a brighter future starts here.
                Access your courses, assignments, grades and more
                — all in one place.
              </p>

              <div className="mt-7 flex items-center gap-2">
                <div className="h-1 w-12 rounded-full bg-primary-light" />
                <div className="h-1 w-5 rounded-full bg-white/40" />
                <div className="h-1 w-5 rounded-full bg-white/40" />
              </div>
            </div>

            {/* Footer */}
            <div className="hidden items-center justify-between gap-4 border-t border-white/20 pt-5 text-xs text-white/70 lg:flex">
              <p>Empowering students every day.</p>
              <p>© 2026 Student Portal</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center bg-surface p-5 sm:p-10 lg:p-12 xl:p-16">
          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-8">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                <GraduationCap size={27} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                Welcome Back 👋
              </h2>

              <p className="mt-3 text-sm text-body">
                Login to your student account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* STUDENT ID */}
              <div>
                <label
                  htmlFor="studentId"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Student ID
                </label>

                <div className="relative">
                  <ContactRound
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-body"
                  />

                  <input
                    id="studentId"
                    type="text"
                    name="studentId"
                    value={form.studentId}
                    onChange={handleChange}
                    placeholder="Enter your Student ID"
                    autoComplete="username"
                    required
                    disabled={loading}
                    className="w-full rounded-input border border-border bg-surface py-3 pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-4 focus:ring-primary-light/50 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-body"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    className="w-full rounded-input border border-border bg-surface py-3 pl-11 pr-12 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-4 focus:ring-primary-light/50 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-body transition hover:text-primary-dark"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME & FORGOT PASSWORD */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-body">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-primary"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    showMessage(
                      "Please contact your administrator to reset your password."
                    )
                  }
                  disabled={loading}
                  className="text-xs font-semibold text-primary transition hover:text-primary-dark disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>

              {/* MESSAGE */}
              {message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-input px-4 py-3 text-sm ${
                    messageType === "success"
                      ? "bg-success-light text-success"
                      : "bg-danger-light text-danger"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-button bg-primary py-3.5 text-sm font-semibold text-white shadow-green transition duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-elevated focus:outline-none focus:ring-4 focus:ring-primary-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Login"}

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-7 text-center text-sm text-body">
              Need an account? Contact your administrator.
            </p>

            <p className="mt-8 text-center text-xs text-body lg:hidden">
              © 2026 Student Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;