function startProgress() {
    var progressBar = document.getElementById("progress");
    var width = 0;
    var interval = setInterval(frame, 50);

    function frame() {
        if (width >= 100) {
            clearInterval(interval);
            alert("Task Completed!");
        } else {
            width++;
            progressBar.style.width = width + "%";
        }
    }
}
