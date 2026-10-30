
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LockKeyhole,
  ArrowRight,
  ContactRound,
} from "lucide-react";

import {
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";

import {  loginUser } from "../components/Auth/Auth.js";
import {db} from "./../firebase/config.js"

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // Input Change
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  // =========================
  // Validation
  // =========================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // Find Student Email
  // =========================

  const getStudentEmail = async (studentId) => {
    const studentsRef = collection(db, "students");

    const studentQuery = query(
      studentsRef,
      where("studentId", "==", studentId.trim()),
      limit(1)
    );

    const snapshot = await getDocs(studentQuery);

    if (snapshot.empty) {
      return null;
    }

    const studentData = snapshot.docs[0].data();

    return studentData.email || null;
  };

  // =========================
  // Login
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Find the student's email using their Student ID.
      const email = await getStudentEmail(formData.studentId);

      if (!email) {
        setErrors({
          studentId:
            "Student ID not found. Please check your Student ID.",
        });

        return;
      }

      // Firebase Authentication uses email and password.
      const result = await loginUser(
        email,
        formData.password
      );

      if (result?.success) {
        console.log("Login successful");
        console.log("User:", result.user);

        navigate("/dashboard");
      } else {
        const errorCode = result?.error?.code || result?.error;

        switch (errorCode) {
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
            setErrors({
              general: "Student ID or password is incorrect.",
            });
            break;

          case "auth/invalid-email":
            setErrors({
              general:
                "The email associated with this student account is invalid.",
            });
            break;

          case "auth/too-many-requests":
            setErrors({
              general:
                "Too many login attempts. Please try again later.",
            });
            break;

          default:
            setErrors({
              general:
                "Unable to log in. Please try again.",
            });
        }
      }
    } catch (error) {
      console.error("Login error:", error);

      setErrors({
        general:
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

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
                <span className="text-primary-light">
                  Achieve.
                </span>
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

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >

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
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Enter your Student ID"
                    autoComplete="username"
                    required
                    disabled={loading}
                    aria-invalid={Boolean(errors.studentId)}
                    aria-describedby={
                      errors.studentId
                        ? "studentId-error"
                        : undefined
                    }
                    className={`${
                      errors.studentId
                        ? "border-red-500"
                        : "border-border-light"
                    } w-full rounded-input border border-border bg-surface py-3 pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-4 focus:ring-primary-light/50 disabled:opacity-60`}
                  />
                </div>

                {errors.studentId && (
                  <p
                    id="studentId-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.studentId}
                  </p>
                )}
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
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password
                        ? "password-error"
                        : undefined
                    }
                    className={`${
                      errors.password
                        ? "border-red-500"
                        : "border-border"
                    } w-full rounded-input border bg-surface py-3 pl-11 pr-16 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-4 focus:ring-primary-light/50 disabled:opacity-60`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-body transition hover:text-primary-dark disabled:opacity-60"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* MESSAGE */}

              {errors.general && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-input border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {errors.general}
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