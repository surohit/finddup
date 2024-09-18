// Function to send folder data to Flask back-end and fetch comparison result
function compareFolders() {
    const folder1Files = document.getElementById('folder1').files;
    const folder2Files = document.getElementById('folder2').files;

    if (folder1Files.length === 0 || folder2Files.length === 0) {
        alert("Please select both folders");
        return;
    }

    // Prepare form data to send files
    const formData = new FormData();
    for (let i = 0; i < folder1Files.length; i++) {
        formData.append('folder1Files', folder1Files[i]);
    }
    for (let i = 0; i < folder2Files.length; i++) {
        formData.append('folder2Files', folder2Files[i]);
    }

    // Use fetch to POST data to the Flask back-end
    fetch('https://majestic-cedar-margin.glitch.me/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Display comparison result on the front-end
        const resultElement = document.getElementById('result');
        if (data.duplicates.length > 0) {
            resultElement.innerHTML = `<h3>Found ${data.duplicates.length} duplicate files:</h3>`;
            const ul = document.createElement('ul');
            data.duplicates.forEach(file => {
                const li = document.createElement('li');
                li.textContent = file;
                ul.appendChild(li);
            });
            resultElement.appendChild(ul);
        } else {
            resultElement.innerHTML = "<h3>No duplicate files found.</h3>";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
