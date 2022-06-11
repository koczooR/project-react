import { useState, useEffect } from "react";
import { useCanvas } from "./useCanvas";
import { collisionsArray } from "./mapData";
import {
  img,
  foreground,
  foreground2,
  playerDown,
  playerUp,
  playerLeft,
  playerRight,
  npcMap,
} from "./images";

const speed = 10;

const totalFrames = 4;
let currentFrame = 0;
let framesDrawn = 0;
let srcX = 0;
let srcY = 0;

const playerMovement = () => {
  currentFrame = currentFrame % totalFrames;
  srcX = currentFrame * (192 / 4);
};

export const Canvas = () => {
  const defaultPosition = {
    x: Math.floor(window.innerWidth / 2 - 4620 / 2 + 66),
    y: Math.floor(window.innerHeight / 2 - 2640 / 2),
  };
  const [position, setPosition] = useState({ ...defaultPosition });
  const [playerDirection, setPlayerDirection] = useState(playerDown);
  const [npcPosition, setNpcPosition] = useState({
    x: Math.floor(window.innerWidth / 2 - 192 / 4 + 716),
    y: Math.floor(window.innerHeight / 2 - 66),
  });

  framesDrawn++;
  if (framesDrawn >= 5) {
    currentFrame++;
    framesDrawn = 0;
  }

  const canvasRef = useCanvas(([canvas, ctx]) => {
    ctx.drawImage(img, position.x, position.y);

    ctx.drawImage(
      playerDirection,
      srcX,
      srcY,
      192 / 4,
      68,
      canvas.width / 2 - 22,
      canvas.height / 2,
      192 / 4,
      68
    );

    ctx.drawImage(
      npcMap,
      srcX,
      srcY,
      192 / 4,
      68,
      npcPosition.x,
      npcPosition.y,
      192 / 4,
      68
    );

    ctx.drawImage(foreground, position.x, position.y);
    ctx.drawImage(foreground2, position.x, position.y);

    let borderMap = [];
    for (let i = 0; i < collisionsArray.length; i += 70) {
      borderMap.push(collisionsArray.slice(i, i + 70));
    }

    const borderElements = [];
    borderMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 1025) {
          ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
          borderElements.push(
            ctx.fillRect(j * 66 + position.x, i * 66 + position.y, 66, 66)
          );
        }
      });
    });
  });

  const keyPress = (e) => {
    if (e.key === "w") {
      setPlayerDirection(playerUp);
      setPosition((prevState) => ({ ...prevState, y: prevState.y + speed }));
      playerMovement();
      setNpcPosition((prevState) => ({
        ...prevState,
        y: prevState.y + speed,
      }));
    }

    if (e.key === "s") {
      setPlayerDirection(playerDown);
      setPosition((prevState) => ({ ...prevState, y: prevState.y - speed }));
      playerMovement();
      setNpcPosition((prevState) => ({
        ...prevState,
        y: prevState.y - speed,
      }));
    }

    if (e.key === "a") {
      setPlayerDirection(playerLeft);
      setPosition((prevState) => ({ ...prevState, x: prevState.x + speed }));
      playerMovement();
      setNpcPosition((prevState) => ({
        ...prevState,
        x: prevState.x + speed,
      }));
    }

    if (e.key === "d") {
      setPlayerDirection(playerRight);
      setPosition((prevState) => ({ ...prevState, x: prevState.x - speed }));
      playerMovement();
      setNpcPosition((prevState) => ({
        ...prevState,
        x: prevState.x - speed,
      }));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyPress);
    return () => window.removeEventListener("keydown", keyPress);
  });

  return <canvas ref={canvasRef} />;
};
