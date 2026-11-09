
import { useEffect, useState } from "react";

import {
   BookOpen,
  Users,
  GraduationCap,
  Search,
  Bell,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Trash2,
} from "lucide-react";

import { initializeApp, getApps } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  deleteUser,
} from "firebase/auth";

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import firebaseConfig, { db } from "../../firebase/config";
import Sidebar2 from "../../components/Sidebar2";

/*
|--------------------------------------------------------------------------
| Secondary Firebase Authentication
|--------------------------------------------------------------------------
*/

const secondaryAppName = "student-registration-app";

const existingSecondaryApp = getApps().find(
  (firebaseApp) => firebaseApp.name === secondaryAppName
);

const studentRegistrationApp =
  existingSecondaryApp ||
  initializeApp(firebaseConfig, secondaryAppName);

const studentRegistrationAuth = getAuth(
  studentRegistrationApp
);

/*
|--------------------------------------------------------------------------
| Sidebar Menu
|--------------------------------------------------------------------------
*/



const classOptions = [
  "CS-101",
  "CS-102",
  "CS-103",
  "CS-104",
];

const emptyForm = {
  name: "",
  studentId: "",
  email: "",
  password: "",
  class: "CS-101",
};

/*
|--------------------------------------------------------------------------
| Main Component
|--------------------------------------------------------------------------
*/

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] =
    useState("All Classes");

  const [currentPage, setCurrentPage] = useState(1);

  const [showSignup, setShowSignup] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const [studentForm, setStudentForm] = useState(emptyForm);

  const pageSize = 6;

  /*
  |--------------------------------------------------------------------------
  | Fetch Students from Firestore
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    async function fetchStudents() {
      setLoading(true);

      try {
        const studentsRef = collection(db, "students");

        const studentsQuery = query(
          studentsRef,
          orderBy("name")
        );

        const snapshot = await getDocs(studentsQuery);

        const firebaseStudents = snapshot.docs.map(
          (studentDoc) => {
            const data = studentDoc.data();

            return {
              id: data.studentId || studentDoc.id,
              uid: data.uid || "",
              name: data.name || "",
              email: data.email || "",
              class: data.class || "CS-101",
              status: data.status || "Active",
              avatar: data.avatar || 47,
              createdAt: data.createdAt || null,
            };
          }
        );

        if (!cancelled) {
          setStudents(firebaseStudents);
        }
      } catch (error) {
        console.error("Error loading students:", error);

        if (!cancelled) {
          alert(
            "Unable to load students. Check your Firestore configuration and security rules."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchStudents();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Search and Class Filter
  |--------------------------------------------------------------------------
  */

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.id.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText);

    const matchesClass =
      selectedClass === "All Classes" ||
      student.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / pageSize)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex = (safeCurrentPage - 1) * pageSize;

  const visibleStudents = filteredStudents.slice(
    startIndex,
    startIndex + pageSize
  );

  /*
  |--------------------------------------------------------------------------
  | Form Input Handler
  |--------------------------------------------------------------------------
  */

  function handleFormChange(event) {
    const { name, value } = event.target;

    setStudentForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  /*
  |--------------------------------------------------------------------------
  | Create Student: Firebase Authentication + Firestore
  |--------------------------------------------------------------------------
  */

  async function addStudent(event) {
    event.preventDefault();

    if (submitting) return;

    const name = studentForm.name.trim();
    const studentId = studentForm.studentId.trim();
    const email = studentForm.email.trim().toLowerCase();
    const password = studentForm.password;
    const studentClass = studentForm.class;

    if (!name || !studentId || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (studentId.includes("/")) {
      alert("Student ID cannot contain a forward slash (/).");
      return;
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    const duplicateStudent = students.some(
      (student) =>
        student.id.toLowerCase() === studentId.toLowerCase() ||
        student.email.toLowerCase() === email
    );

    if (duplicateStudent) {
      alert("This Student ID or email already exists.");
      return;
    }

    setSubmitting(true);

    let createdUser = null;
    let firestoreSaved = false;

    try {
      const studentRef = doc(db, "students", studentId);

      const existingStudent = await getDoc(studentRef);

      if (existingStudent.exists()) {
        alert("This Student ID already exists.");
        return;
      }

      /*
       * Create account using secondary Firebase Authentication.
       */

      const credential = await createUserWithEmailAndPassword(
        studentRegistrationAuth,
        email,
        password
      );

      createdUser = credential.user;

      await updateProfile(createdUser, {
        displayName: name,
      });

      /*
       * Save student profile in Firestore.
       */

      await setDoc(studentRef, {
        uid: createdUser.uid,
        studentId,
        name,
        email,
        class: studentClass,
        status: "Active",
        avatar: 47,
        role: "student",
        createdAt: serverTimestamp(),
      });

      firestoreSaved = true;

      const newStudent = {
        id: studentId,
        uid: createdUser.uid,
        name,
        email,
        class: studentClass,
        status: "Active",
        avatar: 47,
      };

      setStudents((previousStudents) =>
        [...previousStudents, newStudent].sort(
          (a, b) => a.name.localeCompare(b.name)
        )
      );

      setSearch("");
      setSelectedClass("All Classes");
      setCurrentPage(1);

      setStudentForm(emptyForm);
      setShowSignup(false);

      alert("Student account created successfully!");
    } catch (error) {
      console.error("Student creation error:", error);

      if (createdUser && !firestoreSaved) {
        try {
          await deleteUser(createdUser);
        } catch (cleanupError) {
          console.error(
            "Could not clean up the Auth account:",
            cleanupError
          );
        }
      }

      const errorMessages = {
        "auth/email-already-in-use":
          "This email already has a Firebase Authentication account.",

        "auth/invalid-email":
          "Please enter a valid email address.",

        "auth/weak-password":
          "Please choose a stronger password.",

        "auth/operation-not-allowed":
          "Enable Email/Password in Firebase Authentication settings.",

        "auth/network-request-failed":
          "Network error. Check your internet connection.",

        "permission-denied":
          "Firestore permission denied. Check your Firestore rules.",

        "permission-denied: Missing or insufficient permissions.":
          "Firestore permission denied. Check your Firestore rules.",
      };

      alert(
        errorMessages[error.code] ||
          error.message ||
          "Could not create the student account."
      );
    } finally {
      try {
        if (studentRegistrationAuth.currentUser) {
          await signOut(studentRegistrationAuth);
        }
      } catch (signOutError) {
        console.error(
          "Secondary Auth sign-out error:",
          signOutError
        );
      }

      setSubmitting(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Student from Firestore
  |--------------------------------------------------------------------------
  */

  async function deleteStudent(studentId) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this student?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "students", studentId));

      const updatedStudents = students.filter(
        (student) => student.id !== studentId
      );

      setStudents(updatedStudents);
      setActiveMenu(null);

      if (selectedStudent?.id === studentId) {
        setSelectedStudent(null);
        setShowDetails(false);
      }

      const updatedTotalPages = Math.max(
        1,
        Math.ceil(
          updatedStudents.filter((student) => {
            const searchText = search.toLowerCase().trim();

            const matchesSearch =
              student.name.toLowerCase().includes(searchText) ||
              student.id.toLowerCase().includes(searchText) ||
              student.email.toLowerCase().includes(searchText);

            const matchesClass =
              selectedClass === "All Classes" ||
              student.class === selectedClass;

            return matchesSearch && matchesClass;
          }).length / pageSize
        )
      );

      setCurrentPage((page) =>
        Math.min(page, updatedTotalPages)
      );

      alert("Student record deleted from Firestore.");
    } catch (error) {
      console.error("Delete student error:", error);

      alert(
        "Could not delete the student. Check your Firestore permissions."
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Open Student Details
  |--------------------------------------------------------------------------
  */

  function openStudentDetails(student) {
    setSelectedStudent(student);
    setShowDetails(true);
    setActiveMenu(null);
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-background text-heading">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}

       <Sidebar2/>

        {/* MAIN CONTENT */}

        <main className="min-w-0 w-full flex-1 md:ml-64">
          {/* PAGE BODY */}

          <section className="w-full min-w-0 p-3 sm:p-6 lg:p-8">

            {/* PAGE HEADING */}

            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-xl font-bold text-heading sm:text-2xl">
                  Student Management
                </h1>

                <p className="mt-1 text-sm text-muted">
                  View, search, and manage student records.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStudentForm(emptyForm);
                  setShowSignup(true);
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark sm:w-auto"
              >
                <Plus size={19} />
                Add Student
              </button>
            </div>

            {/* STATISTICS */}

            <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">

              {/* Total Students */}

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">
                      Total Students
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-heading">
                      {students.length}
                    </h3>
                  </div>

                  <div className="rounded-xl bg-purple-100 p-3 text-primary">
                    <Users size={24} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-muted">
                  Registered student profiles
                </p>
              </div>

              {/* Active Students */}

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">
                      Active Students
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-heading">
                      {
                        students.filter(
                          (student) =>
                            student.status === "Active"
                        ).length
                      }
                    </h3>
                  </div>

                  <div className="rounded-xl bg-purple-100 p-3 text-primary">
                    <GraduationCap size={24} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-muted">
                  Students marked as active
                </p>
              </div>

              {/* Classes */}

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:col-span-2 xl:col-span-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">
                      Classes
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-heading">
                      {
                        new Set(
                          students.map(
                            (student) => student.class
                          )
                        ).size
                      }
                    </h3>
                  </div>

                  <div className="rounded-xl bg-purple-100 p-3 text-primary">
                    <BookOpen size={24} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-muted">
                  Classes with registered students
                </p>
              </div>
            </div>

            {/* STUDENT TABLE CARD */}

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

              {/* TABLE FILTERS */}

              <div className="flex flex-col gap-4 border-b border-border p-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-heading">
                    All Students
                  </h3>

                  <p className="mt-1 text-sm text-muted">
                    {filteredStudents.length} student
                    {filteredStudents.length !== 1 ? "s" : ""}{" "}
                    found
                  </p>
                </div>

                <div className="flex min-w-0 flex-col gap-3 sm:flex-row">

                  {/* Search */}

                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search students..."
                      className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-purple-100 sm:w-64"
                    />
                  </div>

                  {/* Class Filter */}

                  <select
                    value={selectedClass}
                    onChange={(event) => {
                      setSelectedClass(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-purple-100 sm:w-auto"
                  >
                    <option value="All Classes">
                      All Classes
                    </option>

                    {classOptions.map((className) => (
                      <option
                        key={className}
                        value={className}
                      >
                        {className}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TABLE */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[760px] text-left">

                  <thead className="bg-background">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                        Student
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                        Student ID
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                        Class
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                        Email
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">

                    {/* Loading */}

                    {loading && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-16 text-center text-sm text-muted"
                        >
                          Loading students from Firebase...
                        </td>
                      </tr>
                    )}

                    {/* Empty State */}

                    {!loading && visibleStudents.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-16 text-center"
                        >
                          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-primary">
                            <Users size={26} />
                          </div>

                          <h4 className="font-semibold text-heading">
                            No students found
                          </h4>

                          <p className="mt-1 text-sm text-muted">
                            Add a student or change your search filters.
                          </p>
                        </td>
                      </tr>
                    )}

                    {/* Student Rows */}

                    {!loading &&
                      visibleStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="transition hover:bg-background"
                        >

                          {/* Student Name */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-primary-dark">
                                {student.name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-heading">
                                  {student.name}
                                </p>

                                <p className="mt-1 text-xs text-muted">
                                  Student
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Student ID */}

                          <td className="px-6 py-4">
                            <span className="rounded-lg bg-background px-2.5 py-1.5 text-xs font-semibold text-heading">
                              {student.id}
                            </span>
                          </td>

                          {/* Class */}

                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-700">
                              {student.class}
                            </span>
                          </td>

                          {/* Email */}

                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">
                              {student.email}
                            </span>
                          </td>

                          {/* Status */}

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                student.status === "Active"
                                  ? "bg-purple-50 text-primary"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  student.status === "Active"
                                    ? "bg-accent"
                                    : "bg-slate-400"
                                }`}
                              />

                              {student.status}
                            </span>
                          </td>

                          {/* Actions */}

                          <td className="px-6 py-4 text-right">
                            <div className="relative inline-block">
                              <button
                                type="button"
                                aria-label={`Actions for ${student.name}`}
                                onClick={() =>
                                  setActiveMenu(
                                    activeMenu === student.id
                                      ? null
                                      : student.id
                                  )
                                }
                                className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-heading"
                              >
                                <MoreVertical size={19} />
                              </button>

                              {activeMenu === student.id && (
                                <div className="absolute right-0 top-10 z-10 w-44 rounded-xl border border-border bg-card p-1.5 text-left shadow-xl">

                                  <button
                                    type="button"
                                    onClick={() =>
                                      openStudentDetails(student)
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-heading transition hover:bg-purple-50 hover:text-primary"
                                  >
                                    <Eye size={16} />
                                    View Details
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      deleteStudent(student.id)
                                    }
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                                  >
                                    <Trash2 size={16} />
                                    Delete Student
                                  </button>

                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE STUDENT CARDS */}
              <div className="space-y-3 p-3 md:hidden">
                {loading && (
                  <p className="py-10 text-center text-sm text-muted">
                    Loading students from Firebase...
                  </p>
                )}

                {!loading && visibleStudents.length === 0 && (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-primary">
                      <Users size={26} />
                    </div>
                    <h4 className="font-semibold text-heading">No students found</h4>
                    <p className="mt-1 text-sm text-muted">
                      Add a student or change your search filters.
                    </p>
                  </div>
                )}

                {!loading && visibleStudents.map((student) => (
                  <article
                    key={`mobile-${student.id}`}
                    className="relative rounded-xl border border-border bg-background p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-primary-dark">
                          {student.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-heading">
                            {student.name}
                          </p>
                          <p className="mt-1 break-all text-xs text-muted">
                            {student.email}
                          </p>
                        </div>
                      </div>

                      <div className="relative shrink-0">
                        <button
                          type="button"
                          aria-label={`Actions for ${student.name}`}
                          onClick={() => setActiveMenu(activeMenu === student.id ? null : student.id)}
                          className="rounded-lg p-2 text-muted transition hover:bg-card hover:text-heading"
                        >
                          <MoreVertical size={19} />
                        </button>
                        {activeMenu === student.id && (
                          <div className="absolute right-0 top-10 z-30 w-44 rounded-xl border border-border bg-card p-1.5 text-left shadow-xl">
                            <button
                              type="button"
                              onClick={() => openStudentDetails(student)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-heading transition hover:bg-purple-50 hover:text-primary"
                            >
                              <Eye size={16} /> View Details
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteStudent(student.id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 size={16} /> Delete Student
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">Student ID</p>
                        <p className="mt-1 break-all text-sm font-semibold text-heading">{student.id}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">Class</p>
                        <p className="mt-1 text-sm font-semibold text-heading">{student.class}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">Status</p>
                        <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${student.status === "Active" ? "bg-purple-50 text-primary" : "bg-slate-100 text-slate-600"}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${student.status === "Active" ? "bg-accent" : "bg-slate-400"}`} />
                          {student.status}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* PAGINATION */}

              <div className="flex flex-col gap-4 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  Showing{" "}
                  {filteredStudents.length === 0
                    ? 0
                    : startIndex + 1}{" "}
                  to{" "}
                  {Math.min(
                    startIndex + pageSize,
                    filteredStudents.length
                  )}{" "}
                  of {filteredStudents.length} students
                </p>

                <div className="flex max-w-full flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={safeCurrentPage <= 1}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(1, page - 1)
                      )
                    }
                    className="rounded-lg border border-border p-2 text-muted transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                        safeCurrentPage === page
                          ? "bg-primary text-white"
                          : "border border-border text-muted hover:bg-background"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    className="rounded-lg border border-border p-2 text-muted transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* =========================================================
          ADD STUDENT MODAL
      ========================================================= */}

      {showSignup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowSignup(false);
            }
          }}
        >
          <div className="my-4 max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-card shadow-2xl sm:my-6">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-heading">
                  Add New Student
                </h2>

                <p className="mt-1 text-sm text-muted">
                  Create a student account.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSignup(false)}
                className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-heading"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}

            <form
              onSubmit={addStudent}
              className="space-y-4 p-4 sm:space-y-5 sm:p-6"
            >

              {/* Name */}

              <div>
                <label
                  htmlFor="student-name"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Full Name
                </label>

                <input
                  id="student-name"
                  type="text"
                  name="name"
                  value={studentForm.name}
                  onChange={handleFormChange}
                  placeholder="Enter student's full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Student ID */}

              <div>
                <label
                  htmlFor="student-id"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Student ID
                </label>

                <input
                  id="student-id"
                  type="text"
                  name="studentId"
                  value={studentForm.studentId}
                  onChange={handleFormChange}
                  placeholder="e.g. STU-008"
                  required
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="student-email"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Email Address
                </label>

                <input
                  id="student-email"
                  type="email"
                  name="email"
                  value={studentForm.email}
                  onChange={handleFormChange}
                  placeholder="student@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="student-password"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Password
                </label>

                <input
                  id="student-password"
                  type="password"
                  name="password"
                  value={studentForm.password}
                  onChange={handleFormChange}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-purple-100"
                />

                <p className="mt-1.5 text-xs text-muted">
                  The password is stored securely by Firebase Authentication, not in Firestore.
                </p>
              </div>

              {/* Class */}

              <div>
                <label
                  htmlFor="student-class"
                  className="mb-2 block text-sm font-semibold text-heading"
                >
                  Class
                </label>

                <select
                  id="student-class"
                  name="class"
                  value={studentForm.class}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-purple-100"
                >
                  {classOptions.map((className) => (
                    <option
                      key={className}
                      value={className}
                    >
                      {className}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setShowSignup(false);
                    setStudentForm(emptyForm);
                  }}
                  disabled={submitting}
                  className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-heading transition hover:bg-background disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Creating Account..."
                    : "Create Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          STUDENT DETAILS MODAL
      ========================================================= */}

      {showDetails && selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowDetails(false);
              setSelectedStudent(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="text-xl font-bold text-heading">
                Student Details
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowDetails(false);
                  setSelectedStudent(null);
                }}
                className="rounded-lg p-2 text-muted transition hover:bg-background"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Student Profile */}

            <div className="p-4 sm:p-6">
              <div className="flex flex-col items-center border-b border-border pb-6 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-primary-dark">
                  {selectedStudent.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <h3 className="text-xl font-bold text-heading">
                  {selectedStudent.name}
                </h3>

                <p className="mt-1 text-sm text-muted">
                  {selectedStudent.id}
                </p>

                <span className="mt-3 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-primary">
                  {selectedStudent.status}
                </span>
              </div>

              {/* Details */}

              <div className="space-y-4 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Email Address
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-heading">
                    {selectedStudent.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Student ID
                  </p>

                  <p className="mt-1 text-sm font-medium text-heading">
                    {selectedStudent.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Class
                  </p>

                  <p className="mt-1 text-sm font-medium text-heading">
                    {selectedStudent.class}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Firebase UID
                  </p>

                  <p className="mt-1 break-all text-xs text-muted">
                    {selectedStudent.uid || "Not available"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowDetails(false);
                  setSelectedStudent(null);
                }}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
