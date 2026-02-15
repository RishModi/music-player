import { useState, useRef, useCallback, useEffect } from "react";
import { Track, Playlist } from "@/data/musicData";

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => playNext();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playTrack = useCallback((track: Track, playlist: Playlist) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      return;
    }

    audio.src = track.audioUrl;
    audio.play();
    setCurrentTrack(track);
    setCurrentPlaylist(playlist);
    setIsPlaying(true);
  }, [currentTrack, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack]);

  const playNext = useCallback(() => {
    if (!currentPlaylist || !currentTrack) return;
    const idx = currentPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
    const next = currentPlaylist.tracks[(idx + 1) % currentPlaylist.tracks.length];
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = next.audioUrl;
    audio.play();
    setCurrentTrack(next);
    setIsPlaying(true);
  }, [currentPlaylist, currentTrack]);

  const playPrev = useCallback(() => {
    if (!currentPlaylist || !currentTrack) return;
    const idx = currentPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
    const prev = currentPlaylist.tracks[(idx - 1 + currentPlaylist.tracks.length) % currentPlaylist.tracks.length];
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = prev.audioUrl;
    audio.play();
    setCurrentTrack(prev);
    setIsPlaying(true);
  }, [currentPlaylist, currentTrack]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const changeVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = v;
    setVolume(v);
  }, []);

  return {
    currentTrack,
    currentPlaylist,
    isPlaying,
    currentTime,
    duration,
    volume,
    playTrack,
    togglePlay,
    playNext,
    playPrev,
    seek,
    changeVolume,
  };
}
