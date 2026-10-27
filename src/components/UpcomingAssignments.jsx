
import { ClipboardList, ArrowUpRight } from "lucide-react";

const assignments = [
  {
    title: "Web Development Assignment",
    subject: "HTML, CSS & React",
    due: "Due: 28 Oct 2026",
    priority: "High",
    color: "bg-red-50 text-red-600",
    badge: "bg-red-50 text-red-600",
  },
  {
    title: "Database Project",
    subject: "Database Management",
    due: "Due: 30 Oct 2026",
    priority: "Medium",
    color: "bg-amber-50 text-amber-600",
    badge: "bg-amber-50 text-amber-700",
  },
  {
    title: "UI/UX Design Task",
    subject: "Design Fundamentals",
    due: "Due: 02 Nov 2026",
    priority: "Low",
    color: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
  },
];

export default function UpcomingAssignments() {
  return (
    <section className="mb-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

      {/* Heading */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#173d33]">
            Upcoming Assignments
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Keep track of your upcoming deadlines.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
        >
          View All
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Assignment List */}
      <div className="space-y-3">

        {assignments.map((assignment) => (
          <div
            key={assignment.title}
            className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Assignment Details */}
            <div className="flex items-center gap-3">

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${assignment.color}`}
              >
                <ClipboardList size={21} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {assignment.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {assignment.subject}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {assignment.due}
                </p>
              </div>
            </div>

            {/* Priority */}
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${assignment.badge}`}
            >
              {assignment.priority}
            </span>

          </div>
        ))}

      </div>
    </section>
  );
}