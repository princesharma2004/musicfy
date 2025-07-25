import { useContext } from 'react';
import SongCard from './SongCard';
import { SongContext } from '../context/SongContext';

export default function Songs() {
  const { songs } = useContext(SongContext);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">Songs</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {songs.map((song, idx) => (
          <SongCard key={idx} song={song} index={idx}/>
        ))}
      </div>
    </div>
  );
}
