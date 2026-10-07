const express = require("express");
const cors = require ("cors");
const mongoose = require('mongoose');
const Student = require("./models/Student")

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json())

// Test

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});


// This is for the Read Feature
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// This is for the Add Feature
app.post("/students", async (req, res) => {
  const {name, course, age} = req.body;
  const newStudent = new Student({name, course, age});
  await newStudent.save();
  res.json(newStudent);
});

// This is for the Delete Feature
app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  await Student.findByIdAndDelete(studentId);
  res.json({ message: "Student deleted successfully" });
});


// This is for the Update Feature
app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  await Student.findByIdAndUpdate(studentId, req.body, { new: true });
  res.json({ message: "Student updated successfully" });
});