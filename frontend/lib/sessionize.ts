// Server-side data fetching functions for Sessionize API

// Configuration
const SESSIONIZE_API_BASE = "https://sessionize.com/api/v2/q3a4fzac/view";
const CACHE_REVALIDATE_SECONDS = 3600; // Set to 0 for no cache, or 3600 for 1 hour

// Type Definitions - Speakers
export interface Speaker {
  id: string;
  fullName: string;
  tagLine: string;
  profilePicture: string;
}

export interface SpeakerDetails {
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

// Type Definitions - Sessions
export interface SessionDetails {
  id: string | number;
  title: string;
  description: string | null;
  startsAt: string | null;
  endsAt: string | null;
  roomId: number | null;
  room: string | null;
  speakers: Array<{ id: string; name: string }>;
}

// Type Definitions - Schedule
export interface ScheduleSession {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  isServiceSession: boolean;
  isPlenumSession: boolean;
  speakers: Array<{ id: string; name: string }>;
  roomId: number;
  room: string;
}

export interface ScheduleRoom {
  id: number;
  name: string;
  session: ScheduleSession;
  index: number;
}

export interface TimeSlot {
  slotStart: string;
  rooms: ScheduleRoom[];
}

export interface GridSchedule {
  date: string;
  timeSlots: TimeSlot[];
}

// API Functions - Speakers
export async function getSpeakerWall(): Promise<Speaker[]> {
  const response = await fetch(`${SESSIONIZE_API_BASE}/SpeakerWall`, {
    next: { revalidate: CACHE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch speaker wall");
  }

  return response.json();
}

export async function getSpeakers(): Promise<SpeakerDetails[]> {
  const response = await fetch(`${SESSIONIZE_API_BASE}/Speakers`, {
    next: { revalidate: CACHE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch speakers");
  }

  return response.json();
}

// API Functions - Sessions
export async function getSessions(): Promise<SessionDetails[]> {
  const response = await fetch(`${SESSIONIZE_API_BASE}/Sessions`, {
    next: { revalidate: CACHE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }

  const data = await response.json();
  // Sessions endpoint returns array of groups, flatten to get all sessions
  return data.flatMap((group: any) => group.sessions || []);
}

// API Functions - Schedule
export async function getGridSchedule(): Promise<GridSchedule> {
  const response = await fetch(`${SESSIONIZE_API_BASE}/GridSmart`, {
    next: { revalidate: CACHE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch grid schedule");
  }

  const data = await response.json();

  // GridSmart returns array with single item containing the schedule
  if (Array.isArray(data) && data.length > 0) {
    return {
      date: data[0].date,
      timeSlots: data[0].timeSlots,
    };
  }

  throw new Error("Invalid grid schedule format");
}
