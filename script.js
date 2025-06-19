window.addEventListener('scroll', function () {
    const header = this.document.getElementById("HomeHeader");
    if (window.scrollY > 10) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    }
});