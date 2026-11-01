import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-border bg-card/95 px-5 backdrop-blur-md sm:px-8">

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />

        <input
          type="search"
          placeholder="Search anything..."
          className="w-full rounded-xl border border-transparent bg-background py-3 pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-muted focus:border-primary/30 focus:bg-card focus:ring-4 focus:ring-primary/10"
        />
      </div>

      {/* Right Actions */}
      <div className="flex shrink-0 items-center gap-4 sm:gap-6">

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
        >
          <Bell size={21} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary ring-2 ring-card" />
        </button>

        {/* Student Profile */}
        <button
          type="button"
          className="flex items-center gap-2"
        >
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Student profile"
            className="h-10 w-10 rounded-full border-2 border-primary/20 object-cover"
          />

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-heading">
              Iqra Khan
            </p>

            <p className="text-xs text-muted">
              Student
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-muted sm:block"
          />
        </button>

      </div>
    </header>
  );
}