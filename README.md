# Reewild-Assign

 Reewild Assignment - Dish Recognition & Ingredients Estimation

This project allows users to estimate ingredients from a dish name or from an image of the dish. The backend uses **Node.js**, **Express**, **Multer**, and **OpenAI API (GPT)** for dish recognition Through Image.
**Gemini ai Studio api for Dish carbonfoot print.
---

## Features

- **POST /estimate**: Input a dish name and get ingredients.
- **POST /estimate/image**: Upload an image of a dish and get ingredients.
- Image uploads are stored in the `uploads/` folder.
- Uses OpenAI GPT models for dish recognition and ingredient estimation.

---

## Prerequisites

- Node.js >= 18
- npm or yarn
- OpenAI API key

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/MDJAVEED7/ReeWild.git
cd Reewild-Assign
````

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Create a `.env` file** in the root folder

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

> ⚠️ Do **not** commit `.env` to GitHub. `.gitignore` already prevents this.

4. **Run the project**

```bash
npm run dev
# or
ts-node src/index.ts
```

5. **API Usage**

* **Estimate by dish name**

```http
POST /estimate
Content-Type: application/json

{
  "dish": "Pasta Carbonara"
}
```

* **Estimate by image**

```http
POST /estimate/image
Content-Type: multipart/form-data
Field: image (select your file)
```

---

## Project Structure

```
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
```

---

## Notes

* Uploaded images are saved locally in `uploads/`.
* OpenAI API key should remain secret.
* Only push code to GitHub without `.env`.
