import { useMemo } from "react";
import { Search, Play, Pause, Music } from "lucide-react";
import { Playlist, Track } from "@/data/musicData";

interface SearchViewProps {
  query: string;
  onQueryChange: (q: string) => void;
  playlists: Playlist[];
  onSelectPlaylist: (playlist: Playlist) => void;
  onPlayTrack: (track: Track, playlist: Playlist) => void;
  currentTrackId: string | null;
  isPlaying: boolean;
}

export default function SearchView({
  query,
  onQueryChange,
  playlists,
  onSelectPlaylist,
  onPlayTrack,
  currentTrackId,
  isPlaying,
}: SearchViewProps) {
  const q = query.toLowerCase().trim();

  const filteredPlaylists = useMemo(
    () => playlists.filter((pl) => pl.title.toLowerCase().includes(q) || pl.description.toLowerCase().includes(q)),
    [playlists, q]
  );

  const matchedTracks = useMemo(() => {
    if (!q) return [];
    const results: { track: Track; playlist: Playlist }[] = [];
    for (const pl of playlists) {
      for (const t of pl.tracks) {
        if (t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)) {
          results.push({ track: t, playlist: pl });
        }
      }
    }
    return results;
  }, [playlists, q]);

  return (
    <div className="animate-fade-in">
      {/* Search input */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search playlists, songs, or artists..."
          autoFocus
          className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-full py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
        />
      </div>

      {!q && (
        <p className="text-muted-foreground text-sm">Start typing to search playlists, songs, and artists.</p>
      )}

      {q && (
        <>
          {/* Matching playlists */}
          {filteredPlaylists.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredPlaylists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => onSelectPlaylist(pl)}
                    className="group relative bg-card rounded-lg p-4 transition-all duration-300 hover:bg-surface-hover text-left w-full"
                  >
                    <img
                      src={pl.cover}
                      alt={pl.title}
                      className="w-full aspect-square object-cover rounded-md shadow-lg mb-3"
                    />
                    <h3 className="font-semibold text-foreground text-sm truncate">{pl.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{pl.description}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Matching tracks */}
          {matchedTracks.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Songs</h2>
              <div className="space-y-1">
                {matchedTracks.map(({ track, playlist }) => {
                  const isCurrent = currentTrackId === track.id;
                  return (
                    <button
                      key={`${playlist.id}-${track.id}`}
                      onClick={() => onPlayTrack(track, playlist)}
                      className={`flex items-center gap-4 w-full px-4 py-3 rounded-md text-sm transition-colors duration-200 group ${
                        isCurrent ? "bg-accent text-primary" : "hover:bg-accent/50 text-foreground"
                      }`}
                    >
                      <img src={playlist.cover} alt="" className="h-10 w-10 rounded object-cover shrink-0" />
                      <div className="flex-1 text-left min-w-0">
                        <p className={`font-medium truncate ${isCurrent ? "text-primary" : ""}`}>{track.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{track.artist} · {playlist.title}</p>
                      </div>
                      <span className="shrink-0">
                        {isCurrent && isPlaying ? (
                          <Pause className="h-4 w-4 text-primary" fill="currentColor" />
                        ) : (
                          <Play className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {filteredPlaylists.length === 0 && matchedTracks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Music className="h-12 w-12 mb-4 opacity-40" />
              <p className="text-sm">No results found for "{query}"</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
