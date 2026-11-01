import { ClipboardList, ArrowUpRight } from "lucide-react";

const assignments = [
  {
    title: "Web Development Assignment",
    subject: "HTML, CSS & React",
    due: "Due: 28 Oct 2026",
    priority: "High",
    color: "bg-primary/10 text-primary",
    badge: "bg-primary/10 text-primary",
  },
  {
    title: "Database Project",
    subject: "Database Management",
    due: "Due: 30 Oct 2026",
    priority: "Medium",
    color: "bg-primary-dark/10 text-primary-dark",
    badge: "bg-primary-dark/10 text-primary-dark",
  },
  {
    title: "UI/UX Design Task",
    subject: "Design Fundamentals",
    due: "Due: 02 Nov 2026",
    priority: "Low",
    color: "bg-secondary/10 text-secondary",
    badge: "bg-secondary/10 text-secondary",
  },
];

export default function UpcomingAssignments() {
  return (
    <section className="mb-7 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">

      {/* Heading */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-heading">
            Upcoming Assignments
          </h2>

          <p className="mt-1 text-sm text-muted">
            Keep track of your upcoming deadlines.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-dark"
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
            className="flex flex-col gap-3 rounded-xl border border-border p-4 transition hover:border-primary/30 hover:bg-primary/5 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Assignment Details */}
            <div className="flex items-center gap-3">

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${assignment.color}`}
              >
                <ClipboardList size={21} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-heading">
                  {assignment.title}
                </h3>

                <p className="mt-1 text-xs text-muted">
                  {assignment.subject}
                </p>

                <p className="mt-1 text-xs text-muted">
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