import { useState, useEffect } from "react";
import { useCanvas } from "./useCanvas";

const img = new Image();
img.src = require("./assets/img/myProjectMap.png");

const playerDown = new Image();
playerDown.src = require("./assets/img/playerDown.png");

const playerUp = new Image();
playerUp.src = require("./assets/img/playerUp.png");

const playerLeft = new Image();
playerLeft.src = require("./assets/img/playerLeft.png");

const playerRight = new Image();
playerRight.src = require("./assets/img/playerRight.png");

export const Canvas = () => {
  const defaultPosition = {
    x: Math.floor(window.innerWidth / 2 - 4620 / 2 + 66),
    y: Math.floor(window.innerHeight / 2 - 2640 / 2),
  };
  const [position, setPosition] = useState({ ...defaultPosition });
  const [playerDirection, setPlayerDirection] = useState(playerDown);

  const canvasRef = useCanvas(([canvas, ctx]) => {
    ctx.drawImage(img, position.x, position.y);

    ctx.drawImage(
      playerDirection,
      0,
      0,
      192 / 4,
      68,
      canvas.width / 2 - 22,
      canvas.height / 2,
      192 / 4,
      68
    );
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "w") {
        setPlayerDirection(playerUp);
        setPosition((prevState) => ({ ...prevState, y: prevState.y + 8 }));
      }

      if (e.key === "s") {
        setPlayerDirection(playerDown);
        setPosition((prevState) => ({ ...prevState, y: prevState.y - 8 }));
      }

      if (e.key === "a") {
        setPlayerDirection(playerLeft);
        setPosition((prevState) => ({ ...prevState, x: prevState.x + 8 }));
      }

      if (e.key === "d") {
        setPlayerDirection(playerRight);
        setPosition((prevState) => ({ ...prevState, x: prevState.x - 8 }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

// export const Canvas = () => {
//   const canvasRef = useRef();

//   const defaultPosition = {
//     x: Math.floor(window.innerWidth / 2 - 4620 / 2 + 66),
//     y: Math.floor(window.innerHeight / 2 - 2640 / 2),
//   };

//   const [position, setPosition] = useState({ ...defaultPosition });
//   const [playerDirection, setPlayerDirection] = useState(playerDown);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     canvas.height = window.innerHeight;
//     canvas.width = window.innerWidth;

//     ctx.drawImage(img, position.x, position.y);

//     ctx.drawImage(
//       playerDirection,
//       0,
//       0,
//       192 / 4,
//       68,
//       canvas.width / 2 - 22,
//       canvas.height / 2,
//       192 / 4,
//       68
//     );

//     const handleKeyDown = (e) => {
//       if (e.key === "w") {
//         setPlayerDirection(playerUp);
//         setPosition((prevState) => ({ ...prevState, y: prevState.y + 2 }));
//         console.log(position.y);
//       }

//       if (e.key === "s") {
//         setPlayerDirection(playerDown);
//         setPosition((prevState) => ({ ...prevState, y: prevState.y - 2 }));
//       }

//       if (e.key === "a") {
//         setPlayerDirection(playerLeft);
//         setPosition((prevState) => ({ ...prevState, x: prevState.x + 2 }));
//       }

//       if (e.key === "d") {
//         setPlayerDirection(playerRight);
//         setPosition((prevState) => ({ ...prevState, x: prevState.x - 2 }));
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);

//     return function cleanup() {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [position.x, position.y, playerDirection]);

//   return (
//     <>
//       <canvas ref={canvasRef} />
//     </>
//   );
// };
