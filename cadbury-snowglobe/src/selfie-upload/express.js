import express from "express";
import fs from "fs";
import formidable from "formidable";
import path from "path";
import vision from "@google-cloud/vision";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Initialize Vision client
const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, "./service-account-key.json"),
});

app.post("/detect-mood", async (req, res) => {
  const form = formidable({
    uploadDir: path.join(__dirname, "../uploads"),
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "File parsing error" });
    }

    if (!files.selfie) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const imagePath = files.selfie[0].filepath;

    try {
      // Analyze the image with Google Vision API
      const [result] = await client.faceDetection(imagePath);
      const faces = result.faceAnnotations;

      if (!faces || faces.length === 0) {
        // Clean up the uploaded file
        fs.unlinkSync(imagePath);
        return res.json({ mood: "neutral" });
      }

      const face = faces[0];
      const moods = {
        Joy: face.joyLikelihood,
        Sorrow: face.sorrowLikelihood,
        Anger: face.angerLikelihood,
        Surprise: face.surpriseLikelihood,
      };

      const likelihoodValues = {
        VERY_UNLIKELY: 1,
        UNLIKELY: 2,
        POSSIBLE: 3,
        LIKELY: 4,
        VERY_LIKELY: 5,
      };

      let mostProminentMood = "neutral";
      let highestLikelihood = 0;

      for (const [mood, likelihood] of Object.entries(moods)) {
        const value = likelihoodValues[likelihood] || 0;
        if (value > highestLikelihood) {
          highestLikelihood = value;
          mostProminentMood = mood;
        }
      }

      // Clean up the uploaded file
      fs.unlinkSync(imagePath);

      res.json({ mood: mostProminentMood });
    } catch (error) {
      console.error("Error:", error);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      res.status(500).json({ error: "Error analyzing image" });
    }
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

export default app;
