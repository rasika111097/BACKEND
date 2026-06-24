const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/dbconnction");
const errorHandler = require("./middleware/errorMiddleware");

// Load env
dotenv.config();

// DB connect
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/habits", require("./routes/habitRoutes"));
app.use("/api/habitlogs", require("./routes/habitLogRoutes"));
app.use("/api/subGoals", require("./routes/subGoalsRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/calendar", require("./routes/calendarRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));

app.use(errorHandler);

// Server start
const PORT = 5051;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);


});