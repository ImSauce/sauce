document.addEventListener("DOMContentLoaded", function () {
    const loaderWrapper = document.querySelector(".loader_wrapper");
    const body = document.body;

    // Fake loading screen: fade out after 3 seconds
    setTimeout(() => {
        loaderWrapper.classList.add("fade-out"); // fade out animation
        body.classList.remove("preload");        // enable scrolling
    }, 3000); // 3000ms = 3 seconds
});
