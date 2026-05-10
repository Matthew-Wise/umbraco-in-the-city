// Server Component - fetches data server-side with caching
import SpeakersGridClient from "@/components/speakers-grid-client";
import { getSpeakerWall, getSpeakers, getSessions } from "@/lib/sessionize";

export default async function SpeakersGrid() {
  // All data fetching happens server-side with Next.js caching
  const [speakers, allSpeakers, sessions] = await Promise.all([
    getSpeakerWall(),
    getSpeakers(),
    getSessions(),
  ]);

  return (
    <SpeakersGridClient
      speakers={speakers}
      allSpeakers={allSpeakers}
      sessions={sessions}
    />
  );
}
