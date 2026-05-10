import type React from "react";
import Link from "next/link";
import { getGridSchedule, getSessions, getSpeakers } from "@/lib/sessionize";
import ScheduleGrid from "@/components/schedule-grid-client";

export default async function SchedulePage() {
  const [schedule, sessions, speakers] = await Promise.all([
    getGridSchedule(),
    getSessions(),
    getSpeakers(),
  ]);

  return (
    <main className="relative z-10 min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="max-w-[1000px] mx-auto px-4 pt-8 md:pt-16">
        <Link
          href="/"
          className="font-share-tech text-black underline hover:no-underline"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Schedule Content */}
      <div className="max-w-[1000px] mx-auto px-4 py-6 md:py-12">
        <ScheduleGrid
          schedule={schedule}
          sessions={sessions}
          speakers={speakers}
        />
      </div>
    </main>
  );
}
