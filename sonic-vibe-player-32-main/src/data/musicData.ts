import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import album5 from "@/assets/album-5.jpg";
import album6 from "@/assets/album-6.jpg";

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // seconds
  audioUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  tracks: Track[];
}

// Using royalty-free sample audio from the web
const SAMPLE_AUDIO = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
];

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Neon Nights",
    description: "Synthwave & electronic vibes for late nights",
    cover: album1,
    tracks: [
      { id: "1-1", title: "Midnight Drive", artist: "Neon Pulse", duration: 234, audioUrl: SAMPLE_AUDIO[0] },
      { id: "1-2", title: "Electric Dreams", artist: "Synthwave Kid", duration: 198, audioUrl: SAMPLE_AUDIO[1] },
      { id: "1-3", title: "Retrograde", artist: "Neon Pulse", duration: 267, audioUrl: SAMPLE_AUDIO[2] },
    ],
  },
  {
    id: "2",
    title: "Ocean Waves",
    description: "Calm ambient sounds to help you focus",
    cover: album2,
    tracks: [
      { id: "2-1", title: "Deep Blue", artist: "Aqua Beats", duration: 312, audioUrl: SAMPLE_AUDIO[1] },
      { id: "2-2", title: "Tidal Flow", artist: "Ocean Mind", duration: 278, audioUrl: SAMPLE_AUDIO[2] },
      { id: "2-3", title: "Coral Reef", artist: "Aqua Beats", duration: 245, audioUrl: SAMPLE_AUDIO[3] },
    ],
  },
  {
    id: "3",
    title: "Sunset Sessions",
    description: "Warm beats for golden hour moments",
    cover: album3,
    tracks: [
      { id: "3-1", title: "Golden Hour", artist: "Horizon", duration: 203, audioUrl: SAMPLE_AUDIO[2] },
      { id: "3-2", title: "Amber Skies", artist: "Dusk Valley", duration: 256, audioUrl: SAMPLE_AUDIO[3] },
      { id: "3-3", title: "Afterglow", artist: "Horizon", duration: 189, audioUrl: SAMPLE_AUDIO[4] },
    ],
  },
  {
    id: "4",
    title: "Forest Chill",
    description: "Nature-inspired downtempo grooves",
    cover: album4,
    tracks: [
      { id: "4-1", title: "Pine Whisper", artist: "Woodland", duration: 287, audioUrl: SAMPLE_AUDIO[3] },
      { id: "4-2", title: "Mossy Path", artist: "Green Echo", duration: 234, audioUrl: SAMPLE_AUDIO[4] },
      { id: "4-3", title: "Morning Mist", artist: "Woodland", duration: 312, audioUrl: SAMPLE_AUDIO[5] },
    ],
  },
  {
    id: "5",
    title: "Cosmic Journey",
    description: "Space ambient for stargazing nights",
    cover: album5,
    tracks: [
      { id: "5-1", title: "Nebula", artist: "Stardust", duration: 345, audioUrl: SAMPLE_AUDIO[4] },
      { id: "5-2", title: "Light Years", artist: "Cosmos", duration: 289, audioUrl: SAMPLE_AUDIO[5] },
      { id: "5-3", title: "Supernova", artist: "Stardust", duration: 267, audioUrl: SAMPLE_AUDIO[0] },
    ],
  },
  {
    id: "6",
    title: "Urban Beats",
    description: "City-inspired hip-hop & lo-fi beats",
    cover: album6,
    tracks: [
      { id: "6-1", title: "Rooftop View", artist: "Metro Soul", duration: 198, audioUrl: SAMPLE_AUDIO[5] },
      { id: "6-2", title: "Street Lights", artist: "City Pulse", duration: 223, audioUrl: SAMPLE_AUDIO[0] },
      { id: "6-3", title: "Downtown", artist: "Metro Soul", duration: 256, audioUrl: SAMPLE_AUDIO[1] },
    ],
  },
];
