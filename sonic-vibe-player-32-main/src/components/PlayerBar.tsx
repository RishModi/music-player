import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Track } from "@/data/musicData";
import { Slider } from "@/components/ui/slider";

interface PlayerBarProps {
  track: Track | null;
  coverUrl: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (v: number) => void;
}

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlayerBar({
  track,
  coverUrl,
  isPlaying,
  currentTime,
  duration,
  volume,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
}: PlayerBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[5.5rem] bg-player border-t border-border z-40 flex items-center px-4 gap-4">
      {/* Track info */}
      <div className="flex items-center gap-3 w-1/4 min-w-0">
        {coverUrl ? (
          <img src={coverUrl} alt="" className="h-14 w-14 rounded-md object-cover shadow-md shrink-0" />
        ) : (
          <div className="h-14 w-14 rounded-md bg-muted shrink-0" />
        )}
        {track && (
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
            <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-1 max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={onPrev}
            className="text-muted-foreground hover:text-foreground transition-colors"
            disabled={!track}
          >
            <SkipBack className="h-5 w-5" fill="currentColor" />
          </button>
          <button
            onClick={onTogglePlay}
            disabled={!track}
            className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-40"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-background" fill="currentColor" />
            ) : (
              <Play className="h-4 w-4 text-background ml-0.5" fill="currentColor" />
            )}
          </button>
          <button
            onClick={onNext}
            className="text-muted-foreground hover:text-foreground transition-colors"
            disabled={!track}
          >
            <SkipForward className="h-5 w-5" fill="currentColor" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-muted-foreground w-10 text-right tabular-nums">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={([v]) => onSeek(v)}
            className="flex-1"
            disabled={!track}
          />
          <span className="text-[11px] text-muted-foreground w-10 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden md:flex items-center gap-2 w-1/4 justify-end">
        <button
          onClick={() => onVolumeChange(volume === 0 ? 0.7 : 0)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={([v]) => onVolumeChange(v)}
          className="w-24"
        />
      </div>
    </div>
  );
}
