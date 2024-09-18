const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();

const upload = multer();

app.post('/compare', upload.none(), (req, res) => {
    const folder1 = req.body.folder1;
    const folder2 = req.body.folder2;

    // Perform comparison logic based on folder paths here
    // For now, we assume we find some duplicate files
    const duplicateFiles = ['file1.txt', 'file2.txt']; // Example

    // Return the comparison result as CSV
    const csvContent = 'File Name\n' + duplicateFiles.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="comparison_result.csv"');
    res.send(csvContent);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
