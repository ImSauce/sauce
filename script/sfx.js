//    Home Button Click
    const navClickSfx = new Audio("audio/momoi.mp3");
    navClickSfx.volume = 0.6;

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("pointerdown", () => {
            navClickSfx.currentTime = 0;
            navClickSfx.play();
        });
    });
