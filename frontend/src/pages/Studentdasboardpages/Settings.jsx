
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
  UserRound,
  Bell,
  ShieldCheck,
  Palette,
  Globe,
  LockKeyhole,
  Camera,
  Save,
  RotateCcw,
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle2,
  Sun,
  Moon,
} from "lucide-react";

const initialSettings = {
  fullName: "Muhammad Ahmed",
  email: "student@university.edu",
  phone: "",
  studentId: "STU-2026-001",
  department: "Computer Science",
  language: "English",
  theme: "Light",
  emailNotifications: true,
  announcementNotifications: true,
  assignmentNotifications: true,
  gradeNotifications: false,
  twoFactor: false,
};

function SectionTitle({ icon: Icon, title, description }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="rounded-xl bg-primary/10 p-3 text-primary">
        <Icon size={21} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-heading">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold text-heading">{label}</p>
        <p className="mt-1 text-xs leading-5 text-muted">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-primary" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-heading">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
      />
    </label>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState(() => ({
    ...initialSettings,
    theme:
      localStorage.getItem("theme") === "dark" ? "Dark" : "Light",
  }));

  const [activeTab, setActiveTab] = useState("Profile");
  const [saved, setSaved] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Apply theme automatically
  useEffect(() => {
    const isDark = settings.theme === "Dark";

    document.documentElement.classList.toggle("dark", isDark);

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );
  }, [settings.theme]);

  // Update settings
  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  };

  // Reset settings
  const resetSettings = () => {
    setSettings({
      ...initialSettings,
      theme: "Light",
    });

    setSaved(false);
    setPassword("");
    setConfirmPassword("");
    setPasswordMessage("");
  };

  // Save settings
  const saveSettings = (event) => {
    event.preventDefault();

    // Demo only: connect your backend/API for permanent profile saving.
    setSaved(true);
  };

  // Change password validation
  const changePassword = (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setPasswordMessage(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMessage("Passwords do not match.");
      return;
    }

    setPasswordMessage(
      "Password validated. Connect your backend to update it securely."
    );
  };

  const tabs = [
    { name: "Profile", icon: UserRound },
    { name: "Notifications", icon: Bell },
    { name: "Appearance", icon: Palette },
    { name: "Language", icon: Globe },
    { name: "Security", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-background md:flex">
      <Sidebar />

      <div className="ml-64 min-w-0 flex-1">
        <Navbar />

        <main className="mx-auto max-w-[1500px] space-y-7 p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <div>
            <p className="mb-2 text-sm text-muted">
              Student Portal / Account
            </p>

            <h1 className="text-2xl font-bold text-heading sm:text-3xl">
              Settings
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage your account preferences and personal information.
            </p>
          </div>

          {/* Save Status */}
          {saved && (
            <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm text-primary">
              <CheckCircle2 size={20} />

              <span>
                Settings updated in this session. Connect an API to save
                changes permanently.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

            {/* Settings Sidebar */}
            <aside className="rounded-2xl border border-border bg-card p-3 shadow-sm">
              <div className="px-3 pb-4 pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Account Preferences
                </p>
              </div>

              <nav className="space-y-1">
                {tabs.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActiveTab(name)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                      activeTab === name
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <Icon size={19} />
                    {name}
                  </button>
                ))}
              </nav>

              <div className="mt-5 rounded-xl bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-heading">
                  <LockKeyhole size={17} className="text-primary" />
                  Account Security
                </div>

                <p className="mt-2 text-xs leading-5 text-muted">
                  Keep your profile information current and protect your
                  account.
                </p>
              </div>
            </aside>

            {/* Settings Content */}
            <form onSubmit={saveSettings} className="space-y-6">

              {/* PROFILE */}
              {activeTab === "Profile" && (
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
                  <SectionTitle
                    icon={UserRound}
                    title="Profile Information"
                    description="Update your personal details and contact information."
                  />

                  <div className="mb-7 flex flex-col items-start gap-4 rounded-xl bg-primary/5 p-4 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <UserRound size={36} />
                    </div>

                    <div>
                      <p className="font-semibold text-heading">
                        Profile Details
                      </p>

                      <p className="mt-1 text-xs text-muted">
                        Your student information is displayed here.
                      </p>

                      <p className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-muted">
                        <Camera size={14} />
                        Profile photo upload can be added later.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      label="Full Name"
                      value={settings.fullName}
                      onChange={(e) =>
                        updateSetting("fullName", e.target.value)
                      }
                      placeholder="Enter your full name"
                    />

                    <Field
                      label="Email Address"
                      value={settings.email}
                      onChange={(e) =>
                        updateSetting("email", e.target.value)
                      }
                      placeholder="Enter your email"
                      type="email"
                    />

                    <Field
                      label="Phone Number"
                      value={settings.phone}
                      onChange={(e) =>
                        updateSetting("phone", e.target.value)
                      }
                      placeholder="Enter your phone number"
                      type="tel"
                    />

                    <Field
                      label="Student ID"
                      value={settings.studentId}
                      onChange={(e) =>
                        updateSetting("studentId", e.target.value)
                      }
                      placeholder="Student ID"
                    />

                    <div className="sm:col-span-2">
                      <Field
                        label="Department"
                        value={settings.department}
                        onChange={(e) =>
                          updateSetting("department", e.target.value)
                        }
                        placeholder="Enter your department"
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === "Notifications" && (
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
                  <SectionTitle
                    icon={Bell}
                    title="Notification Preferences"
                    description="Choose which updates you want to receive."
                  />

                  <div className="divide-y divide-border">
                    <Toggle
                      label="Email Notifications"
                      description="Receive important portal updates by email."
                      checked={settings.emailNotifications}
                      onChange={(v) =>
                        updateSetting("emailNotifications", v)
                      }
                    />

                    <Toggle
                      label="Announcements"
                      description="Get notified about university news and notices."
                      checked={settings.announcementNotifications}
                      onChange={(v) =>
                        updateSetting("announcementNotifications", v)
                      }
                    />

                    <Toggle
                      label="Assignment Reminders"
                      description="Receive reminders about assignments and deadlines."
                      checked={settings.assignmentNotifications}
                      onChange={(v) =>
                        updateSetting("assignmentNotifications", v)
                      }
                    />

                    <Toggle
                      label="Grade Updates"
                      description="Get updates when new grades are published."
                      checked={settings.gradeNotifications}
                      onChange={(v) =>
                        updateSetting("gradeNotifications", v)
                      }
                    />
                  </div>
                </section>
              )}

              {/* APPEARANCE */}
              {activeTab === "Appearance" && (
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
                  <SectionTitle
                    icon={Palette}
                    title="Appearance"
                    description="Choose your preferred portal appearance."
                  />

                  <p className="mb-4 text-sm font-semibold text-heading">
                    Select Your Theme
                  </p>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* Light Mode */}
                    <button
                      type="button"
                      onClick={() => updateSetting("theme", "Light")}
                      className={`rounded-2xl border-2 p-4 text-left transition ${
                        settings.theme === "Light"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="h-28 overflow-hidden rounded-xl border border-gray-200 bg-white p-3">
                        <div className="mb-3 h-3 w-1/2 rounded bg-purple-200" />

                        <div className="flex gap-2">
                          <div className="h-14 w-1/3 rounded bg-purple-100" />
                          <div className="h-14 flex-1 rounded bg-gray-100" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="flex items-center gap-2 font-semibold text-heading">
                          <Sun size={18} className="text-primary" />
                          Light Mode
                        </span>

                        {settings.theme === "Light" && (
                          <CheckCircle2 size={20} className="text-primary" />
                        )}
                      </div>

                      <p className="mt-1 text-xs text-muted">
                        Clean and bright appearance.
                      </p>
                    </button>

                    {/* Dark Mode */}
                    <button
                      type="button"
                      onClick={() => updateSetting("theme", "Dark")}
                      className={`rounded-2xl border-2 p-4 text-left transition ${
                        settings.theme === "Dark"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="h-28 overflow-hidden rounded-xl border border-gray-700 bg-gray-900 p-3">
                        <div className="mb-3 h-3 w-1/2 rounded bg-purple-500" />

                        <div className="flex gap-2">
                          <div className="h-14 w-1/3 rounded bg-gray-700" />
                          <div className="h-14 flex-1 rounded bg-gray-800" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="flex items-center gap-2 font-semibold text-heading">
                          <Moon size={18} className="text-primary" />
                          Dark Mode
                        </span>

                        {settings.theme === "Dark" && (
                          <CheckCircle2 size={20} className="text-primary" />
                        )}
                      </div>

                      <p className="mt-1 text-xs text-muted">
                        Comfortable dark appearance.
                      </p>
                    </button>
                  </div>

                  <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm font-semibold text-heading">
                      Current Theme: {settings.theme}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      Your selected theme is automatically applied and saved.
                    </p>
                  </div>
                </section>
              )}

              {/* LANGUAGE */}
              {activeTab === "Language" && (
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
                  <SectionTitle
                    icon={Globe}
                    title="Language Preferences"
                    description="Choose the language you prefer for the portal."
                  />

                  <label className="block max-w-lg">
                    <span className="mb-2 block text-sm font-medium text-heading">
                      Portal Language
                    </span>

                    <select
                      value={settings.language}
                      onChange={(e) =>
                        updateSetting("language", e.target.value)
                      }
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-heading outline-none focus:border-primary"
                    >
                      <option value="English">English</option>
                      <option value="Urdu">Urdu</option>
                      <option value="Sindhi">Sindhi</option>
                    </select>
                  </label>

                  <div className="mt-5 rounded-xl bg-primary/5 p-4">
                    <p className="text-sm font-semibold text-heading">
                      Selected Language
                    </p>

                    <p className="mt-1 text-sm text-muted">
                      {settings.language}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-muted">
                      A translation system is needed to change the language
                      across all portal pages.
                    </p>
                  </div>
                </section>
              )}

              {/* SECURITY */}
              {activeTab === "Security" && (
                <>
                  <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
                    <SectionTitle
                      icon={ShieldCheck}
                      title="Security Settings"
                      description="Manage your password and account protection."
                    />

                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-primary/10 p-4">
                      <LockKeyhole
                        size={20}
                        className="mt-0.5 shrink-0 text-primary"
                      />

                      <div>
                        <p className="text-sm font-semibold text-heading">
                          Protect your account
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted">
                          Use a strong, unique password and never share it
                          with anyone.
                        </p>
                      </div>
                    </div>

                    {/* Password Form */}
                    <div className="space-y-5">
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-heading">
                          New Password
                        </span>

                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-12 text-sm text-heading outline-none focus:border-primary"
                          />

                          <button
                            type="button"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                          >
                            {showPassword ? (
                              <EyeOff size={19} />
                            ) : (
                              <Eye size={19} />
                            )}
                          </button>
                        </div>
                      </label>

                      <Field
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />

                      {passwordMessage && (
                        <p aria-live="polite" className="text-sm text-muted">
                          {passwordMessage}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={changePassword}
                        className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
                      >
                        Validate Password
                      </button>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
                    <SectionTitle
                      icon={Smartphone}
                      title="Two-Factor Authentication"
                      description="Add an extra layer of account security."
                    />

                    <Toggle
                      label="Enable two-factor authentication"
                      description="Enable this option when a verified authentication service is connected."
                      checked={settings.twoFactor}
                      onChange={(v) => updateSetting("twoFactor", v)}
                    />
                  </section>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetSettings}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-muted transition hover:bg-primary/5"
                >
                  <RotateCcw size={17} />
                  Reset
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <p className="pb-2 text-center text-xs text-muted">
            Student Portal · Account Settings
          </p>
        </main>
      </div>
    </div>
  );
}
