
import { useState } from "react";
import { FcKindle } from "react-icons/fc";
import {
  BookOpen,
  Languages,
  Monitor,
  Earth,
  Calculator,
  ArrowRight,
  X,
  BookOpenText,
  ChevronRight,
  GraduationCap,
  Clock,
  CheckCircle2,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

// Subject data with chapters
const courses = [
  {
    title: "English",
    code: "ENG-101",
    progress: 75,
    icon: Languages,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100 dark:bg-rose-500/15",
    chapters: [
      {
        number: 1,
        title: "Parts of Speech",
        description:
          "Learn nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections.",
      },
      {
        number: 2,
        title: "Tenses",
        description:
          "Understand present, past and future tenses with examples and exercises.",
      },
      {
        number: 3,
        title: "Active and Passive Voice",
        description:
          "Learn how to convert sentences from active voice to passive voice.",
      },
      {
        number: 4,
        title: "Direct and Indirect Speech",
        description:
          "Learn the rules for changing direct speech into indirect speech.",
      },
      {
        number: 5,
        title: "Essay Writing",
        description:
          "Learn essay structure, paragraph writing and how to organize ideas.",
      },
      {
        number: 6,
        title: "Comprehension",
        description:
          "Practice reading passages and answering questions to improve understanding.",
      },
    ],
  },

  {
    title: "Urdu",
    code: "UR-101",
    progress: 60,
    icon: BookOpen,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
    chapters: [
      {
        number: 1,
        title: "اردو قواعد",
        description:
          "اردو زبان کے قواعد، اسم، فعل اور حروف کی بنیادی معلومات حاصل کریں۔",
      },
      {
        number: 2,
        title: "اسم اور فعل",
        description:
          "اسم اور فعل کی اقسام اور جملوں میں ان کے استعمال کو سمجھیں۔",
      },
      {
        number: 3,
        title: "مضمون نویسی",
        description:
          "مضمون لکھنے کا طریقہ، تمہید، مرکزی خیال اور اختتام سیکھیں۔",
      },
      {
        number: 4,
        title: "خط نویسی",
        description:
          "رسمی اور غیر رسمی خطوط لکھنے کے اصول سیکھیں۔",
      },
      {
        number: 5,
        title: "نظم اور غزل",
        description:
          "اردو شاعری کی مختلف اصناف اور ان کی خصوصیات کا مطالعہ کریں۔",
      },
    ],
  },

  {
    title: "Sindhi",
    code: "SHI-103",
    progress: 40,
    icon: FcKindle,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100 dark:bg-sky-500/15",
    chapters: [
      {
        number: 1,
        title: "سنڌي ٻوليءَ جو تعارف",
        description:
          "سنڌي ٻوليءَ جي تاريخ ۽ اهميت بابت ڄاڻ حاصل ڪريو.",
      },
      {
        number: 2,
        title: "سنڌي گرامر",
        description:
          "سنڌي ٻوليءَ جا بنيادي گرامر ۽ جملا ٺاهڻ جا اصول سکو.",
      },
      {
        number: 3,
        title: "سنڌي ادب",
        description:
          "سنڌي ادب ۽ ان جي مشهور ليکڪن جو مطالعو ڪريو.",
      },
      {
        number: 4,
        title: "شاهه عبداللطيف ڀٽائي",
        description:
          "شاهه لطيف جي شاعري ۽ سنڌي ثقافت ۾ سندس اهميت کي سمجھو.",
      },
      {
        number: 5,
        title: "مضمون ۽ خط",
        description:
          "سنڌي ۾ مضمون ۽ خط لکڻ جي مشق ڪريو.",
      },
    ],
  },

  {
    title: "Computer Science",
    code: "CS-104",
    progress: 80,
    icon: Monitor,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    chapters: [
      {
        number: 1,
        title: "Introduction to Computers",
        description:
          "Learn computer fundamentals, characteristics, types and applications.",
      },
      {
        number: 2,
        title: "Computer Hardware",
        description:
          "Understand CPU, RAM, storage devices, input devices and output devices.",
      },
      {
        number: 3,
        title: "Operating Systems",
        description:
          "Learn about operating systems, their functions and common examples.",
      },
      {
        number: 4,
        title: "Programming Fundamentals",
        description:
          "Explore variables, data types, operators, conditions and loops.",
      },
      {
        number: 5,
        title: "Database Management",
        description:
          "Understand databases, tables, records, keys and basic SQL concepts.",
      },
      {
        number: 6,
        title: "Computer Networks",
        description:
          "Learn about LAN, WAN, network devices and internet communication.",
      },
      {
        number: 7,
        title: "Web Development",
        description:
          "Explore HTML, CSS and JavaScript for building websites.",
      },
      {
        number: 8,
        title: "Cyber Security",
        description:
          "Learn about passwords, privacy, malware and online security practices.",
      },
    ],
  },

  {
    title: "Pakistan Studies",
    code: "PST-101",
    progress: 55,
    icon: Earth,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100 dark:bg-purple-500/15",
    chapters: [
      {
        number: 1,
        title: "Ideology of Pakistan",
        description:
          "Learn about the ideology of Pakistan and its historical background.",
      },
      {
        number: 2,
        title: "Pakistan Movement",
        description:
          "Study the major events and personalities of the Pakistan Movement.",
      },
      {
        number: 3,
        title: "Creation of Pakistan",
        description:
          "Understand the events surrounding the establishment of Pakistan in 1947.",
      },
      {
        number: 4,
        title: "Constitution of Pakistan",
        description:
          "Explore constitutional development and important constitutional principles.",
      },
      {
        number: 5,
        title: "Geography of Pakistan",
        description:
          "Learn about Pakistan's provinces, mountains, rivers and natural resources.",
      },
      {
        number: 6,
        title: "Culture and Heritage",
        description:
          "Explore the cultures, languages, traditions and heritage of Pakistan.",
      },
    ],
  },

  {
    title: "Mathematics",
    code: "MTH-101",
    progress: 70,
    icon: Calculator,
    iconColor: "text-green-600",
    iconBg: "bg-green-100 dark:bg-green-500/15",
    chapters: [
      {
        number: 1,
        title: "Real Numbers",
        description:
          "Understand natural numbers, integers, rational numbers and real numbers.",
      },
      {
        number: 2,
        title: "Algebraic Expressions",
        description:
          "Learn algebraic expressions, simplification and basic algebraic operations.",
      },
      {
        number: 3,
        title: "Linear Equations",
        description:
          "Solve linear equations and understand their applications.",
      },
      {
        number: 4,
        title: "Quadratic Equations",
        description:
          "Learn methods for solving quadratic equations and related problems.",
      },
      {
        number: 5,
        title: "Geometry",
        description:
          "Study angles, triangles, circles and fundamental geometric principles.",
      },
      {
        number: 6,
        title: "Statistics",
        description:
          "Learn mean, median, mode and basic data interpretation.",
      },
    ],
  },
];

// Reusable Course Card
function CourseCard({ course, onViewCourse }) {
  const Icon = course.icon;

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-6">
      {/* Course Icon */}
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${course.iconBg} ${course.iconColor} transition-transform duration-300 group-hover:scale-105`}
      >
        <Icon size={25} strokeWidth={2.2} />
      </div>

      {/* Course Information */}
      <div className="mb-5">
        <h2 className="text-base font-bold text-heading">
          {course.title}
        </h2>

        <p className="mt-1 text-sm text-muted">
          {course.code}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-auto">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted">
            Course Progress
          </span>

          <span className="text-xs font-semibold text-primary">
            {course.progress}%
          </span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-primary/10"
          role="progressbar"
          aria-label={`${course.title} progress`}
          aria-valuenow={course.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${course.progress}%` }}
          />
        </div>

        {/* View Course Button */}
        <button
          type="button"
          onClick={() => onViewCourse(course)}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          View Course

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </article>
  );
}

