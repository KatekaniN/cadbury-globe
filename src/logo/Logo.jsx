import { useState } from "react";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import "./Logo.css";

export default function Logo() {
  const [snowAmount, setSnowAmount] = useState(100);

  return (
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
      <img src="/bg1.png" className="snow-village" alt="Snow background" />
    </div>
  );
}
