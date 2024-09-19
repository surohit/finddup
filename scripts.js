document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const folder1 = document.getElementById('folder1').files;
    const folder2 = document.getElementById('folder2').files;

    if (folder1.length === 0 || folder2.length === 0) {
        alert("Please select both folders");
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < folder1.length; i++) {
        formData.append('folder1', folder1[i].webkitRelativePath);
    }
    for (let i = 0; i < folder2.length; i++) {
        formData.append('folder2', folder2[i].webkitRelativePath);
    }

    fetch('/compare', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'comparison_result.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
    })
    .catch(error => console.error('Error:', error));
});
