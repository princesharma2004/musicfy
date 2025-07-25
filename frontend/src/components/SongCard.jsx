import { useContext } from 'react';
import { SongContext } from '../context/SongContext';

export default function SongCard({ song, index }) {
  const { currentIndex, setCurrentIndex, isPlaying, setIsPlaying } = useContext(SongContext);

  const handleClick = () => {
    if (index === currentIndex) {
      setIsPlaying((prev) => !prev);
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="max-h-80 min-h-80 w-64 min-w-[180px] bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 rounded-xl p-4 cursor-pointer shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200"
    >
      {/* Poster Image */}
      <div className="overflow-hidden rounded-lg mb-4">
        <img
          src={`http://localhost:8000${song.poster_url}`}
          className="w-full h-50 object-cover transition-transform duration-200 hover:scale-105"
          alt={song.title}
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-white mb-1 truncate">{song.title}</h3>
      {/* Now Playing Indicator */}
      {(index === currentIndex && isPlaying)?
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-xs text-green-400">Now Playing</span>
        </div> :null}
      
    </div>
  );
}