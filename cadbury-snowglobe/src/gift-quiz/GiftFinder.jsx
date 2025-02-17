import React, { useState, useEffect, useRef } from "react";
import Snowfall from "react-snowfall";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./GiftFinder.css";


const GiftFinder = () => {
  const [snowflakeCount, setSnowflakeCount] = useState(100);
  const [snowAmount, setSnowAmount] = useState(100);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [showGlobe, setShowGlobe] = useState(true);
  const [snowflakeRadius, setSnowflakeRadius] = useState([0.5, 3.0]);
  const [snowflakeSpeed, setSnowflakeSpeed] = useState([0.5, 3.0]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep > questions.length) {
      setShowGiftBox(true);
    }
  }, [currentStep]);

  const questions = [
    {
      id: 1,
      question: "Who Are You Gifting This Festive?",
      options: ["Family Member", "Friend", "Partner", "Colleague"],
    },
    {
      id: 2,
      question: "What's Their Favorite Type Of Chocolate?",
      options: ["Dark", "Milk", "White", "They enjoy all types"],
    },
    {
      id: 3,
      question: "How Would You Describe Their Personality?",
      options: ["Adventurous", "Traditional", "Creative", "Sophisticated"],
    },
    {
      id: 4,
      question: "What's The Occasion?",
      options: [
        "Christmas",
        "Sorry, let's fix it",
        "Thank You",
        "Just Because",
      ],
    },
  ];

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep - 1].question]: answer,
    }));

    if (currentStep <= questions.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleReveal = () => {
    const answersArray = [
      answers["Who Are You Gifting This Festive?"],
      answers["What's Their Favorite Type Of Chocolate?"],
      answers["How Would You Describe Their Personality?"],
      answers["What's The Occasion?"],
    ];

    navigate("/choc-recommendation", {
      state: { answers: answersArray },
    });
  };

  return (
    <div className="gift-finder-container">
      <div className="header-section">
        <div className="logo-wrapper">
          <Snowfall snowflakeCount={snowAmount} useTwinkleEffect={true} />
          <div className="logo-elements-gift">
            <motion.img
              src="/logo.png"
              alt="Cadbury Logo"
              className="logo-gift"
              whileTap={{ scale: 0.8 }}
            />
            <h1 className="logo-title">Festive Flavour Globe</h1>
          </div>
        </div>
        <div className="background-wrapper">
          <img
            src="/bg1.png"
            className="snow-village-gift"
            alt="Snow background"
          />
        </div>
      </div>

      <div className="content-section">
        {showGlobe && (
          <div className="globe-container-gift">
            <div className="globe-gift">
              <img src="/snowman.png" alt="" className="snowman" />
              <div className="snow-container">
                <Snowfall
                  color="white"
                  snowflakeCount={snowflakeCount}
                  radius={snowflakeRadius}
                  speed={snowflakeSpeed}
                />
              </div>
            </div>
            <img className="globe-base-gift" src="/globe.png" alt="" />
          </div>
        )}
        {currentStep === 0 && (
          <div className="welcome-container">
            <div className="scroll-wrapper">
              <div className="scroll-content">
                <h1>Almost there...</h1>
                <p className="welcome-text">
                  Now that we've returned Joy to the Cadbury Festive Globe.✨
                  <br /> <br />
                  We'd like to help you share the Cadbury Joy with your loved
                  ones. Let the enchanted spirits of enchanting chocolate guide
                  you to the perfect gift. <br /> <br />
                  Answer a few magical questions, and we'll help you discover
                  the ideal treat to spread joy this festive season.
                </p>
                <button
                  className="start-button"
                  onClick={() => {
                    setCurrentStep(1);
                    setShowGlobe(false);
                  }}
                >
                  <span className="text">Begin the Magic</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep > 0 && currentStep <= questions.length && (
          <div className="questions-container">
            <div className="question-box">
              <h2 className="question-title">
                {questions[currentStep - 1].question}
              </h2>
              <div className="options-grid">
                {questions[currentStep - 1].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="option-button"
                    onClick={() => handleAnswer(option)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {currentStep > questions.length && (
          <div className="results-container">
            <div className="results-content">
              {showGiftBox && (
                <motion.div
                  className="gift-box"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src="/gift1.png" alt="Gold and purple gift box" />
                </motion.div>
              )}
              <div className="scroll-wrapper-reveal">
                <div className="scroll-content-reveal">
                  <h1>Your Perfect Match is Ready!</h1>
                  <p className="results-text">
                    The chocolate spirits have consulted the stars and found
                    your perfect gift! Click below to reveal your magical
                    recommendation.
                  </p>
                  <button className="reveal-button" onClick={handleReveal}>
                    <span className="text">Reveal My Gift</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftFinder;
