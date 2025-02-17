import { useState } from "react";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import Snowglobe from "./snowglobe/Globe";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MagicReveal from "./magic/MagicReveal";
import Letter from "./letter/ClosedLetter"; 
import SelfieUpload from "./selfie-upload/SelfieUpload";
import ChocRecommendation from "./recommendation/ChocRecommendation";
import GiftFinder from "./gift-quiz/GiftFinder";

export default function App() {
const [snowAmount, setSnowAmount] = useState(100);

return (
  <Routes>
    <Route
      path="/"
      element={
        <div className="flex flex-col items-center justify-center min-h-screen pt-10">
          <div>
            <Snowfall snowflakeCount={snowAmount} useTwinkleEffect={true} />
            <div className="logo-elements">
              <motion.img
                src="/logo.png"
                alt="Cadbury Logo"
                className="logo"
                whileTap={{ scale: 0.8 }}
              />
              <h1>Festive Flavour Globe</h1>
            </div>
            <img
              src="/bg1.png"
              className="snow-village"
              alt="Snow background"
            />
          </div>
          <div className="stand-items">
            <Snowglobe />
            <Letter /> 
          </div>
        </div>
      }
    />
    <Route path="/magic-reveal" element={<MagicReveal />} />
    <Route path="/selfie-upload" element={<SelfieUpload />} />
    <Route path="/gift-quiz" element={<GiftFinder />} />
    <Route path="/choc-recommendation" element={<ChocRecommendation />} />
  </Routes>
);
}