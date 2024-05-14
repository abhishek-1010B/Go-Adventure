const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(compression());

const MONGODB_URI =
  "mongodb+srv://user1:3O7vDOAxCXHxZQWk@cluster0.ugdhsjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// MongoDB models
const Contact = mongoose.model("Contact", {
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", {
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Arrival = mongoose.model("Arrival", {
  to: { type: String, required: true },
  howMany: { type: Number, required: true },
  arrivalDate: { type: Date, required: true },
  leavingDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Cache Control Headers
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 year
  next();
});

// Contact Form Submission
app.post("/contact", async (req, res) => {
  try {
    const { name, email, number, subject, message } = req.body;
    const newContact = new Contact({
      name,
      email,
      number,
      subject,
      message,
    });
    await newContact.save();
    res.status(201).send("Contact information saved successfully");
  } catch (error) {
    console.error("Error saving contact information:", error);
    res.status(500).send("Server error");
  }
});

// Serve the signup.html file
app.get("/signup.html", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

// User Signup
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password, // Storing the password in plain text for testing
    });

    await newUser.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// User Authentication
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res
      .status(200)
      .json({ message: "Login successful", username: user.username });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Book Form Submission
app.post("/book", async (req, res) => {
  try {
    const { to, howMany, arrivalDate, leavingDate } = req.body;
    const newBooking = new Arrival({
      to,
      howMany,
      arrivalDate,
      leavingDate,
    });
    await newBooking.save();
    res.status(201).send("Booking saved successfully");
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
