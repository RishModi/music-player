import { Play } from "lucide-react";
import { Playlist } from "@/data/musicData";

interface PlaylistCardProps {
  playlist: Playlist;
  onClick: () => void;
  index: number;
}

export default function PlaylistCard({ playlist, onClick, index }: PlaylistCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative bg-card rounded-lg p-4 transition-all duration-300 hover:bg-surface-hover text-left w-full"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative mb-4">
        <img
          src={playlist.cover}
          alt={playlist.title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <div className="absolute bottom-2 right-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
            <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-foreground text-sm truncate">{playlist.title}</h3>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{playlist.description}</p>
    </button>
  );
}
