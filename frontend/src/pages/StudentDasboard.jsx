

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import UpcomingAssignments from "../components/UpcomingAssignments";
import RecentAnnouncements from "../components/RecentAnnouncements";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-[#f5f8fa]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-h-screen pl-64">

        {/* Top Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">

          {/* Dashboard Heading */}
          <DashboardHeader />

          {/* Statistics Cards */}
          <StatsCards />

          {/* Upcoming Assignments - Full Width */}
          <UpcomingAssignments />

          {/* Recent Announcements */}
          <RecentAnnouncements />

        </div>
      </main>

    </div>
  );
}