import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import {
  UserRound,
  GraduationCap,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  IdCard,
  BookOpen,
  Pencil,
  Save,
  X,
  ShieldCheck,
} from "lucide-react";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Muhammad Ahmed",
    studentId: "STU-2026-001",
    email: "ahmed@student.com",
    phone: "+92 300 1234567",
    dateOfBirth: "2005-05-15",
    gender: "Male",
    department: "Computer Science",
    semester: "5th Semester",
    enrollmentYear: "2024",
    address: "Hyderabad, Sindh, Pakistan",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const personalFields = [
    { label: "Full Name", name: "fullName", type: "text", icon: UserRound },
    { label: "Email Address", name: "email", type: "email", icon: Mail },
    { label: "Phone Number", name: "phone", type: "tel", icon: Phone },
    {
      label: "Date of Birth",
      name: "dateOfBirth",
      type: "date",
      icon: CalendarDays,
    },
    { label: "Gender", name: "gender", type: "text", icon: UserRound },
    { label: "Address", name: "address", type: "text", icon: MapPin },
  ];

  const academicFields = [
    { label: "Student ID", name: "studentId", icon: IdCard },
    { label: "Department", name: "department", icon: GraduationCap },
    { label: "Current Semester", name: "semester", icon: BookOpen },
    { label: "Enrollment Year", name: "enrollmentYear", icon: CalendarDays },
  ];

  const renderField = (field, editable = true) => {
    const Icon = field.icon;

    return (
      <div key={field.name} className="space-y-2">
        <label className="block text-sm font-semibold text-heading">
          {field.label}
        </label>

        {isEditing && editable ? (
          <div className="relative">
            <Icon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
            />

            <input
              type={field.type || "text"}
              name={field.name}
              value={profile[field.name]}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        ) : (
          <div className="flex min-h-[48px] items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition hover:border-primary/30">
            <Icon size={18} className="shrink-0 text-primary" />
            <span className="break-words text-sm font-medium text-heading">
              {profile[field.name] || "Not provided"}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="min-w-0 ml-64 flex-1">
        <Navbar />

        <main className=" space-y-7 p-4 sm:p-6 lg:p-8">

          {/* Page Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <UserRound size={16} />
                Student Portal / Account
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
                My Profile
              </h1>

              <p className="mt-2 text-sm text-muted">
                Manage your personal and academic information.
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                <Pencil size={17} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted transition hover:bg-primary/5"
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-primary-dark"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Profile Header */}
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="relative h-36 overflow-hidden bg-gradient-to-r from-sidebar via-primary-dark to-secondary sm:h-44">
              <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
              <div className="absolute -bottom-24 right-1/3 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute bottom-5 left-6 text-white/80 sm:left-9">
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Student Account
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Your personal profile overview
                </p>
              </div>
            </div>

            <div className="px-5 pb-6 sm:px-8">
              <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-wrap items-end gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-card bg-primary/10 text-3xl font-extrabold text-primary shadow-md sm:h-28 sm:w-28 sm:text-4xl">
                    {profile.fullName
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div className="pb-1">
                    <h2 className="text-xl font-bold text-heading sm:text-2xl">
                      {profile.fullName}
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                      {profile.department}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <ShieldCheck size={14} />
                        Active Student
                      </span>

                      <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
                        {profile.studentId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                  <p className="text-xs font-medium text-muted">
                    Current Semester
                  </p>
                  <p className="mt-1 text-sm font-bold text-primary">
                    {profile.semester}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserRound size={21} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-heading">
                  Personal Information
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Your basic personal details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {personalFields.map((field) => renderField(field))}
            </div>
          </section>

          {/* Academic Information */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <GraduationCap size={22} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-heading">
                  Academic Information
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Your education and enrollment details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {academicFields.map((field) => renderField(field, false))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <ShieldCheck size={19} className="mt-0.5 shrink-0 text-primary" />

              <p className="text-sm leading-6 text-muted">
                Academic information is managed by your institution.
                Contact your administrator if you need to update these details.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default MyProfile;