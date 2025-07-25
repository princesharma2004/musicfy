import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
} from 'react-icons/fa'
import { useContext, useRef, useState, useEffect } from 'react'
import { SongContext } from '../context/SongContext'

export default function Player() {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    songs,
    currentIndex,
    setCurrentIndex,
  } = useContext(SongContext)

  const audioRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  const formatTime = (time) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const playPrev = () => {
    if (!songs.length || !audioRef.current) return

    if (audioRef.current.currentTime >= 5) {
      audioRef.current.currentTime = 0
    } else {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1
      setCurrentIndex(prevIndex)
      setIsPlaying(true)
    }
  }

  const playNext = () => {
    if (!songs.length) return
    const nextIndex = (currentIndex + 1) % songs.length
    setCurrentIndex(nextIndex)
    setIsPlaying(true)
  }

  const handleSeek = (e) => {
    const percent = e.target.value / 100
    if (audioRef.current && duration) {
      audioRef.current.currentTime = percent * duration
    }
  }

  const handleVolume = (e) => {
    const vol = e.target.value / 100
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration || 0)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [currentSong])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      audioRef.current.volume = volume
      if (isPlaying) {
        audioRef.current.play().catch(() => {})
      }
    }
    setCurrentTime(0)
    setDuration(0)
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => playNext()

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [playNext, setIsPlaying])

  if (!currentSong) return null

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-neutral-900 text-white px-6 flex items-center justify-between border-t border-neutral-700 z-50">
      {/* Left */}
      <div className="flex items-center gap-4 w-1/3">
        <img
          src={`http://localhost:8000${currentSong.poster_url}`}
          alt="Cover"
          className="w-14 h-14 rounded object-cover"
        />
        <div>
          <h4 className="text-sm font-semibold">{currentSong.title}</h4>
          <p className="text-xs text-neutral-400">
            {isPlaying ? 'Playing...' : 'Paused'}
          </p>
        </div>
      </div>

      {/* Center */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-6 mb-2">
          <FaStepBackward
            className="cursor-pointer hover:scale-110 transition"
            onClick={playPrev}
          />
          {isPlaying ? (
            <FaPause
              onClick={togglePlay}
              className="text-xl cursor-pointer hover:scale-110 transition"
            />
          ) : (
            <FaPlay
              onClick={togglePlay}
              className="text-xl cursor-pointer hover:scale-110 transition"
            />
          )}
          <FaStepForward
            className="cursor-pointer hover:scale-110 transition"
            onClick={playNext}
          />
        </div>
        <div className="flex items-center gap-2 text-xs w-full">
          <span className="text-neutral-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="w-full accent-green-500 h-1"
          />
          <span className="text-neutral-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-end gap-2 w-1/3">
        <FaVolumeUp />
        <input
          type="range"
          min={0}
          max={100}
          value={volume * 100}
          onChange={handleVolume}
          className="w-24 accent-white h-1"
        />
      </div>

      {/* Hidden Audio */}
      <audio ref={audioRef}>
        <source
          src={`http://localhost:8000${currentSong.audio_url}`}
          type="audio/mpeg"
        />
      </audio>
    </footer>
  )
}