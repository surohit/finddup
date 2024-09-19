const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const app = express();

// Route to handle file uploads using formidable
app.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();

  // Set file upload to memory (or optionally a temp directory)
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send("Error parsing file.");
      return;
    }

    // Assuming we want to process the uploaded file in-memory
    const file = files.file;
    
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Simulating file processing here, replace with your logic
    // For example, you could upload to a cloud storage like S3, Cloudinary, etc.
    res.status(200).send("File uploaded and processed successfully.");
  });
});

// Handle unsupported methods
app.use((req, res) => {
  res.status(405).send("Method Not Allowed");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
