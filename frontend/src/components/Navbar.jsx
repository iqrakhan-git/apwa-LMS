
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-gray-100 bg-white/95 px-5 backdrop-blur-md sm:px-8">

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="search"
          placeholder="Search anything..."
          className="w-full rounded-xl border border-transparent bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-200 focus:bg-white focus:ring-4 focus:ring-emerald-50"
        />
      </div>

      {/* Right Actions */}
      <div className="flex shrink-0 items-center gap-4 sm:gap-6">

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-emerald-700"
        >
          <Bell size={21} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Student Profile */}
        <button
          type="button"
          className="flex items-center gap-2"
        >
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Student profile"
            className="h-10 w-10 rounded-full border-2 border-emerald-100 object-cover"
          />

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Iqra Khan
            </p>

            <p className="text-xs text-gray-500">
              Student
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-gray-400 sm:block"
          />
        </button>

      </div>
    </header>
  );
}