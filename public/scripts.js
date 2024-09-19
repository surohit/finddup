document.getElementById('compareForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const folder1 = document.getElementById('folder1').files;
  const folder2 = document.getElementById('folder2').files;
  const formData = new FormData();

  for (let file of folder1) {
    formData.append('folder1[]', file);
  }
  for (let file of folder2) {
    formData.append('folder2[]', file);
  }

  document.getElementById('progressContainer').style.display = 'block';

  try {
    const response = await fetch('/compare', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Failed to compare folders');
    
    const csvBlob = await response.blob();
    const csvURL = window.URL.createObjectURL(csvBlob);

    document.getElementById('downloadLink').href = csvURL;
    document.getElementById('downloadLink').download = 'comparison_result.csv';
    document.getElementById('outputContainer').style.display = 'block';
    document.getElementById('progressText').textContent = 'Progress: 100%';
    document.getElementById('progressBar').value = 100;
  } catch (err) {
    alert(err.message);
  }
});
