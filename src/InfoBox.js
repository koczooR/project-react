import { Link } from "react-router-dom";
import sound from "./assets/music/pika.mp3";

const audio = new Audio(sound);
audio.volume = 0.05;

export const InfoBox = () => {
  return <div className="info_box">To interact press 'E' button.</div>;
};

export const HouseEnter = () => {
  return (
    <div className="house_enter_text">
      Do you want to enter?
      <Link onClick={() => audio.play()} to="/house" className="confirm">
        Confirm
      </Link>
    </div>
  );
};

export const HouseExit = () => {
  return (
    <div className="house_enter_text">
      Do you want to exit?
      <Link onClick={() => audio.play()} to="/canvas" className="confirm">
        Confirm
      </Link>
    </div>
  );
};

export const MoveToCity = () => {
  return (
    <div className="house_enter_text">
      Would you like to move to the city?
      <Link onClick={() => audio.play()} to="/city" className="confirm">
        Confirm
      </Link>
    </div>
  );
};
