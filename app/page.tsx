import type React from "react";
import PatternButton from "@/components/pattern-button";
import Hero from "@/components/hero";
import ContentSection from "@/components/content-section";
import EventSchedule, { type ScheduleDay } from "@/components/event-schedule";
import SpeakersGrid from "@/components/speakers-grid";

export default function ConferencePage() {
  // Schedule data
  const scheduleData: ScheduleDay[] = [
    {
      day: "Thursday",
      date: "November 6th",
      items: [
        {
          time: "1pm - 5pm",
          activity: "Community Activities",
          description: (
            <>
              Hackathons, Open discussions, Workshops... we've not quite decided{" "}
              yet! But something will be happening at the same time as the{" "}
              <a
                className="underline hover:no-underline"
                href="https://umbraco.com/umbraco-uk-summit-2025/"
              >
                Partner Summit
              </a>
            </>
          ),
        },
        {
          time: "from 8pm",
          activity: "After Event Social",
          description: "Joining the Business Partner Summit & Sixes Cricket",
        },
      ],
    },
    {
      day: "Friday",
      date: "November 7th",
      items: [
        {
          time: "9am - 6pm",
          activity: "Umbraco In The City Event",
          description:
            "Main conference day with talks, workshops, and networking",
          link: "/schedule",
          linkText: "View Schedule",
        },
      ],
    },
  ];

  return (
    <main className="relative z-10">
      <Hero
        title="UMBRACO"
        subtitle="IN THE CITY"
        location="MANCHESTER"
        date="November 7th, 2025"
        venue="x + why, Manchester"
      />

      {/* Content Sections */}
      <div className="max-w-[820px] mx-auto px-4 py-8 md:py-16 space-y-16 md:space-y-32">
        <ContentSection
          title="About"
          content={[
            "Join the Umbraco community in Manchester for a day of inspiring talks and networking. Connect with fellow developers and Umbraco enthusiasts from around the world.",
            "Whether you're a seasoned Umbraco developer or just getting started, this conference offers something for everyone. Learn about the latest features, best practices, and future of Umbraco.",
          ]}
          showBeeIcon={true}
        />

        <EventSchedule title="Event Schedule" scheduleData={scheduleData} />

        <SpeakersGrid />

        <ContentSection
          title="TICKETS"
          content={[
            "Tickets are just £50 — heavily subsidised thanks to Umbraco HQ.",
            "Limited to 80 attendees, so book early to avoid missing out!",
          ]}
        >
          <PatternButton href="https://www.tickettailor.com/events/umbukfdn/1804177">
            Buy Tickets
          </PatternButton>
        </ContentSection>
      </div>
    </main>
  );
}
