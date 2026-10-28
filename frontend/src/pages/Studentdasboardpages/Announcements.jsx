
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
      return "bg-purple-50 text-purple-700";
    case "Academic":
      return "bg-blue-50 text-blue-700";
    case "Scholarship":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-green-50 text-green-800";
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
        item.id === id ? { ...item, unread: false } : item
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
  };

  const openAnnouncement = (item) => {
    setSelectedAnnouncement(item);
    markAsRead(item.id);
  };

  return (
    <div className="min-h-screen ml-70 bg-[#f6f8f6] md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm text-gray-500">
                Student Portal / Communication
              </p>

              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  Announcements
                </h1>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    {unreadCount} New
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Stay updated with the latest university news and notices.
              </p>
            </div>

            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-700 hover:text-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CircleCheck size={18} />
              Mark all as read
            </button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="rounded-xl bg-green-50 p-3 text-green-800">
                <Megaphone size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Total Announcements
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                  {announcements.length}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <Bell size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Unread Notices</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                  {unreadCount}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="rounded-xl bg-purple-50 p-3 text-purple-700">
                <Pin size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pinned Notices</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                  {announcements.filter((item) => item.pinned).length}
                </h2>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="relative mb-5">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search announcements..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-green-700 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-[#145c3b] text-white shadow-sm"
                      : "bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-800"
                  }`}
                >
                  {category}
                </button>
              ))}

              <button
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  showUnreadOnly
                    ? "bg-amber-100 text-amber-800"
                    : "bg-gray-50 text-gray-600 hover:bg-amber-50"
                }`}
              >
                Unread only
              </button>
            </div>
          </section>

          {/* Announcement List */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">
                Latest Notices
              </h2>

              <span className="text-sm text-gray-500">
                {filteredAnnouncements.length} results
              </span>
            </div>

            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((item) => {
                const CategoryIcon = getCategoryIcon(item.category);

                return (
                  <article
                    key={item.id}
                    className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6 ${
                      item.unread
                        ? "border-l-4 border-l-[#145c3b] border-y-gray-100 border-r-gray-100"
                        : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`hidden shrink-0 rounded-xl p-3 sm:block ${getCategoryStyle(
                          item.category
                        )}`}
                      >
                        <CategoryIcon size={24} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${getCategoryStyle(
                              item.category
                            )}`}
                          >
                            {item.category}
                          </span>

                          {item.priority === "Important" && (
                            <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                              Important
                            </span>
                          )}

                          {item.pinned && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500">
                              <Pin size={13} />
                              Pinned
                            </span>
                          )}

                          {item.unread && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-800">
                              <span className="h-2 w-2 rounded-full bg-green-600" />
                              New
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-gray-800 sm:text-lg">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {item.description}
                        </p>

                        <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
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
                            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#145c3b] hover:text-green-900 sm:self-auto"
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
              <div className="rounded-2xl border border-gray-100 bg-white px-5 py-14 text-center shadow-sm">
                <Bell
                  size={38}
                  className="mx-auto mb-4 text-gray-300"
                />
                <h3 className="font-semibold text-gray-800">
                  No announcements found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try another category or search term.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                    setShowUnreadOnly(false);
                  }}
                  className="mt-4 text-sm font-semibold text-green-800 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          <p className="pb-2 text-center text-xs text-gray-400">
            Student Portal · University Announcements
          </p>
        </main>
      </div>

      {/* Announcement Details Modal */}
      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
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
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <span
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${getCategoryStyle(
                selectedAnnouncement.category
              )}`}
            >
              {selectedAnnouncement.category}
            </span>

            <h2
              id="announcement-title"
              className="mt-4 text-xl font-bold text-gray-800"
            >
              {selectedAnnouncement.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} />
                {selectedAnnouncement.date}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} />
                {selectedAnnouncement.time}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              {selectedAnnouncement.description}
            </p>

            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="mt-7 w-full rounded-xl bg-[#145c3b] px-5 py-3 font-semibold text-white transition hover:bg-[#10492f]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
