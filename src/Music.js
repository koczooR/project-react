import { useState } from "react";
import sound from "./assets/music/field_theme_1_mp3.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const audio = new Audio(sound);
audio.volume = 0.05;
audio.loop = true;

export const Music = () => {
  const [play, setPlay] = useState(false);

  const playMusic = () => {
    setPlay(!play);
  };

  if (play) {
    audio.play();
  } else {
    audio.pause();
  }

  return (
    <div className="music_container" onClick={playMusic}>
      <FontAwesomeIcon icon={faPlay} size="2x" color="white" />
      <FontAwesomeIcon icon={faPause} size="2x" color="white" />
    </div>
  );
};
