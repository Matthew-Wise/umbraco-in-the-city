"use client";

import { useState } from "react";
import type {
  GridSchedule,
  SessionDetails,
  SpeakerDetails,
} from "@/lib/sessionize";
import SessionModal from "@/components/session-modal";
import SpeakerModal from "@/components/speaker-modal";

interface ScheduleGridProps {
  schedule: GridSchedule;
  sessions: SessionDetails[];
  speakers: SpeakerDetails[];
}

export default function ScheduleGrid({
  schedule,
  sessions,
  speakers,
}: ScheduleGridProps) {
  const [selectedSession, setSelectedSession] = useState<SessionDetails | null>(
    null
  );
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerDetails | null>(
    null
  );

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMinutes = Math.round(
      (endDate.getTime() - startDate.getTime()) / 1000 / 60
    );
    return diffMinutes;
  };

  const handleSessionClick = (sessionId: string) => {
    const session = sessions.find((s) => s.id?.toString() === sessionId);
    if (session) {
      setSelectedSession(session);
    }
  };

  const handleSpeakerClick = (speakerId: string) => {
    const speaker = speakers.find((s) => s.id === speakerId);
    if (speaker) {
      setSelectedSpeaker(speaker);
    }
  };

  return (
    <>
      <div className="space-y-8">
        {/* Date Header */}
        <div className="text-center pb-4">
          <h1 className="font-bayon text-4xl md:text-5xl text-black">
            {formatDate(schedule.date)}
          </h1>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-0">
          {schedule.timeSlots.map((timeSlot, slotIndex) => {
            const session = timeSlot.rooms[0]?.session;
            if (!session) return null;

            const startTime = formatTime(session.startsAt);
            const duration = getDuration(session.startsAt, session.endsAt);

            // Treat lunch as a service session
            const isServiceOrLunch = session.isServiceSession || session.title.toLowerCase().includes('lunch');

            return (
              <div
                key={slotIndex}
                className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] border-b border-gray-300"
              >
                {/* Time Column */}
                <div className="bg-gray-200 p-4 flex items-center justify-center border-r border-gray-300">
                  <span className="font-share-tech text-sm md:text-base text-black">
                    {startTime}
                  </span>
                </div>

                {/* Session Card */}
                <div className={isServiceOrLunch ? "bg-gray-900 p-4 md:p-6" : "bg-brand-dark p-4 md:p-6"}>
                  {isServiceOrLunch ? (
                    // Service Session - Non-clickable
                    <>
                      <div className="mb-2">
                        <span className="font-share-tech text-xs md:text-sm text-white/80">
                          {startTime} → {duration} min
                        </span>
                      </div>
                      <div>
                        <h3 className="font-share-tech text-lg md:text-xl font-bold text-white">
                          {session.title}
                        </h3>
                        {session.speakers && session.speakers.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {session.speakers.map((speaker) => (
                              <button
                                key={speaker.id}
                                onClick={() => handleSpeakerClick(speaker.id)}
                                className="font-share-tech text-sm md:text-base text-white/90 hover:text-brand-yellow transition-colors underline"
                              >
                                {speaker.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    // Regular Session - Clickable
                    <>
                      <div className="mb-2">
                        <span className="font-share-tech text-xs md:text-sm text-white/80">
                          {startTime} → {duration} min
                        </span>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleSessionClick(session.id)}
                          className="font-share-tech text-lg md:text-xl font-bold text-white hover:text-brand-yellow transition-colors text-left w-full"
                        >
                          {session.title}
                        </button>
                      {session.speakers && session.speakers.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {session.speakers.map((speaker) => (
                            <button
                              key={speaker.id}
                              onClick={() => handleSpeakerClick(speaker.id)}
                              className="font-share-tech text-sm md:text-base text-white/90 hover:text-brand-yellow transition-colors underline"
                            >
                              {speaker.name}
                            </button>
                          ))}
                        </div>
                      )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {selectedSession && (
        <SessionModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}

      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          sessions={sessions}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </>
  );
}
