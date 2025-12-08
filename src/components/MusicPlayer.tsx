import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
}

// Free music tracks from reliable public sources
const tracks: Track[] = [
  {
    id: 1,
    title: "Epic Cinematic",
    artist: "Pixabay Music",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
  },
  {
    id: 2,
    title: "Lofi Study",
    artist: "FASSounds",
    url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b0939c8.mp3",
  },
  {
    id: 3,
    title: "Chill Abstract",
    artist: "Coma-Media",
    url: "https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3",
  },
];

interface MusicPlayerProps {
  onVolumeChange?: (volume: number) => void;
}

export const MusicPlayer = ({ onVolumeChange }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
    onVolumeChange?.(isMuted ? 0 : volume);
  }, [volume, isMuted, onVolumeChange]);

  // Handle track changes - use audio event listeners instead of timeouts
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch(() => {
          // Autoplay may be blocked by browser
          setIsPlaying(false);
        });
      }
    };

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay may be blocked
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-lg p-4 w-full"
    >
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" />

      {/* Album Art / Visualizer */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
          <Music className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">
            {currentTrack.title}
          </h4>
          <p className="text-xs text-muted-foreground truncate">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[progress]}
          max={duration || 100}
          step={1}
          onValueChange={handleSeek}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={prevTrack}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <SkipBack className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-primary hover:bg-primary/90 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-primary-foreground" />
          ) : (
            <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
          )}
        </button>
        <button
          onClick={nextTrack}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <SkipForward className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2">
        <button onClick={toggleMute} className="p-1">
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-8 text-right">
          {isMuted ? 0 : volume}%
        </span>
      </div>
    </motion.div>
  );
};
