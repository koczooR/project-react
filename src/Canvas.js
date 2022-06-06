import { useState, useEffect, useRef } from "react";

const playerDown = new Image();

export const Canvas = () => {
  const canvasRef = useRef(null);

  const [posX, setPosX] = useState(window.innerWidth / 2 - 4620 / 2 + 66);
  const [posY, setPosY] = useState(window.innerHeight / 2 - 2640 / 2);
  const [playerDirection, setPlayerDirection] = useState(playerDown);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const img = new Image();
    img.src = require("./assets/img/myProjectMap.png");

    // const playerDown = new Image();
    playerDown.src = require("./assets/img/playerDown.png");

    const playerUp = new Image();
    playerUp.src = require("./assets/img/playerUp.png");

    const playerLeft = new Image();
    playerLeft.src = require("./assets/img/playerLeft.png");

    const playerRight = new Image();
    playerRight.src = require("./assets/img/playerRight.png");

    ctx.drawImage(img, posX, posY);

    ctx.drawImage(
      playerDirection,
      0,
      0,
      192 / 4,
      68,
      window.innerWidth / 2 - 22,
      window.innerHeight / 2,
      192 / 4,
      68
    );

    const handleKeyDown = (e) => {
      if (e.key === "w") {
        setPlayerDirection(playerUp);
        setPosY((prevState) => prevState + 8);
      }

      if (e.key === "s") {
        setPlayerDirection(playerDown);
        setPosY((prevState) => prevState - 8);
      }

      if (e.key === "a") {
        setPlayerDirection(playerLeft);
        setPosX((prevState) => prevState + 8);
      }

      if (e.key === "d") {
        setPlayerDirection(playerRight);
        setPosX((prevState) => prevState - 8);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [posX, posY, playerDirection]);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};
