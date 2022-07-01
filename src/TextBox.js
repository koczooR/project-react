import { useState } from "react";

export const TextBox = () => {
  return <div className="text_box">Hello. My name is Piotr Koczorowski. I am Junior Front-End Developer. Take a look around.</div>;
};

export const NpcInteractTextBox = () => {
  const [text, setText] = useState("Hey! I'm glad you're here. What would you like to know?");
  const [showLink, setShowLink] = useState(false);
  return (
    <div className="npc_interact_text_box">
      {text}
      {showLink ? (
        <a href="https://github.com/koczooR" target="_blank" rel="noreferrer">
          Visit GitHub
        </a>
      ) : null}

      <div className="npc_interact_text_box__wrapper">
        <div
          onClick={() => {
            setText("Check my GitHub Page for more projects.");
            setShowLink(true);
          }}
        >
          Experience
        </div>
        <div
          onClick={() => {
            setText("Wrocław University of Science and Technology - Faculty of Environmental Engineering | CodersLab - IT Bootcamp");
            setShowLink(false);
          }}
        >
          Education
        </div>
        <div
          onClick={() => {
            setText("HTML5 | CSS3 | JavaScript | Sass | RWD | React.js | Scrum | Git");
            setShowLink(false);
          }}
        >
          Skills
        </div>
      </div>
    </div>
  );
};
