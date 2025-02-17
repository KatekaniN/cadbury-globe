import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ClosedLetter.css";

const Letter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleEnvelope = () => {
    setIsOpen(true);
  };

  return (
    <div className="container-letter">
      <div className={`envelope-wrapper-letter ${isOpen ? "flap" : ""}`}>
        <div className="envelope-letter">
          <div className="letter">
            <div className="text-letter">
              <h3 className="letter-h3"> 🎄✨ A Magical Invitation Awaits… ✨🎄</h3>
              <p>
                Ah, dear adventurer, you’ve stumbled upon something truly
                special — but it’s not quite what it used to be. <br />
                The Snow Globe once filled with magic has lost its sparkle, but
                there’s hope. <br />
                The power to restore it lies in your hands. <br />
                Follow the Golden Beating Heart 💛—its rhythm will lead you to
                the next clue.
              </p>

  
              {isOpen && (
                <motion.div
                  className="heart-button-letter"
                  onClick={() => navigate("/selfie-upload")}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                ></motion.div>
              )}
            </div>
          </div>
          <div className="heart-letter" onClick={toggleEnvelope}></div>
        </div>
      </div>
    </div>
  );
};

export default Letter;
