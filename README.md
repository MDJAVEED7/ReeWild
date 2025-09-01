
# Reewild-Assign

**Reewild Assignment - Dish Recognition & Ingredients Estimation**

This project provides APIs to estimate ingredients from a dish name or from an image of the dish.  
It uses **Node.js**, **Express**, **Multer**, and the **OpenAI API (GPT)** for dish recognition from images, and **Gemini AI Studio API** for calculating the dish's carbon footprint.

---

## Environment Variables

Create a `.env` file in the root directory with the following:

```env
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000

Features

POST /estimate → Input a dish name and get ingredients.

POST /estimate/image → Upload an image of a dish and get ingredients.

Uploaded images are stored in the uploads/ folder.

Uses OpenAI GPT models for dish recognition and ingredient estimation.

Uses Gemini AI Studio API for carbon footprint estimation.

Prerequisites

Node.js >= 18

npm or yarn

OpenAI API key

Gemini API key

Setup Instructions

Clone the repository

git clone https://github.com/MDJAVEED7/ReeWild.git
cd Reewild-Assign


Install dependencies

npm install
# or
yarn install


Create .env file

See Environment Variables
 section above.

Run the project

npm run dev
# or
ts-node src/index.ts

API Usage
1. Estimate by Dish Name

Request

POST /estimate
Content-Type: application/json

{
  "dish": "Pasta Carbonara"
}


Sample curl

curl -X POST http://localhost:5000/estimate \
  -H "Content-Type: application/json" \
  -d '{"dish": "Pasta Carbonara"}'

2. Estimate by Image

Request

POST /estimate/image
Content-Type: multipart/form-data
Field: image (select your file)


Sample curl

curl -X POST http://localhost:5000/estimate/image \
  -F "image=@pasta.jpg"

Project Structure
Reewild-Assign/
├── src/
│   ├── controllers/
│   │   ├── dishRecognizer.ts   # Detects dish from image using OpenAI
│   │   └── ingredients.ts      # Fetches ingredients from OpenAI
│   ├── routes/
│   │   └── estimate.ts         # API routes
│   └── index.ts                # Entry point
├── uploads/                    # Uploaded images
├── package.json
├── tsconfig.json
└── .gitignore
