const express = require('express');
const multer = require('multer');
const path = require('path');
const { parse } = require('json2csv');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Progress tracking (can be enhanced further to track individual file processing)
let progress = 0;

app.post('/compare', upload.fields([{ name: 'folder1[]' }, { name: 'folder2[]' }]), (req, res) => {
  try {
    const folder1 = req.files['folder1[]'];
    const folder2 = req.files['folder2[]'];

    const folder1Files = folder1.map(file => file.originalname);
    const folder2Files = folder2.map(file => file.originalname);

    let comparisonResult = [];

    folder1Files.forEach(file => {
      if (folder2Files.includes(file)) {
        comparisonResult.push({ file, status: 'Duplicate' });
      } else {
        comparisonResult.push({ file, status: 'Unique in Folder 1' });
      }
    });

    folder2Files.forEach(file => {
      if (!folder1Files.includes(file)) {
        comparisonResult.push({ file, status: 'Unique in Folder 2' });
      }
    });

    const csv = parse(comparisonResult);

    progress = 100; // Completion
    res.header('Content-Type', 'text/csv');
    res.attachment('comparison_result.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).send('Error comparing folders');
  }
});

app.get('/progress', (req, res) => {
  res.json({ progress });
});

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
