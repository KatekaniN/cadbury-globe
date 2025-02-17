import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import "./SelfieUpload.css";

const MoodDetector = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [detectedMood, setDetectedMood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snowAmount, setSnowAmount] = useState(100);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const getRiddleText = () => {
    if (!detectedMood) {
      return "In crystal sphere of winter's light, Your mood reflects both day and night. Share your smile, let joy take flight, As magic swirls in patterns bright.";
    } else if (detectedMood.toLowerCase() !== "joy") {
      return "The gates remain sealed tight and true, Until joy's light comes shining through. Share a smile, bright and new, For only happiness will let you through.";
    } else {
      return "Wonderful! Your joyful spirit has unlocked the magical path forward. Click 'Share the Magic' to spread your festive cheer!";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL for the image
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setIsShaking(true); 

    const formData = new FormData();
    formData.append("selfie", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:3000/detect-mood",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDetectedMood(response.data.mood);

      // Stop shaking and reveal after 6 seconds
      setTimeout(() => {
        setIsShaking(false);
        setIsRevealed(true);
      }, 6000);
    } catch (err) {
      setError("Error analyzing image. Please try again.");
      setIsShaking(false);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mood-detector-selfie ">
      {/* Logo */}
      <div className="logo-section">
        <Snowfall snowflakeCount={snowAmount} useTwinkleEffect={true} />
        <div className="logo-elements-selfie">
          <motion.img
            src="/logo.png"
            alt="Cadbury Logo"
            className="logo-selfie"
            whileTap={{ scale: 0.8 }}
          />
          <h1>Festive Flavour Globe</h1>
        </div>
        <img
          src="/bg1.png"
          className="snow-village-selfie"
          alt="Snow background"
        />
      </div>

      {/* Scroll */}
      <div className="scroll-section-selfie">
        <div className="magical-scroll-selfie">
          <h1>Magical Instructions</h1>
          <p className="magical-riddle-selfie">{getRiddleText()}</p>
        </div>
      </div>

      {/* SnowGlobe */}
      <div className="globe-section-selfie">
        <div
          className={`snow-globe-container-selfie ${
            isRevealed ? "revealed" : ""
          } ${isShaking ? "shaking" : ""}`}
        >
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Your photo"
              className={`globe-image-selfie ${isRevealed ? "revealing" : ""}`}
            />
          )}
          <div className="snow-globe-selfie">
            <div className="snow-particles">
              <Snowfall
                snowflakeCount={isRevealed ? 20 : 100}
                speed={[0.5, 2]}
                wind={[-0.5, 2]}
              />
            </div>
          </div>
          <img className="snow-globe-base" src="/globe.png" alt="" />
          {detectedMood && <div className="mood-result">{detectedMood}</div>}
        </div>
      </div>

      {/* Upload */}
      <div className="upload-section-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="upload-section-selfie">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input-selfie"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedImage || isLoading}
            className="button-40"
            role="button"
          >
            <span className="text">
              {isLoading ? "Analyzing..." : "Get Magical Mood"}
            </span>
          </button>

          {/* Continue */}
          {detectedMood && detectedMood.toLowerCase() === "joy" && (
            <button
              type="button"
              className="button-40 continue-button"
              onClick={() => {
               navigate("/gift-quiz");
              }}
            >
              <span className="text">Share the Magic</span>
            </button>
          )}
        </form>
      </div>
      {error && <div className="error-message-selfie">{error}</div>}
    </div>
  );
};


export default MoodDetector;
