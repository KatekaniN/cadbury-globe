import React, { useState, useEffect, useRef } from "react";
import Snowfall from "react-snowfall";
import { motion } from "framer-motion";
import "./ChocRecommendation.css";
import { getRecommendation } from "./chocolateRecommendation";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

const ChocRecommendation = () => {
  const [snowflakeCount, setSnowflakeCount] = useState(100);
  const [snowAmount, setSnowAmount] = useState(100);
  const [snowflakeRadius, setSnowflakeRadius] = useState([0.5, 3.0]);
  const [snowflakeSpeed, setSnowflakeSpeed] = useState([0.5, 3.0]);

  const location = useLocation();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (location.state?.answers) {
      const result = getRecommendation(location.state.answers);
      setRecommendation(result);
    } else {
      navigate("/gift-quiz");
    }
  }, [location, navigate]);

  const getShareContent = () => {
    if (!recommendation) return null;

    const chocolateName = `Cadbury ${recommendation.recommendation}`;
    return {
      title: `I've found the perfect gift - ${chocolateName}! 🎁✨`,
      message: `I can't wait to surprise someone special with ${chocolateName}! Discover your perfect Cadbury chocolate gift too! 🍫 `,
      url: "https://www.cadbury.co.za/products",
    };
  };

  if (!recommendation) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const shareContent = getShareContent();

  return (
    <div className="recommendation-container">
      <div className="header-section-recommendation">
        <Snowfall snowflakeCount={snowAmount} useTwinkleEffect={true} />
        <div className="logo-elements-recommendation">
          <motion.img
            src="/logo.png"
            alt="Cadbury Logo"
            className="logo-recommendation"
            whileTap={{ scale: 0.8 }}
          />
          <h3>Presents</h3>
          <h1>Your Perfect Gift</h1>
        </div>
      </div>

      <img
        src="/bg1.png"
        className="snow-village-recommendation"
        alt="Snow background"
      />

      <motion.div
        className="recommendation-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={recommendation.image}
          alt={recommendation.recommendation}
          className="chocolate-image"
        />
        <h2>{recommendation.recommendation}</h2>
        <p>{recommendation.description}</p>

        <div className="buttons-container-recommendation">
          <button
            className="find-store-button"
            onClick={() =>
              window.open("https://www.cadbury.co.za/products", "_blank")
            }
          >
            Find in Store
          </button>

          <div className="social-share-container">
            <FacebookShareButton
              url={shareContent?.url}
              quote={`${shareContent?.title}\n\n${shareContent?.message}`}
              hashtag="#CadburyJoy"
              className="share-button-recommendation"
            >
              <FacebookIcon size={32} round />
              <span></span>
            </FacebookShareButton>

            <TwitterShareButton
              url={shareContent?.url}
              title={`${shareContent?.title}\n\n${shareContent?.message}`}
              hashtags={["CadburyJoy", "PerfectGift", "ChristmasMagic"]}
              related={["Cadbury"]}
              className="share-button-recommendation"
            >
              <TwitterIcon size={32} round />
              <span></span>
            </TwitterShareButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChocRecommendation;