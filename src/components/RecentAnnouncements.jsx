
import {
  Megaphone,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

const announcements = [
  {
    title: "Mid Term Exam Schedule",
    description:
      "The mid-term exam schedule has been updated. Please check the exam section for details.",
    date: "27 Oct 2026",
  },
  {
    title: "Web Development Workshop",
    description:
      "A practical workshop on modern web development will be announced soon.",
    date: "26 Oct 2026",
  },
];

export default function RecentAnnouncements() {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

      {/* Heading */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-[#173d33]">
          Recent Announcements
        </h2>

        <button
          type="button"
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          View All
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Announcement List */}
      <div className="divide-y divide-gray-100">

        {announcements.map((announcement) => (
          <article
            key={announcement.title}
            className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Megaphone size={19} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {announcement.title}
                </h3>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500">
                  {announcement.description}
                </p>
              </div>

            </div>

            <div className="flex shrink-0 items-center gap-1.5 text-xs text-gray-400 sm:pt-1">
              <CalendarDays size={14} />
              {announcement.date}
            </div>

          </article>
        ))}

      </div>
    </section>
  );
}