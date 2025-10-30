import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import "../assets/css/voice.css";

export default function VoiceMessage({ src }) {
  const [audio] = useState(new Audio(src));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState("0:00");
  const [current, setCurrent] = useState("0:00");

  useEffect(() => {
    const update = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrent(formatTime(audio.currentTime));
      }
    };
    const load = () => setDuration(formatTime(audio.duration));
    const end = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", load);
    audio.addEventListener("ended", end);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", load);
      audio.removeEventListener("ended", end);
    };
  }, [audio]);

  const toggle = () => {
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const formatTime = (s) => {
    if (!s) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="voice-message">
      <IconButton
        onClick={toggle}
        size="small"
        className="voice-play-btn"
      >
        {isPlaying ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
      </IconButton>

      <div className="voice-progress">
        <div className="voice-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <span className="voice-time">{current} / {duration}</span>
    </div>
  );
}
