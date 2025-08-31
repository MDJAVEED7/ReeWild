import express from "express";
import estimateRouter from "./routes/estimateRoute";

const app = express();

// Parse JSON
app.use(express.json());

// Mount router
app.use("/api", estimateRouter);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
