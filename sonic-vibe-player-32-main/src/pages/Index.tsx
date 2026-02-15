import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import PlaylistCard from "@/components/PlaylistCard";
import PlaylistView from "@/components/PlaylistView";
import SearchView from "@/components/SearchView";
import PlayerBar from "@/components/PlayerBar";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { playlists, Playlist } from "@/data/musicData";

type View = "home" | "search" | "playlist";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const player = useAudioPlayer();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const openPlaylist = (pl: Playlist) => {
    setSelectedPlaylist(pl);
    setView("playlist");
    setSidebarOpen(false);
  };

  const goHome = () => {
    setView("home");
    setSelectedPlaylist(null);
  };

  const goSearch = () => {
    setView("search");
    setSelectedPlaylist(null);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Sidebar
        playlists={playlists}
        activePlaylistId={selectedPlaylist?.id ?? null}
        activeView={view}
        onSelectPlaylist={openPlaylist}
        onNavigate={(v) => {
          if (v === "home") goHome();
          else if (v === "search") goSearch();
        }}
        isOpen={sidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-60 overflow-y-auto scrollbar-thin pb-24">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-foreground"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h2 className="text-lg font-semibold text-foreground">
            {view === "search" ? "Search" : greeting()}
          </h2>
        </header>

        <main className="px-6 pb-8">
          {view === "playlist" && selectedPlaylist ? (
            <PlaylistView
              playlist={selectedPlaylist}
              currentTrackId={player.currentTrack?.id ?? null}
              isPlaying={player.isPlaying}
              onPlayTrack={(track) => player.playTrack(track, selectedPlaylist)}
              onBack={goHome}
            />
          ) : view === "search" ? (
            <SearchView
              query={searchQuery}
              onQueryChange={setSearchQuery}
              playlists={playlists}
              onSelectPlaylist={openPlaylist}
              onPlayTrack={(track, playlist) => player.playTrack(track, playlist)}
              currentTrackId={player.currentTrack?.id ?? null}
              isPlaying={player.isPlaying}
            />
          ) : (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-foreground mb-6">Featured Playlists</h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {playlists.map((pl, i) => (
                  <PlaylistCard
                    key={pl.id}
                    playlist={pl}
                    onClick={() => openPlaylist(pl)}
                    index={i}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <PlayerBar
        track={player.currentTrack}
        coverUrl={player.currentPlaylist?.cover ?? null}
        isPlaying={player.isPlaying}
        currentTime={player.currentTime}
        duration={player.duration}
        volume={player.volume}
        onTogglePlay={player.togglePlay}
        onNext={player.playNext}
        onPrev={player.playPrev}
        onSeek={player.seek}
        onVolumeChange={player.changeVolume}
      />
    </div>
  );
};

export default Index;
