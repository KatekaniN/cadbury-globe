import { useState } from "react";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import Snowglobe from "./snowglobe/Globe";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MagicReveal from "./magic/MagicReveal";
import EnvelopeCard from "./letter/ClosedLetter";
import SelfieUpload from "./selfie-upload/SelfieUpload";

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
                {/*Cadbury Logo*/}
                <motion.img
                  src="/logo.png"
                  alt="Cadbury Logo"
                  className="logo"
                  // whileHover={{ scale: 1.1 }}
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
              <EnvelopeCard className="letter" />
            </div>
          </div>
        }
      />
      <Route path="/magic-reveal" element={<MagicReveal />} />
      <Route path="/selfie-upload" element={<SelfieUpload />} />
    </Routes>
  );
}
