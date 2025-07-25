import { createContext } from "react";

export const SongContext = createContext({
  songs: [],
  setSongs: () => {},
  currentSong: null,
  setCurrentSong: () => {},
  currentIndex: -1,
  setCurrentIndex: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
});
