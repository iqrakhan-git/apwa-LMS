

// Update these paths according to your project
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState } from "react";

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
    { label: "Full Name", name: "fullName", type: "text" },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Phone Number", name: "phone", type: "tel" },
    { label: "Date of Birth", name: "dateOfBirth", type: "date" },
    { label: "Gender", name: "gender", type: "text" },
    { label: "Address", name: "address", type: "text" },
  ];

  const academicFields = [
    { label: "Student ID", name: "studentId" },
    { label: "Department", name: "department" },
    { label: "Current Semester", name: "semester" },
    { label: "Enrollment Year", name: "enrollmentYear" },
  ];

  const renderField = (field, editable = true) => (
    <div key={field.name} className="space-y-2">
      <label className="block text-sm font-medium text-gray-500">
        {field.label}
      </label>

      {isEditing && editable ? (
        <input
          type={field.type || "text"}
          name={field.name}
          value={profile[field.name]}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      ) : (
        <div className="min-h-[46px] rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800">
          {profile[field.name] || "Not provided"}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F5F7F5]">

      {/* Existing Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="min-w-0 flex-1">

        {/* Existing Navbar */}
        <Navbar />

        <main className="space-y-6 p-4 ml-70 sm:p-6 lg:p-8">

          {/* Page Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Student Portal / Account
              </p>
              <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                My Profile
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Manage your personal and academic information.
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-xl bg-[#155E45] px-5 py-3 text-sm font-semibold text-white hover:bg-[#104B37]"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl bg-[#155E45] px-5 py-3 text-sm font-semibold text-white"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Profile Header */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="h-32 bg-gradient-to-r from-[#155E45] to-[#2D9970]" />

            <div className="px-5 pb-6 sm:px-8">
              <div className="-mt-12 flex flex-wrap items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#E1F2E9] text-3xl font-bold text-[#155E45]">
                  {profile.fullName
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="pb-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {profile.fullName}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {profile.department}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Active Student
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {personalFields.map((field) => renderField(field))}
            </div>
          </section>

          {/* Academic Information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Academic Information
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {academicFields.map((field) => renderField(field, false))}
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Contact your administrator to update academic details.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
};

export default MyProfile;