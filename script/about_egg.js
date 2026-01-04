let visible = false;

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle-anime");
    const easterItems = document.querySelectorAll(".easter-item");

    // preload sfx (GitHub-safe)
    const clickSfx = new Audio("../audio/momoi.mp3");
    clickSfx.volume = 0.6;

    // hide everything initially
    easterItems.forEach(item => {
        item.style.display = "none";
        item.style.opacity = "0";
    });

    toggle.addEventListener("click", () => {
        const wasVisible = visible; // 👈 capture previous state
        visible = !visible;

        // 🔊 play ONLY when transitioning: hidden → visible
        if (!wasVisible && visible) {
            clickSfx.currentTime = 0;
            clickSfx.play().catch(() => {});
        }

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


document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle-anime");
    let hasFlashed = false;

    toggle.addEventListener("click", () => {
        // only trigger when OPENING (not closing)
        if (hasFlashed) return;

        hasFlashed = true;

        const flash = document.createElement("div");
        flash.style.position = "fixed";
        flash.style.top = "0";
        flash.style.left = "0";
        flash.style.width = "100vw";
        flash.style.height = "100vh";
        flash.style.zIndex = "9999";
        flash.style.opacity = "1";
        flash.style.transition = "opacity 0.3s ease";
        flash.classList.add("flash-gif");
        flash.style.backgroundImage = `url("../images/momoi.gif")`;
        flash.style.backgroundRepeat = "no-repeat";
        flash.style.backgroundSize = "cover";

        document.body.appendChild(flash);

        setTimeout(() => {
            flash.style.opacity = "0";
        }, 700);

        setTimeout(() => {
            flash.remove();
        }, 1000);
    });

    //reset flash ability when easter item is hidden again
    document.addEventListener("click", (e) => {
        if (e.target.id === "toggle-anime" && !visible) {
            setTimeout(() => {
                hasFlashed = false;
            }, 600);
        }
    });
});

//wtf github?? why are u not working????
