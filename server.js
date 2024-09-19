const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const app = express();

// File upload handling using Formidable
app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '/uploads'); // Set upload directory
    form.keepExtensions = true; // Keep file extension

    // Parse incoming file
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).send({ error: 'Error parsing file' });
        }
        const oldPath = files.file.filepath;
        const newPath = path.join(form.uploadDir, files.file.originalFilename);

        // Move file to desired location
        fs.rename(oldPath, newPath, (renameErr) => {
            if (renameErr) {
                return res.status(500).send({ error: 'Error saving file' });
            }
            res.status(200).send({ message: 'File uploaded successfully' });
        });
    });
});

// Catch all other unsupported methods
app.use((req, res) => {
    res.status(405).send('Method Not Allowed');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
