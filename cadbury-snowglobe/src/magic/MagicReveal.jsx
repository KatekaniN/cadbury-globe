import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import "./MagicReveal.css";

const questions = [
  { label: "What is your name?", key: "name", type: "text" },
  { label: "How old are you?", key: "age", type: "number" },
  { label: "Can we keep in touch?", key: "wantContact", type: "boolean" },
  { label: "Please enter your email", key: "email", type: "email" },
  {
    label: "What is your favorite Cadbury chocolate?",
    key: "favoriteChocolate",
    type: "text",
  },
  {
    label: "What is your favorite season of the year?",
    key: "favoriteSeason",
    type: "text",
  },
  {
    label:
      " What has no beginning and no end but can fill your hands with joy?",
    key: "riddleAnswer",
    type: "text",
  },
];

const MagicReveal = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isHealed, setIsHealed] = useState(false);
  const [wantContact, setWantContact] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (answers.riddleAnswer?.toLowerCase() === "cadbury") {
        setIsHealed(true);
      } else {
        alert("The riddle answer is incorrect. Try again!");
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex === 4 && wantContact === false) {
      setCurrentQuestionIndex(2); 
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleHeal = () => {
    if (isHealed) {
      navigate("/magic-finished");
    }
  };

  const calculateProgress = () =>
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="magic-page">
      <div className="logo-elements-magic">
        <motion.img
          src="/logo.png"
          alt="Cadbury Logo"
          className="logo-magic"
          whileTap={{ scale: 0.8 }}
        />
        <h1>Festive Flavour Globe</h1>
      </div>

      <img src="/bg1.png" className="snow-village-magic" alt="Snow background" />
      <Snowfall snowflakeCount={100} useTwinkleEffect={true} />

      <div className="progress-container-magic">
        <div className="progress-milestones-magic">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`milestone-magic ${
                index <= currentQuestionIndex ? "completed" : ""
              }`}
            >
              ❄️
            </div>
          ))}
        </div>
        <div className="progress-text-magic">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="progress-bar-magic">
          <motion.div
            className="progress-fill-magic"
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="question-container-magic">
        <motion.div
          className="question-magic"
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{questions[currentQuestionIndex].label}</h2>

      
          {currentQuestionIndex === 2 && (
            <div className="contact-buttons-magic">
              <button
                className="option-button"
                onClick={() => {
                  setWantContact(true);
                  setCurrentQuestionIndex(3);
                }}
              >
                Yes, please!
              </button>
              <button
                className="option-button"
                onClick={() => {
                  setWantContact(false);
                  setCurrentQuestionIndex(4);
                }}
              >
                No, thanks
              </button>
            </div>
          )}

          {currentQuestionIndex === 3 && wantContact && (
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={answers.email || ""}
              onChange={handleChange}
              autoFocus
            />
          )}


          {currentQuestionIndex !== 2 &&
            currentQuestionIndex !== 3 && ( 
              <input
                type={questions[currentQuestionIndex].type}
                name={questions[currentQuestionIndex].key}
                value={answers[questions[currentQuestionIndex].key] || ""}
                onChange={handleChange}
                autoFocus
              />
            )}

          <div className="button-container-magic">
            {currentQuestionIndex > 0 && (
              <button className="back-button-magic" onClick={handleBack}>
                Back
              </button>
            )}
            {currentQuestionIndex !== 2 && (
              <button className="next-button-magic" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </motion.div>

        {isHealed && (
          <div className="healed-message">
            <h2>The snowglobe is healing...</h2>
            <button className="finish-button-magic" onClick={handleHeal}>
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicReveal;
