import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LockKeyhole,
  ArrowRight,
  ContactRound,
} from "lucide-react";

/*
 * Frontend-only demo authentication object.
 * Accounts are stored in this browser's localStorage.
 * This is NOT secure for production because browser storage can be edited.
 */
const auth = {
  storageKey: "apwa_lms_users",
  sessionKey: "apwa_lms_current_user",

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    } catch {
      return [];
    }
  },

  async signup({ teacherID, password, name = "teacher" }) {
    const users = this.getUsers();
    const normalizedId = teacherID.trim().toLowerCase();

    if (users.some((user) => user.teacherID.toLowerCase() === normalizedId)) {
      return { success: false, error: "This teacher ID already exists." };
    }

    const user = {
      teacherID: teacherID.trim(),
      password,
      name,
      role: "teacher",
    };

    localStorage.setItem(this.storageKey, JSON.stringify([...users, user]));
    return { success: true, user: { teacherID: user.teacherID, name: user.name, role: user.role } };
  },

  async login(teacherID, password) {
    const normalizedId = teacherID.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find(
      (item) =>
        item.teacherID.toLowerCase() === normalizedId &&
        item.password === password
    );

    // Demo-only account so you can test the page immediately.
    // Replace this with a real backend before using the site with real teachers.
    const isDemoAccount =
      normalizedId === "apwa123t" && password === "teacher@123";

    if (!user && !isDemoAccount) {
      return { success: false, error: "invalid-credentials" };
    }

    const safeUser = user
      ? { teacherID: user.teacherID, name: user.name, role: user.role || "teacher" }
      : { teacherID: "APWA123T", name: "Demo teacher", role: "teacher" };

    localStorage.setItem(this.sessionKey, JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(this.sessionKey) || "null");
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return Boolean(this.getCurrentUser());
  },

  getRole() {
    return this.getCurrentUser()?.role || null;
  },

  logout() {
    localStorage.removeItem(this.sessionKey);
  },
};

function LoginT() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teacherID: "",
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

    if (!formData.teacherID.trim()) {
      newErrors.teacherID = "teacher ID is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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
      const result = await auth.login(
        formData.teacherID,
        formData.password
      );

      if (result.success) {
        navigate("/teacher/dashboard");
      } else {
        setErrors({
          general: "teacher ID or password is incorrect.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        general: "Something went wrong. Please try again.",
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
      <div className="grid min-h-[650px] border border-border w-full max-w-6xl grid-cols-1 overflow-hidden rounded-2xl bg-surface shadow-elevated lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div
          className="relative  min-h-[280px] bg-cover bg-center lg:min-h-[650px]"
          style={{
            backgroundImage:
              "url('https://www.teachrity.com/assets/ForTeachers/micromacro_hero.png')",
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
                  teacher Portal
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
                Teach.
                <br />
                Inspire.
                <br />
                <span className="text-primary-light">
                 Empower.
                </span>
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/85 sm:text-base">
                Sign in to manage your classroom, monitor student progress, and make every lesson count.
              </p>

              <div className="mt-7 flex items-center gap-2">
                <div className="h-1 w-12 rounded-full bg-primary-light" />
                <div className="h-1 w-5 rounded-full bg-white/40" />
                <div className="h-1 w-5 rounded-full bg-white/40" />
              </div>
            </div>

            {/* Footer */}

            <div className="hidden items-center justify-between gap-4 border-t border-white/20 pt-5 text-xs text-white/70 lg:flex">
              <p>Empowering teachers every day.</p>
              <p>© 2026 teacher Portal</p>
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
                Login to your teacher account
              </p>
            </div>

            {/* Login Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >

              {/* teacher ID */}

              <div>
                <label
                  htmlFor="teacherID"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  teacher ID
                </label>

                <div className="relative">
                  <ContactRound
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-body"
                  />

                  <input
                    id="teacherID"
                    type="text"
                    name="teacherID"
                    value={formData.teacherID}
                    onChange={handleChange}
                    placeholder="Enter your teacher ID"
                    autoComplete="username"
                    required
                    disabled={loading}
                    aria-invalid={Boolean(errors.teacherID)}
                    aria-describedby={
                      errors.teacherID
                        ? "teacherID-error"
                        : undefined
                    }
                    className={`${
                      errors.teacherID
                        ? "border-red-500"
                        : "border-border-light"
                    } w-full rounded-input border border-border bg-surface py-3 pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-body focus:border-primary focus:ring-4 focus:ring-primary-light/50 disabled:opacity-60`}
                  />
                </div>

                {errors.teacherID && (
                  <p
                    id="teacherID-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.teacherID}
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
              © 2026 teacher Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginT;