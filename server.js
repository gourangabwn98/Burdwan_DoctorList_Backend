require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const doctorRoutes = require("./routes/doctorRoutes");
const metaRoutes = require("./routes/metaRoutes");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/meta", metaRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`),
);
