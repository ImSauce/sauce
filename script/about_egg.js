document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle-anime");
    const easterItems = document.querySelectorAll(".easter-item");

    // preload sfx
    const clickSfx = new Audio("../audio/momoi.mp3");
    clickSfx.volume = 0.6; // adjust vibe

    // hide everything initially
    easterItems.forEach(item => {
        item.style.display = "none";
        item.style.opacity = "0";
    });

    let visible = false;

    toggle.addEventListener("click", () => {
        // play sfx
        clickSfx.currentTime = 0; // allows rapid clicking
        clickSfx.play();

        visible = !visible;

        easterItems.forEach(item => {
            if (visible) {
                item.style.display = "list-item";
                requestAnimationFrame(() => item.style.opacity = "1");
            } else {
                item.style.opacity = "0";
                setTimeout(() => {
                    item.style.display = "none";
                }, 550);
            }
        });
    });
});