// Subject Chapters Modal
function CourseModal({ course, onClose }) {
  const [selectedChapter, setSelectedChapter] = useState(null);

  if (!course) return null;

  const completedChapters = Math.floor(
    (course.progress / 100) * course.chapters.length
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-border bg-background p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpenText size={26} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Subject Details
              </p>

              <h2
                id="course-modal-title"
                className="mt-1 text-xl font-bold text-heading sm:text-2xl"
              >
                {course.title}
              </h2>

              <p className="mt-1 text-sm text-muted">
                {course.code} · {course.chapters.length} Chapters
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close subject details"
            className="rounded-lg p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
          >
            <X size={22} />
          </button>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-2 gap-3 border-b border-border p-5 sm:gap-4 sm:px-7">
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-muted">
              <GraduationCap size={18} className="text-primary" />

              <span className="text-xs sm:text-sm">
                Course Progress
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-heading">
              {course.progress}%
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-muted">
              <BookOpen size={18} className="text-primary" />

              <span className="text-xs sm:text-sm">
                Total Chapters
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-heading">
              {course.chapters.length}
            </p>
          </div>
        </div>

        {/* Chapter List */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-heading">
              Subject Chapters
            </h3>

            <p className="mt-1 text-sm text-muted">
              Select a chapter to see its details.
            </p>
          </div>

          <div className="space-y-3">
            {course.chapters.map((chapter, index) => {
              const isSelected =
                selectedChapter?.number === chapter.number;

              const isCompleted = index < completedChapters;

              return (
                <div
                  key={chapter.number}
                  className={`overflow-hidden rounded-xl border transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  {/* Chapter Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedChapter(
                        isSelected ? null : chapter
                      )
                    }
                    aria-expanded={isSelected}
                    className="flex w-full items-center gap-3 p-4 text-left sm:gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {String(chapter.number).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                        Chapter {chapter.number}
                      </p>

                      <h4 className="mt-1 text-sm font-semibold text-heading sm:text-base">
                        {chapter.title}
                      </h4>
                    </div>

                    {isCompleted && (
                      <CheckCircle2
                        size={19}
                        className="shrink-0 text-emerald-500"
                      />
                    )}

                    <ChevronRight
                      size={19}
                      className={`shrink-0 text-muted transition-transform ${
                        isSelected ? "rotate-90 text-primary" : ""
                      }`}
                    />
                  </button>

                  {/* Expanded Chapter Details */}
                  {isSelected && (
                    <div className="border-t border-border px-4 pb-4 pt-3 sm:pl-[4.5rem]">
                      <p className="text-sm leading-6 text-muted">
                        {chapter.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                          <Clock size={14} />
                          Study at your own pace
                        </span>

                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Chapter {chapter.number}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border bg-background p-4 sm:px-7 sm:py-5">
          <p className="text-xs text-muted sm:text-sm">
            {course.chapters.length} chapters available
          </p>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Courses Page
export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-h-screen md:pl-64">
        {/* Navbar */}
        <Navbar />

        <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
          {/* Page Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              My Subjects
            </h1>

            <p className="mt-2 text-sm text-muted">
              Access your enrolled subjects, explore chapters and track your progress.
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.code}
                course={course}
                onViewCourse={setSelectedCourse}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Modal opens on the same page */}
      {selectedCourse && (
        <CourseModal
          key={selectedCourse.code}
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}
