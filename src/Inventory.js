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
  return (
    <div className="inventory">
      <p className="inventory_title">Inventory</p>
      <div className="inventory_wrapper">
        <div className="box">1</div>
        <div className="box">2</div>
        <div className="box">3</div>
        <div className="box">4</div>
        <div className="box">5</div>
        <div className="box">6</div>
        <div className="box">7</div>
        <div className="box">8</div>
        <div className="box">9</div>
        <div className="box">10</div>
      </div>
    </div>
  );
};
