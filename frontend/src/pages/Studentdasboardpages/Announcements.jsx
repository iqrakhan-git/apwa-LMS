
import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
  Bell,
  Search,
  CalendarDays,
  Pin,
  Megaphone,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  CircleCheck,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";

const initialAnnouncements = [
  {
    id: 1,
    title: "Mid-Term Examination Schedule Released",
    description:
      "The mid-term examination schedule is now available. Please review your timetable and prepare accordingly. Contact your department for any examination-related queries.",
    category: "Examination",
    date: "Oct 27, 2026",
    time: "09:30 AM",
    priority: "Important",
    pinned: true,
    unread: true,
  },
  {
    id: 2,
    title: "Assignment Submission Deadline",
    description:
      "All students are requested to submit their pending assignments before the announced deadline. Late submissions may be subject to your instructor's course policy.",
    category: "Academic",
    date: "Oct 26, 2026",
    time: "11:00 AM",
    priority: "Important",
    pinned: true,
    unread: true,
  },
  {
    id: 3,
    title: "Library Hours Updated",
    description:
      "The university library will operate with updated opening hours this week. Please check the library notice board for the latest schedule.",
    category: "General",
    date: "Oct 25, 2026",
    time: "02:15 PM",
    priority: "Normal",
    pinned: false,
    unread: false,
  },
  {
    id: 4,
    title: "Scholarship Application Reminder",
    description:
      "Eligible students are encouraged to review the scholarship requirements and submit their applications with all required supporting documents.",
    category: "Scholarship",
    date: "Oct 24, 2026",
    time: "10:00 AM",
    priority: "Important",
    pinned: false,
    unread: true,
  },
  {
    id: 5,
    title: "Student Portal Maintenance",
    description:
      "Scheduled maintenance may temporarily affect access to some portal features. Please save any ongoing work before the maintenance period.",
    category: "General",
    date: "Oct 22, 2026",
    time: "04:30 PM",
    priority: "Normal",
    pinned: false,
    unread: false,
  },
];

const categories = [
  "All",
  "Academic",
  "Examination",
  "Scholarship",
  "General",
];

function getCategoryIcon(category) {
  switch (category) {
    case "Examination":
      return ClipboardCheck;
    case "Academic":
      return BookOpen;
    case "Scholarship":
      return GraduationCap;
    default:
      return Megaphone;
  }
}

