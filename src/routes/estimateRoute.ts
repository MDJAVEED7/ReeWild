import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getIngredientsFromAI } from "../controllers/ingredients";
import { getDishNameFromImage } from "../controllers/dishRecognizer"; // OpenAI function

const router = express.Router();

// ---------------------
// POST /estimate
// ---------------------
router.post("/estimate", async (req, res) => {
  try {
    const { dish } = req.body;

    if (!dish) {
      return res.status(400).json({ error: "Dish name is required" });
    }

    const result = await getIngredientsFromAI(dish);
    console.log("Ingredients result:", result);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

// ---------------------
// Multer setup for /estimate/image
// ---------------------
const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadFolder),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const uploadMiddleware = multer({ storage }); // renamed to avoid redeclaration

// ---------------------
// POST /estimate/image
// ---------------------
router.post("/estimate/image", uploadMiddleware.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image file is required" });

    const imagePath = path.join(uploadFolder, req.file.filename);
    console.log("Saved image at:", imagePath);

    const imageBuffer = fs.readFileSync(imagePath);
    console.log("Read image buffer, size:", imageBuffer.length);

    // Detect dish name using OpenAI
    const dishName = await getDishNameFromImage(imageBuffer);
    console.log("Detected dish:", dishName);

    // Fetch ingredients using Gemini/OpenAI
    const result = await getIngredientsFromAI(dishName);
    res.json(result);
  } catch (err: any) {
    console.error("Error in /estimate/image:", err.message);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

export default router;
