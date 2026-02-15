import { Play, Pause, Clock } from "lucide-react";
import { Playlist, Track } from "@/data/musicData";

interface PlaylistViewProps {
  playlist: Playlist;
  currentTrackId: string | null;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onBack: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlaylistView({ playlist, currentTrackId, isPlaying, onPlayTrack, onBack }: PlaylistViewProps) {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-end gap-6 mb-8">
        <img
          src={playlist.cover}
          alt={playlist.title}
          className="w-48 h-48 rounded-lg shadow-2xl object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">Playlist</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 truncate">{playlist.title}</h1>
          <p className="text-sm text-muted-foreground">{playlist.description}</p>
          <p className="text-sm text-muted-foreground mt-1">{playlist.tracks.length} songs</p>
        </div>
      </div>

      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        ← Back to all playlists
      </button>

      {/* Track list */}
      <div className="space-y-1">
        {/* Header row */}
        <div className="grid grid-cols-[2rem_1fr_6rem] gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border mb-2">
          <span>#</span>
          <span>Title</span>
          <span className="flex justify-end"><Clock className="h-4 w-4" /></span>
        </div>

        {playlist.tracks.map((track, i) => {
          const isCurrent = currentTrackId === track.id;
          return (
            <button
              key={track.id}
              onClick={() => onPlayTrack(track)}
              className={`grid grid-cols-[2rem_1fr_6rem] gap-4 px-4 py-3 rounded-md text-sm w-full transition-colors duration-200 group ${
                isCurrent
                  ? "bg-accent text-primary"
                  : "hover:bg-accent/50 text-foreground"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="flex items-center justify-center">
                {isCurrent && isPlaying ? (
                  <Pause className="h-4 w-4 text-primary" fill="currentColor" />
                ) : isCurrent ? (
                  <Play className="h-4 w-4 text-primary" fill="currentColor" />
                ) : (
                  <span className="text-muted-foreground group-hover:hidden">{i + 1}</span>
                )}
                {!isCurrent && (
                  <Play className="h-4 w-4 hidden group-hover:block text-foreground" fill="currentColor" />
                )}
              </span>
              <div className="text-left min-w-0">
                <p className={`font-medium truncate ${isCurrent ? "text-primary" : ""}`}>{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
              <span className="flex items-center justify-end text-muted-foreground text-xs">
                {formatTime(track.duration)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
