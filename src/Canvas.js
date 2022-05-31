import { useState, useEffect, useRef } from "react";

export const Canvas = () => {
  const canvasRef = useRef(null);

  const [, setBackground] = useState(null);
  const [posX, setPosX] = useState(window.innerWidth / 2 - 4620 / 2 + 66);
  const [posY, setPosY] = useState(window.innerHeight / 2 - 2640 / 2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const img = new Image();
    img.src = require("./assets/img/myProjectMap.png");

    const handleKeyDown = (e) => {
      if (e.key === "w") {
        setPosY((prevState) => prevState + 8);
      }

      if (e.key === "s") {
        setPosY((prevState) => prevState - 8);
      }

      if (e.key === "a") {
        setPosX((prevState) => prevState + 8);
      }

      if (e.key === "d") {
        setPosX((prevState) => prevState - 8);
      }
    };

    img.onload = () => {
      ctx.drawImage(img, posX, posY);
    };

    setBackground(ctx.drawImage(img, posX, posY));

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [posX, posY]);

  return <canvas ref={canvasRef} />;
};
