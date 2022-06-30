import { useState, useEffect, useRef } from "react";
import { city, cityForeground, playerDown, playerUp, playerLeft, playerRight } from "./images";
import { Inventory } from "./Inventory";
import { Music } from "./Music";
import { cityArray } from "./cityData";

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

const isColliding = ({ value }) => {
  return (
    window.innerWidth / 2 - 22 + 192 / 4 >= value.x &&
    window.innerWidth / 2 - 22 <= value.x + 88 &&
    window.innerHeight / 2 + 68 >= value.y &&
    window.innerHeight / 2 + 68 / 2 <= value.y + 88
  );
};

export const City = () => {
  const cityRef = useRef();
  const defaultPosition = {
    x: window.innerWidth / 2 - 6160 / 2 + 176,
    y: window.innerHeight / 2 - 3520 / 2 + 150,
  };
  const [position, setPosition] = useState({ ...defaultPosition });
  const [playerDirection, setPlayerDirection] = useState(playerDown);

  useEffect(() => {
    const canvas = cityRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    framesDrawn++;
    if (framesDrawn >= 5) {
      currentFrame++;
      framesDrawn = 0;
    }

    ctx.drawImage(city, position.x, position.y);
    ctx.drawImage(playerDirection, srcX, srcY, 192 / 4, 68, canvas.width / 2 - 22, canvas.height / 2, 192 / 4, 68);
    ctx.drawImage(cityForeground, position.x, position.y);

    let borderMap = [];
    for (let i = 0; i < cityArray.length; i += 70) {
      borderMap.push(cityArray.slice(i, i + 70));
    }

    const borderElements = [];
    borderMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 5121) {
          borderElements.push({
            pos: {
              x: j * 88 + position.x,
              y: i * 88 + position.y,
            },
          });
        }
      });
    });

    const keyPress = (e) => {
      let moving = true;
      if (e.key === "w") {
        setPlayerDirection(playerUp);
        playerMovement();

        borderElements.forEach((el) => {
          if (isColliding({ value: { x: el.pos.x, y: el.pos.y + speed } })) {
            moving = false;
          }
        });
        if (moving) {
          setPosition((prevState) => ({
            ...prevState,
            y: prevState.y + speed,
          }));
        }
      }

      if (e.key === "s") {
        setPlayerDirection(playerDown);
        playerMovement();

        borderElements.forEach((el) => {
          if (isColliding({ value: { x: el.pos.x, y: el.pos.y - speed } })) {
            moving = false;
          }
        });
        if (moving) {
          setPosition((prevState) => ({
            ...prevState,
            y: prevState.y - speed,
          }));
        }
      }

      if (e.key === "a") {
        setPlayerDirection(playerLeft);
        playerMovement();

        borderElements.forEach((el) => {
          if (isColliding({ value: { x: el.pos.x + speed, y: el.pos.y } })) {
            moving = false;
          }
        });
        if (moving) {
          setPosition((prevState) => ({
            ...prevState,
            x: prevState.x + speed,
          }));
        }
      }

      if (e.key === "d") {
        setPlayerDirection(playerRight);
        playerMovement();

        borderElements.forEach((el) => {
          if (isColliding({ value: { x: el.pos.x - speed, y: el.pos.y } })) {
            moving = false;
          }
        });
        if (moving) {
          setPosition((prevState) => ({
            ...prevState,
            x: prevState.x - speed,
          }));
        }
      }
    };

    window.addEventListener("keydown", keyPress);
    return () => window.removeEventListener("keydown", keyPress);
  });

  return (
    <>
      <Music />
      <Inventory />
      <canvas ref={cityRef} />
    </>
  );
};
