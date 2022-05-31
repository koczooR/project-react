import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Canvas } from "./Canvas";
import { Main } from "./Main";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </Router>
  );
};
