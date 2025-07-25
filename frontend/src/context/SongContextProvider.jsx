import { useEffect, useState } from 'react';
import { SongContext } from './SongContext';

export const SongContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1); // Start with no song
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.songs);
        setCurrentIndex(-1);
        setCurrentSong(null);
      });
  }, []);

  useEffect(() => {
    if (songs.length > 0 && currentIndex >= 0 && currentIndex < songs.length) {
      setCurrentSong(songs[currentIndex]);
    }
  }, [currentIndex, songs]);

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        currentSong,
        setCurrentSong,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
