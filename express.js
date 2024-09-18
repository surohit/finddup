// Node.js Back-End

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// POST endpoint to handle folder uploads
app.post('/compare', upload.fields([{ name: 'folder1' }, { name: 'folder2' }]), (req, res) => {
    const folder1Files = req.files.folder1;
    const folder2Files = req.files.folder2;

    const folder1Names = folder1Files.map(file => file.originalname);
    const folder2Names = folder2Files.map(file => file.originalname);

    // Find duplicates
    const duplicates = folder1Names.filter(name => folder2Names.includes(name));

    // Save the comparison result
    const resultFile = 'comparison_result.csv';
    const csvContent = duplicates.join('\n');
    fs.writeFileSync(resultFile, csvContent);

    // Provide download link for CSV
    res.download(resultFile, 'comparison_result.csv', () => {
        // Clean up after download
        fs.unlinkSync(resultFile);
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
