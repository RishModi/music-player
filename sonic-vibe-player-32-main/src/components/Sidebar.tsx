import { Home, Search, Library, Music2, ListMusic } from "lucide-react";
import { Playlist } from "@/data/musicData";

interface SidebarProps {
  playlists: Playlist[];
  activePlaylistId: string | null;
  activeView: "home" | "search" | "playlist";
  onSelectPlaylist: (playlist: Playlist) => void;
  onNavigate: (view: "home" | "search") => void;
  isOpen: boolean;
}

export default function Sidebar({ playlists, activePlaylistId, activeView, onSelectPlaylist, onNavigate, isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 bottom-[5.5rem] z-30 w-60 bg-sidebar flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center gap-2 px-6 py-5">
        <Music2 className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold text-foreground tracking-tight">Soundwave</span>
      </div>

      <nav className="px-3 space-y-1">
        <NavItem icon={<Home className="h-5 w-5" />} label="Home" active={activeView === "home"} onClick={() => onNavigate("home")} />
        <NavItem icon={<Search className="h-5 w-5" />} label="Search" active={activeView === "search"} onClick={() => onNavigate("search")} />
        <NavItem icon={<Library className="h-5 w-5" />} label="Your Library" />
      </nav>

      <div className="mt-6 px-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Playlists</h3>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 space-y-0.5">
        {playlists.map((pl) => (
          <button
            key={pl.id}
            onClick={() => onSelectPlaylist(pl)}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
              activePlaylistId === pl.id
                ? "bg-sidebar-accent text-foreground"
                : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <ListMusic className="h-4 w-4 shrink-0" />
            <span className="truncate">{pl.title}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
        active
          ? "text-foreground bg-sidebar-accent"
          : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
