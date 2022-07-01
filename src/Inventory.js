import { useState } from "react";

export const Inventory = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="inventoryBag" onClick={handleClick}></div>
      {isActive ? <Results /> : null}
    </>
  );
};

const Results = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="inventory">
      <p className="inventory_title">Inventory</p>
      <div className="inventory_wrapper">
        <div className="box">
          <img src={localStorage.getItem("item")} alt="" onClick={() => setShowMenu(!showMenu)} />
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
      {showMenu ? (
        <div className="info_box">
          <div onClick={() => localStorage.clear()}>Use</div>
          <div onClick={() => localStorage.clear()}>Remove</div>
        </div>
      ) : null}
    </div>
  );
};
