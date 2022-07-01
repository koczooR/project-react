import { useState, useEffect, useRef } from "react";
import { house, houseForeground, playerDown, playerUp, playerLeft, playerRight } from "./images";
import { houseCollisionsArray, exitActivationArray, hicksArray, npcInteractArray } from "./houseData";
import { Inventory } from "./Inventory";
import { Music } from "./Music";
import { InfoBox, HouseExit } from "./InfoBox";
import { NpcInteractTextBox } from "./TextBox";
import sound from "./assets/music/hiccup.mp3";

const speed = 10;

const totalFrames = 4;
let currentFrame = 0;
let framesDrawn = 0;
let srcX = 0;
let srcY = 0;

const audio = new Audio(sound);
audio.volume = 0.1;

const playerMovement = () => {
  currentFrame = currentFrame % totalFrames;
  srcX = currentFrame * (192 / 4);
};

const isColliding = ({ value }) => {
  return (
    window.innerWidth / 2 - 22 + 192 / 4 >= value.x &&
    window.innerWidth / 2 - 22 <= value.x + 88 &&
    window.innerHeight / 2 + 68 >= value.y &&
    window.innerHeight / 2 <= value.y + 88
  );
};

export const House = () => {
  const houseRef = useRef();
  const defaultPosition = {
    x: window.innerWidth / 2 - 3520 / 2 + 176,
    y: window.innerHeight / 2 - 3564 / 2 - 132,
  };
  const [position, setPosition] = useState({ ...defaultPosition });
  const [playerDirection, setPlayerDirection] = useState(playerUp);
  const [houseIsActive, setHouseIsActive] = useState(false);
  const [infoBox, setInfoBox] = useState(false);
  const [showHicks, setShowHicks] = useState(false);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [textBox, setTextBox] = useState(false);

  useEffect(() => {
    const canvas = houseRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    framesDrawn++;
    if (framesDrawn >= 5) {
      currentFrame++;
      framesDrawn = 0;
    }

    ctx.drawImage(house, position.x, position.y);
    ctx.drawImage(playerDirection, srcX, srcY, 192 / 4, 68, canvas.width / 2 - 22, canvas.height / 2, 192 / 4, 68);
    ctx.drawImage(houseForeground, position.x, position.y);

    let borderMap = [];
    for (let i = 0; i < houseCollisionsArray.length; i += 40) {
      borderMap.push(houseCollisionsArray.slice(i, i + 40));
    }

    const borderElements = [];
    borderMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 770) {
          borderElements.push({
            pos: {
              x: j * 88 + position.x,
              y: i * 88 + position.y,
            },
          });
        }
      });
    });

    let houseExit = [];
    for (let i = 0; i < exitActivationArray.length; i += 40) {
      houseExit.push(exitActivationArray.slice(i, i + 40));
    }

    const houseExitElements = [];
    houseExit.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 770) {
          houseExitElements.push({
            pos: {
              x: j * 88 + position.x,
              y: i * 88 + position.y,
            },
          });
        }
      });
    });

    houseExitElements.forEach((el) => {
      if (isColliding({ value: { x: el.pos.x, y: el.pos.y } })) {
        setHouseIsActive(true);
      } else {
        setHouseIsActive(false);
      }
    });

    let hicksMap = [];
    for (let i = 0; i < hicksArray.length; i += 40) {
      hicksMap.push(hicksArray.slice(i, i + 40));
    }

    const hicksElements = [];
    hicksMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 770) {
          hicksElements.push({
            pos: {
              x: j * 88 + position.x + 50,
              y: i * 88 + position.y,
            },
          });
        }
      });
    });

    hicksElements.forEach((el) => {
      if (isColliding({ value: { x: el.pos.x, y: el.pos.y } })) {
        setInfoBox(true);
      } else {
        setInfoBox(false);
      }
    });

    let npcInteractMap = [];
    for (let i = 0; i < npcInteractArray.length; i += 40) {
      npcInteractMap.push(npcInteractArray.slice(i, i + 40));
    }

    const npcInteractElements = [];
    npcInteractMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 770) {
          npcInteractElements.push({
            pos: {
              x: j * 88 + position.x,
              y: i * 88 + position.y,
            },
          });
        }
      });
    });

    npcInteractElements.forEach((el) => {
      if (isColliding({ value: { x: el.pos.x, y: el.pos.y } })) {
        setShowInfoBox(true);
      } else {
        setShowInfoBox(false);
        setTextBox(false);
      }
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

      if (e.key === "e") {
        hicksElements.forEach((el) => {
          if (isColliding({ value: { x: el.pos.x, y: el.pos.y } }) && e.key === "e") {
            audio.play();
            let counter = 1;
            setShowHicks(true);

            setTimeout(() => {
              setShowHicks(false);
            }, 2000);

            const interval = setInterval(() => {
              setShowHicks(true);
              audio.play();
              counter++;

              setTimeout(() => {
                setShowHicks(false);
              }, 2000);

              if (counter > 4) {
                clearInterval(interval);
              }
            }, 5000);
          }
        });

        npcInteractElements.forEach((el) => {
          if (isColliding({ value: { x: el.pos.x, y: el.pos.y } }) && e.key === "e") {
            setTextBox(true);
          } else {
            setTextBox(false);
          }
        });
      }
    };

    window.addEventListener("keydown", keyPress);
    return () => window.removeEventListener("keydown", keyPress);
  });

  return (
    <>
      <Music />
      <Inventory />
      {infoBox ? <InfoBox /> : null}
      {showInfoBox ? <div className="info_box">To interact press 'E' button.</div> : null}
      {textBox ? <NpcInteractTextBox /> : null}
      {showHicks ? <p className="hicks">Hicks...</p> : null}
      {houseIsActive ? <HouseExit /> : null}
      <canvas ref={houseRef} />
    </>
  );
};