function getCategoryStyle(category) {
  switch (category) {
    case "Examination":
      return "bg-primary/10 text-primary";

    case "Academic":
      return "bg-secondary/10 text-secondary";

    case "Scholarship":
      return "bg-accent/15 text-heading";

    default:
      return "bg-primary/5 text-heading";
  }
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(
    initialAnnouncements
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  const unreadCount = announcements.filter(
    (item) => item.unread
  ).length;

  const pinnedCount = announcements.filter(
    (item) => item.pinned
  ).length;

  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((item) => {
        const matchesCategory =
          activeCategory === "All" ||
          item.category === activeCategory;

        const matchesSearch = (
          item.title +
          " " +
          item.description +
          " " +
          item.category
        )
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesUnread =
          !showUnreadOnly || item.unread;

        return (
          matchesCategory &&
          matchesSearch &&
          matchesUnread
        );
      })
      .sort(
        (a, b) =>
          Number(b.pinned) - Number(a.pinned) ||
          b.id - a.id
      );
  }, [
    announcements,
    activeCategory,
    search,
    showUnreadOnly,
  ]);

  const markAsRead = (id) => {
    setAnnouncements((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, unread: false }
          : item
      )
    );

    setSelectedAnnouncement((previous) =>
      previous?.id === id
        ? { ...previous, unread: false }
        : previous
    );
  };

  const markAllAsRead = () => {
    setAnnouncements((previous) =>
      previous.map((item) => ({
        ...item,
        unread: false,
      }))
    );

    setSelectedAnnouncement((previous) =>
      previous
        ? { ...previous, unread: false }
        : previous
    );
  };

  const openAnnouncement = (item) => {
    setSelectedAnnouncement(item);
    markAsRead(item.id);
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setShowUnreadOnly(false);
  };

  return (
    <div className="md:ml-64 min-h-screen bg-background text-heading md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm text-muted">
                Student Portal / Communication
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                  Announcements
                </h1>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {unreadCount} New
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-muted">
                Stay updated with the latest university news and notices.
              </p>
            </div>

            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CircleCheck size={18} />
              Mark all as read
            </button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Total Announcements */}
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Megaphone size={24} />
              </div>

              <div>
                <p className="text-sm text-muted">
                  Total Announcements
                </p>

                <h2 className="mt-1 text-2xl font-bold text-heading">
                  {announcements.length}
                </h2>
              </div>
            </div>

            {/* Unread Notices */}
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="rounded-xl bg-secondary/10 p-3 text-secondary">
                <Bell size={24} />
              </div>

              <div>
                <p className="text-sm text-muted">
                  Unread Notices
                </p>

                <h2 className="mt-1 text-2xl font-bold text-heading">
                  {unreadCount}
                </h2>
              </div>
            </div>

            {/* Pinned Notices */}
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="rounded-xl bg-accent/15 p-3 text-heading">
                <Pin size={24} />
              </div>

              <div>
                <p className="text-sm text-muted">
                  Pinned Notices
                </p>

                <h2 className="mt-1 text-2xl font-bold text-heading">
                  {pinnedCount}
                </h2>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="relative mb-5">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search announcements..."
                className="w-full rounded-xl border border-border bg-background py-3.5 pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-primary text-white shadow-sm"
                      : "bg-background text-muted hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}

              <button
                onClick={() =>
                  setShowUnreadOnly((previous) => !previous)
                }
                aria-pressed={showUnreadOnly}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  showUnreadOnly
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "bg-background text-muted hover:bg-primary/10 hover:text-primary"
                }`}
              >
                Unread only
              </button>
            </div>
          </section>

          {/* Announcement List */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-heading">
                Latest Notices
              </h2>

              <span className="text-sm text-muted">
                {filteredAnnouncements.length} results
              </span>
            </div>

            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((item) => {
                const CategoryIcon = getCategoryIcon(
                  item.category
                );

                return (
                  <article
                    key={item.id}
                    className={`rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md sm:p-6 ${
                      item.unread
                        ? "border-y-border border-r-border border-l-4 border-l-primary"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Category Icon */}
                      <div
                        className={`hidden shrink-0 rounded-xl p-3 sm:block ${getCategoryStyle(
                          item.category
                        )}`}
                      >
                        <CategoryIcon size={24} />
                      </div>

                      <div className="min-w-0 flex-1">
                        {/* Badges */}
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${getCategoryStyle(
                              item.category
                            )}`}
                          >
                            {item.category}
                          </span>

                          {item.priority === "Important" && (
                            <span className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-heading">
                              Important
                            </span>
                          )}

                          {item.pinned && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
                              <Pin size={13} />
                              Pinned
                            </span>
                          )}

                          {item.unread && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                              <span className="h-2 w-2 rounded-full bg-primary" />
                              New
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-heading sm:text-lg">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {item.description}
                        </p>

                        {/* Date and Read Details */}
                        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays size={15} />
                              {item.date}
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                              <Clock size={15} />
                              {item.time}
                            </span>
                          </div>

                          <button
                            onClick={() => openAnnouncement(item)}
                            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition hover:text-primary-dark sm:self-auto"
                          >
                            Read details
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              /* Empty State */
              <div className="rounded-2xl border border-border bg-card px-5 py-14 text-center shadow-sm">
                <Bell
                  size={38}
                  className="mx-auto mb-4 text-primary/40"
                />

                <h3 className="font-semibold text-heading">
                  No announcements found
                </h3>

                <p className="mt-2 text-sm text-muted">
                  Try another category or search term.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm font-semibold text-primary transition hover:text-primary-dark hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          {/* Footer */}
          <p className="pb-2 text-center text-xs text-muted">
            Student Portal · University Announcements
          </p>
        </main>
      </div>

      {/* Announcement Details Modal */}
      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-title"
            className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-heading shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <div
                className={`rounded-xl p-3 ${getCategoryStyle(
                  selectedAnnouncement.category
                )}`}
              >
                {(() => {
                  const Icon = getCategoryIcon(
                    selectedAnnouncement.category
                  );

                  return <Icon size={24} />;
                })()}
              </div>

              <button
                onClick={() => setSelectedAnnouncement(null)}
                aria-label="Close announcement details"
                className="rounded-lg p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
              >
                <X size={20} />
              </button>
            </div>

            {/* Category */}
            <span
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${getCategoryStyle(
                selectedAnnouncement.category
              )}`}
            >
              {selectedAnnouncement.category}
            </span>

            {/* Announcement Title */}
            <h2
              id="announcement-title"
              className="mt-4 text-xl font-bold text-heading"
            >
              {selectedAnnouncement.title}
            </h2>

            {/* Date and Time */}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} />
                {selectedAnnouncement.date}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} />
                {selectedAnnouncement.time}
              </span>
            </div>

            {/* Full Description */}
            <p className="mt-5 text-sm leading-7 text-muted">
              {selectedAnnouncement.description}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="mt-7 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}