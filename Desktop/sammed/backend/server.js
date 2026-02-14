const express = require("express");
const USER = require("./Database/Models/userModel");
const connectDB = require("./Database/dbConnection");
const cors = require("cors");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to BCAQuickbite Backend Server");
});

// Register Route
// Add this below your /register route in server.js

app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user by email
    const user = await USER.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    // If login successful, return user info
    res.status(200).json({
      message: "Login successful",
      fullname: user.fullname,
      email: user.email,
      role: "user", // You can later differentiate admin/owner
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Login Route
app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await USER.findOne({ email, password });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    res.send("Login successful");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Start Server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
