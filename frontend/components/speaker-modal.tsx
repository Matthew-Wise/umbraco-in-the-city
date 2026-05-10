"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Linkedin } from "lucide-react";
import SessionModal from "@/components/session-modal";

interface SpeakerDetails {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bio: string;
  tagLine: string;
  profilePicture: string;
  sessions: Array<{ id: number; name: string }>;
  links: Array<{
    title: string;
    url: string;
    linkType: string;
  }>;
}

interface SessionDetails {
  id: string | number;
  title: string;
  description: string | null;
  startsAt: string | null;
  endsAt: string | null;
  roomId: number | null;
  room: string | null;
  speakers: Array<{ id: string; name: string }>;
}

interface SpeakerModalProps {
  speaker: SpeakerDetails;
  sessions: SessionDetails[];
  onClose: () => void;
}

export default function SpeakerModal({
  speaker,
  sessions,
  onClose,
}: SpeakerModalProps) {
  const [selectedSession, setSelectedSession] = useState<SessionDetails | null>(null);

  const speakerSessions = sessions.filter((session) =>
    speaker.sessions?.some((s) => s.id?.toString() === session.id?.toString())
  );

  const handleSessionClick = (sessionId: string | number) => {
    const session = sessions.find((s) => s.id?.toString() === sessionId?.toString());
    if (session) {
      setSelectedSession(session);
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader className="bg-brand-dark text-white -m-6 mb-6 p-6 rounded-t-lg">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={speaker.profilePicture}
                  alt={speaker.fullName}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <DialogTitle className="font-bayon text-2xl text-white mb-1">
                  {speaker.fullName}
                </DialogTitle>
                <p className="font-share-tech text-sm text-white/90">
                  {speaker.tagLine}
                </p>
                {speaker.links && speaker.links.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {speaker.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-white/80 transition-colors"
                        title={link.title}
                      >
                        {link.linkType.toLowerCase() === "linkedin" && (
                          <Linkedin className="w-5 h-5" />
                        )}
                        {link.linkType.toLowerCase() === "twitter" && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )}
                        {link.linkType.toLowerCase() === "blog" && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                            <path d="M2 17l10 5 10-5"/>
                            <path d="M2 12l10 5 10-5"/>
                          </svg>
                        )}
                        {!["linkedin", "twitter", "blog"].includes(link.linkType.toLowerCase()) && (
                          <span className="text-xs underline">{link.title}</span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 text-black">
            {speaker.bio && (
              <div>
                <p className="font-share-tech text-base leading-relaxed whitespace-pre-wrap">
                  {speaker.bio}
                </p>
              </div>
            )}

            {speakerSessions.length > 0 && (
              <div>
                <h3 className="font-bayon text-xl text-brand-black mb-3">
                  Sessions
                </h3>
                <ul className="space-y-2">
                  {speakerSessions.map((session) => (
                    <li key={session.id}>
                      <button
                        onClick={() => handleSessionClick(session.id)}
                        className="font-share-tech text-base text-black hover:underline text-left"
                      >
                        — {session.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedSession && (
        <SessionModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </>
  );
}
