import { Link } from "react-router-dom";
import sound from "./assets/music/pika.mp3";

export const Main = () => {
  const audio = new Audio(sound);
  audio.volume = 0.05;

  return (
    <main className="container">
      <Link onClick={() => audio.play()} to="/canvas" className="btn">
        Start
      </Link>
    </main>
  );
};
