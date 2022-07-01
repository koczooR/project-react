import { useState, useEffect, useRef } from "react";
import { collisionsArray, textActivationArray, houseActivationArray, moveToCityArray, chestArray, otherHouses } from "./mapData";
import { img, foreground, foreground2, playerDown, playerUp, playerLeft, playerRight, npcMap, chestImg, openChest } from "./images";
import { Inventory } from "./Inventory";
import { Music } from "./Music";
import { InfoBox, HouseEnter, MoveToCity } from "./InfoBox";
import { TextBox } from "./TextBox";

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
    window.innerWidth / 2 - 22 <= value.x + 66 &&
    window.innerHeight / 2 + 68 >= value.y &&
    window.innerHeight / 2 + 68 / 2 <= value.y + 66
  );
};

export const Canvas = () => {
  const canvasRef = useRef();
  const defaultPosition = {
    x: window.innerWidth / 2 - 4620 / 2 + 66,
    y: window.innerHeight / 2 - 2640 / 2,
  };
  const [position, setPosition] = useState({ ...defaultPosition });
  const [playerDirection, setPlayerDirection] = useState(playerDown);
  const [npcPosition, setNpcPosition] = useState({
    x: window.innerWidth / 2 - 192 / 4 + 716,
    y: window.innerHeight / 2 - 66,
  });
  const [infoBox, setInfoBox] = useState(false);
  const [textBox, setTextBox] = useState(false);
  const [houseIsActive, setHouseIsActive] = useState(false);
  const [moveToCity, setMoveToCity] = useState(false);
  const [chest, setChest] = useState(chestImg);
  const [chestInfoBox, setChestInfoBox] = useState(false);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otherHousesActive, setOtherHousesActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    framesDrawn++;
    if (framesDrawn >= 5) {
      currentFrame++;
      framesDrawn = 0;
    }

    ctx.drawImage(img, position.x, position.y);
    ctx.drawImage(npcMap, srcX, srcY, 192 / 4, 68, npcPosition.x, npcPosition.y, 192 / 4, 68);
    ctx.drawImage(chest, position.x + 1490, position.y + 320);
    ctx.drawImage(playerDirection, srcX, srcY, 192 / 4, 68, canvas.width / 2 - 22, canvas.height / 2, 192 / 4, 68);
    ctx.drawImage(foreground2, position.x, position.y);
    ctx.drawImage(foreground, position.x, position.y);

    let borderMap = [];
    for (let i = 0; i < collisionsArray.length; i += 70) {
      borderMap.push(collisionsArray.slice(i, i + 70));
    }

    const borderElements = [];
    borderMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 1025) {
          borderElements.push({
            pos: {
              x: j * 66 + position.x,
              y: i * 66 + position.y,
            },
          });
        }
      });
    });

    let textActivationMap = [];
    for (let i = 0; i < textActivationArray.length; i += 70) {
      textActivationMap.push(textActivationArray.slice(i, i + 70));
    }

    const textActivationElements = [];
    textActivationMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 1025) {
          textActivationElements.push({
            pos: {
              x: j * 66 + position.x,
              y: i * 66 + position.y,
            },
          });
        }
      });
    });

    textActivationElements.forEach((el) => {
      if (isColliding({ value: { x: el.pos.x, y: el.pos.y } })) {
        setInfoBox(true);
      } else {
        setInfoBox(false);
        setTextBox(false);
      }
    });

    let houseActivationMap = [];
    for (let i = 0; i < houseActivationArray.length; i += 70) {
      houseActivationMap.push(houseActivationArray.slice(i, i + 70));
    }

    const houseActivationElements = [];
    houseActivationMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 1025) {
          houseActivationElements.push({
            pos: {
              x: j * 66 + position.x,
              y: i * 66 + position.y,
            },
          });
        }
      });
    });

    houseActivationElements.forEach((el) => {
      if (isColliding({ value: { x: el.pos.x, y: el.pos.y } })) {
        setHouseIsActive(true);
      } else {
        setHouseIsActive(false);
      }
    });

    let otherHousesMap = [];
    for (let i = 0; i < otherHouses.length; i += 70) {
      otherHousesMap.push(otherHouses.slice(i, i + 70));
    }

    const otherHousesElements = [];
    otherHousesMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 1025) {
          otherHousesElements.push({
            pos: {
              x: j * 66 + position.x + 33,
              y: i * 66 + position.y,
            },
          });
        }
      });
    });

    otherHousesElements.forEach((el) => {
      if (isColliding({ value: { x: el.pos.x, y: el.pos.y } })) {
        setOtherHousesActive(true);
      } else {
        setOtherHousesActive(false);
      }
    });

    let moveToCityMap = [];
    for (let i = 0; i < moveToCityArray.length; i += 70) {
      moveToCityMap.push(moveToCityArray.slice(i, i + 70));
    }

    const moveToCityElements = [];
    moveToCityMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 1025) {
          moveToCityElements.push({
            pos: {
              x: j * 66 + position.x,
              y: i * 66 + position.y,
            },
          });
        }
      });
    });

    moveToCityElements.forEach((el) => {
      if (isColliding({ value: { x: el.pos.x, y: el.pos.y } })) {
        setMoveToCity(true);
      } else {
        setMoveToCity(false);
      }
    });

    let chestMap = [];
    for (let i = 0; i < chestArray.length; i += 70) {
      chestMap.push(chestArray.slice(i, i + 70));
    }

    const chestElements = [];
    chestMap.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === 1025) {
          chestElements.push({
            pos: {
              x: j * 66 + position.x + 38,
              y: i * 66 + position.y,
            },
          });
        }
      });
    });

    chestElements.forEach((el) => {
      if (isColliding({ value: { x: el.pos.x, y: el.pos.y } })) {
        setChestInfoBox(true);
      } else {
        setChestInfoBox(false);
        setAlert(false);
        setSuccess(false);
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
          setNpcPosition((prevState) => ({
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
          setNpcPosition((prevState) => ({
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
          setNpcPosition((prevState) => ({
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
          setNpcPosition((prevState) => ({
            ...prevState,
            x: prevState.x - speed,
          }));
        }
      }

      if (e.key === "e") {
        textActivationElements.forEach((el) => {
          if (isColliding({ value: { x: el.pos.x, y: el.pos.y } }) && e.key === "e") {
            setTextBox(!textBox);
          }
        });

        chestElements.forEach((el) => {
          if (isColliding({ value: { x: el.pos.x, y: el.pos.y } }) && e.key === "e") {
            setChest(openChest);

            if (localStorage.getItem("item") === "https://i.ibb.co/smmJnnk/potion.png") {
              setAlert(true);
              setSuccess(false);
            } else {
              localStorage.setItem("item", "https://i.ibb.co/smmJnnk/potion.png");
              setSuccess(true);
            }
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
      {infoBox ? <InfoBox /> : null}
      {textBox ? <TextBox /> : null}
      {houseIsActive ? <HouseEnter /> : null}
      {otherHousesActive ? <div className="house_enter_text">Work in Progress...</div> : null}
      {moveToCity ? <MoveToCity /> : null}
      {chestInfoBox ? <div className="info_box">To interact press 'E' button.</div> : null}
      {alert ? <div className="alert">The chest is empty.</div> : null}
      {success ? <div className="success_alert">Congratulations, you've found the item!</div> : null}
      <Inventory />
      <canvas ref={canvasRef} />
    </>
  );
};
