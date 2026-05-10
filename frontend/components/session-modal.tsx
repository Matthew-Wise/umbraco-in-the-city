"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface SessionModalProps {
  session: SessionDetails;
  onClose: () => void;
}

export default function SessionModal({ session, onClose }: SessionModalProps) {
  const formatTime = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="bg-brand-dark text-white -m-6 mb-6 p-6 rounded-t-lg">
          <DialogTitle className="font-bayon text-2xl text-white text-left">
            {session.title}
          </DialogTitle>
          {session.speakers && session.speakers.length > 0 && (
            <p className="font-share-tech text-sm text-white/90 text-left">
              {session.speakers.map((s) => s.name).join(", ")}
            </p>
          )}
        </DialogHeader>

        <div className="space-y-4 text-black">
          {(session.startsAt || session.room) && (
            <div className="space-y-2">
              {session.startsAt && (
                <div className="font-share-tech text-sm">
                  <span className="font-bayon text-brand-black">When: </span>
                  {formatDate(session.startsAt)}
                  {session.endsAt && (
                    <>
                      {" "}
                      {formatTime(session.startsAt)} -{" "}
                      {formatTime(session.endsAt)}
                    </>
                  )}
                </div>
              )}
              {session.room && (
                <div className="font-share-tech text-sm">
                  <span className="font-bayon text-brand-black">Where: </span>
                  {session.room}
                </div>
              )}
            </div>
          )}

          {session.description && (
            <div>
              <h3 className="font-bayon text-lg text-brand-black mb-2">
                Description
              </h3>
              <div
                className="font-share-tech text-base leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: session.description }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
