import React, { useState } from "react";
import axios from "axios";
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

    // Create FormData to send the image
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
      setTimeout(() => {
        setIsRevealed(true);
      }, 3000);
    } catch (err) {
      setError("Error analyzing image. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mood-detector-selfie ">
      {/* Logo Section */}
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
      {/* Scroll Section */}
      <div className="scroll-section">
        <div className="magical-scroll">
          <h1>Magical Instructions</h1>
          <p className="magical-riddle">
            "In crystal sphere of winter's light, Your mood reflects both day
            and night. Share your smile, let joy take flight, As magic swirls in
            patterns bright."
          </p>
        </div>
      </div>
      {/* SnowGlobe Section */}
      <div className="globe-section">
        <div
          className={`snow-globe-container-selfie ${
            isRevealed ? "revealed" : ""
          }`}
        >
          {imagePreview && (
            <img src={imagePreview} alt="Your photo" className="globe-image" />
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

      {/* Upload Section */}
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
        </form>
      </div>
      {error && <div className="error-message-selfie">{error}</div>}
    </div>
  );
};

export default MoodDetector;
