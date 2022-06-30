import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Canvas } from "./Canvas";
import { House } from "./House";
import { Main } from "./Main";
import { City } from "./City";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/house" element={<House />} />
        <Route path="/city" element={<City />} />
      </Routes>
    </Router>
  );
};
