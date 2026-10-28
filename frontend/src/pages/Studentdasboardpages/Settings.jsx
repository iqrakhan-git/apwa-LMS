
import { useState } from "react";
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
      <div className="rounded-xl bg-green-50 p-3 text-[#145c3b]">
        <Icon size={21} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-gray-500">
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
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
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
          checked ? "bg-[#145c3b]" : "bg-gray-300"
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

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#145c3b] focus:ring-2 focus:ring-green-100"
      />
    </label>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("Profile");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const updateSetting = (key, value) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  };

  const resetSettings = () => {
    setSettings(initialSettings);
    setSaved(false);
  };

  const saveSettings = (event) => {
    event.preventDefault();

    // Demo only: persist settings through your backend/API in production.
    setSaved(true);
  };

  const changePassword = (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setPasswordMessage("Password must be at least 8 characters.");
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
    <div className="min-h-screen ml-70 bg-[#f6f8f6] md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="mx-auto max-w-[1500px] space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div>
            <p className="mb-2 text-sm text-gray-500">
              Student Portal / Account
            </p>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Settings
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your account preferences and personal information.
            </p>
          </div>

          {/* Save status */}
          {saved && (
            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              <CheckCircle2 size={20} />
              <span>
                Settings updated in this session. Connect an API to save
                changes permanently.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Settings Sidebar */}
            <aside className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
              <div className="px-3 pb-4 pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
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
                        ? "bg-[#145c3b] text-white shadow-sm"
                        : "text-gray-600 hover:bg-green-50 hover:text-[#145c3b]"
                    }`}
                  >
                    <Icon size={19} />
                    {name}
                  </button>
                ))}
              </nav>

              <div className="mt-5 rounded-xl bg-[#f5f8f5] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <LockKeyhole size={17} className="text-[#145c3b]" />
                  Account Security
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Keep your profile information current and protect your
                  account.
                </p>
              </div>
            </aside>

            {/* Settings Content */}
            <form onSubmit={saveSettings} className="space-y-6">
              {/* Profile */}
              {activeTab === "Profile" && (
                <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                  <SectionTitle
                    icon={UserRound}
                    title="Profile Information"
                    description="Update your personal details and contact information."
                  />

                  <div className="mb-7 flex flex-col items-start gap-4 rounded-xl bg-[#f8faf8] p-4 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-[#145c3b]">
                      <UserRound size={36} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Profile Details
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Your student information is displayed here.
                      </p>
                      <p className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-gray-400">
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

              {/* Notifications */}
              {activeTab === "Notifications" && (
                <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                  <SectionTitle
                    icon={Bell}
                    title="Notification Preferences"
                    description="Choose which updates you want to receive."
                  />

                  <div className="divide-y divide-gray-100">
                    <Toggle
                      label="Email Notifications"
                      description="Receive important portal updates by email."
                      checked={settings.emailNotifications}
                      onChange={(v) => updateSetting("emailNotifications", v)}
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
                      onChange={(v) => updateSetting("gradeNotifications", v)}
                    />
                  </div>
                </section>
              )}

              {/* Appearance */}
              {activeTab === "Appearance" && (
                <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                  <SectionTitle
                    icon={Palette}
                    title="Appearance"
                    description="Choose your preferred portal appearance."
                  />

                  <p className="mb-3 text-sm font-medium text-gray-700">
                    Color Theme
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        name: "Light",
                        bg: "bg-white",
                        panel: "bg-gray-100",
                      },
                      {
                        name: "Dark",
                        bg: "bg-gray-800",
                        panel: "bg-gray-600",
                      },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        type="button"
                        onClick={() => updateSetting("theme", theme.name)}
                        className={`rounded-2xl border-2 p-4 text-left transition ${
                          settings.theme === theme.name
                            ? "border-[#145c3b] bg-green-50/50"
                            : "border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`h-24 rounded-xl border border-gray-200 p-3 ${theme.bg}`}
                        >
                          <div className={`h-3 w-1/2 rounded ${theme.panel}`} />
                          <div className="mt-3 flex gap-2">
                            <div className={`h-10 w-1/3 rounded ${theme.panel}`} />
                            <div className={`h-10 flex-1 rounded ${theme.panel}`} />
                          </div>
                        </div>
                        <p className="mt-3 font-semibold text-gray-800">
                          {theme.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {theme.name === "Light"
                            ? "Clean and bright interface"
                            : "Dark background appearance"}
                        </p>
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-800">
                    Theme selection is stored in the form state. Apply it to
                    the entire portal using a shared theme provider to change
                    the actual interface.
                  </p>
                </section>
              )}

              {/* Language */}
              {activeTab === "Language" && (
                <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                  <SectionTitle
                    icon={Globe}
                    title="Language Preferences"
                    description="Choose the language you prefer for the portal."
                  />

                  <label className="block max-w-lg">
                    <span className="mb-2 block text-sm font-medium text-gray-700">
                      Portal Language
                    </span>
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        updateSetting("language", e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#145c3b]"
                    >
                      <option value="English">English</option>
                      <option value="Urdu">Urdu</option>
                    </select>
                  </label>

                  <div className="mt-5 rounded-xl bg-[#f5f8f5] p-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Selected Language
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {settings.language}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      A translation system is needed to change the language
                      across all portal pages.
                    </p>
                  </div>
                </section>
              )}

              {/* Security */}
              {activeTab === "Security" && (
                <>
                  <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                    <SectionTitle
                      icon={ShieldCheck}
                      title="Security Settings"
                      description="Manage your password and account protection."
                    />

                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-green-50 p-4">
                      <LockKeyhole
                        size={20}
                        className="mt-0.5 shrink-0 text-[#145c3b]"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          Protect your account
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-600">
                          Use a strong, unique password and never share it
                          with anyone.
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={changePassword}
                      className="space-y-5"
                    >
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-gray-700">
                          New Password
                        </span>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none focus:border-[#145c3b]"
                          />
                          <button
                            type="button"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                        <p
                          aria-live="polite"
                          className="text-sm text-gray-600"
                        >
                          {passwordMessage}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="rounded-xl bg-[#145c3b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#10492f]"
                      >
                        Validate Password
                      </button>
                    </form>
                  </section>

                  <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  <RotateCcw size={17} />
                  Reset
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#145c3b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#10492f]"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <p className="pb-2 text-center text-xs text-gray-400">
            Student Portal · Account Settings
          </p>
        </main>
      </div>
    </div>
  );
}
