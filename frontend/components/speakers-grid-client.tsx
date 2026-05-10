"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SpeakerModal from "@/components/speaker-modal";
import type { Speaker, SpeakerDetails, SessionDetails } from "@/lib/sessionize";

interface SpeakersGridClientProps {
  speakers: Speaker[];
  allSpeakers: SpeakerDetails[];
  sessions: SessionDetails[];
}

export default function SpeakersGridClient({
  speakers,
  allSpeakers,
  sessions,
}: SpeakersGridClientProps) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerDetails | null>(null);

  const handleSpeakerClick = (speakerId: string) => {
    const speakerDetails = allSpeakers.find((s) => s.id === speakerId);
    if (speakerDetails) {
      setSelectedSpeaker(speakerDetails);
    }
  };

  return (
    <>
      <section className="border-t border-brand-yellow pt-8 md:pt-16">
        <h2 className="font-bayon text-5xl lg:text-6xl text-brand-yellow tracking-wide mb-8">
          SPEAKERS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-[#E5E5E5] p-8 rounded-lg">
          {speakers.map((speaker) => (
            <button
              key={speaker.id}
              onClick={() => handleSpeakerClick(speaker.id)}
              className="flex flex-col items-center text-center group cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={speaker.profilePicture}
                  alt={speaker.fullName}
                  fill
                  className="rounded-full object-cover border-4 border-white"
                />
              </div>
              <h3 className="font-bayon text-xl text-black mb-2">
                {speaker.fullName}
              </h3>
              <p className="font-share-tech text-sm text-black/80">
                {speaker.tagLine}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/schedule"
            className="font-share-tech text-lg font-bold text-brand-yellow underline hover:no-underline"
          >
            View Full Schedule →
          </Link>
        </div>
      </section>

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
