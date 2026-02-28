require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const doctorRoutes = require("./routes/doctorRoutes");
const metaRoutes = require("./routes/metaRoutes");
const clinicsRoutes = require("./routes/clinicsRoutes");
const hospitalsRoutes = require("./routes/hospitalsRoutes");
const labTestsRoutes = require("./routes/labTestsRoutes");
const medicinesRoutes = require("./routes/medicinesRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const onlineConsultationsRoutes = require("./routes/onlineConsultationsRoutes");
const app = express();

// Connect DB
connectDB();

// Middleware
// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "*", // or your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/clinics", clinicsRoutes);
app.use("/api/hospitals", hospitalsRoutes);
app.use("/api/labtests", labTestsRoutes);
app.use("/api/medicines", medicinesRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/onlineconsultations", onlineConsultationsRoutes);
app.use("/api/meta", metaRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`),
);
