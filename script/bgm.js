const pageMusic = {
    "home.html": "home_bgm.mp3",   // main page BGM
    "home_.html": "../audio/home_bgm.mp3",
    "aboutme.html": "../audio/aboutme_bgm.mp3",
    "works.html": "../audio/works_bgm.mp3",
    "faq.html": "../audio/faq_bgm.mp3",
    "contacts.html": "../audio/contacts_bgm.mp3",
    "thanks.html": "../audio/thanks_bgm.mp3",
};

// detect current page
const currentPage = window.location.pathname.split("/").pop();
const bgMusic = new Audio(pageMusic[currentPage] || pageMusic["home.html"]);

// Get current page filename
const pathParts = window.location.pathname.split("/");
bgMusic.loop = true;
bgMusic.volume = 0; // start at 0 for fade in

// fade in function
function fadeIn(audio, targetVolume = 0.05, duration = 2000) {
    const stepTime = 50;
    const steps = duration / stepTime;
    const volumeStep = targetVolume / steps;

    const fadeInterval = setInterval(() => {
        if (audio.volume < targetVolume) {
            audio.volume = Math.min(audio.volume + volumeStep, targetVolume);
        } else {
            clearInterval(fadeInterval);
        }
    }, stepTime);
}

// fade out function
function fadeOut(audio, duration = 1000) {
    const stepTime = 50;
    const steps = duration / stepTime;
    const volumeStep = audio.volume / steps;

    const fadeInterval = setInterval(() => {
        if (audio.volume > 0) {
            audio.volume = Math.max(audio.volume - volumeStep, 0);
        } else {
            clearInterval(fadeInterval);
            audio.pause();
        }
    }, stepTime);
}

// Initialize music
function initMusic() {
    const musicAllowed = sessionStorage.getItem("musicAllowed");

    if (musicAllowed) {
        bgMusic.play().then(() => fadeIn(bgMusic)).catch(() => {});
    } else {
        document.addEventListener("click", enableMusic, { once: true });
    }
}

// Enable music on first click
function enableMusic() {
    sessionStorage.setItem("musicAllowed", "true");
    bgMusic.play().then(() => fadeIn(bgMusic)).catch(() => {});
}

// Add nav button listeners
document.addEventListener("DOMContentLoaded", () => {
    initMusic();

    const navButtons = document.querySelectorAll(".nav-buttons a");
    navButtons.forEach(link => {
        link.addEventListener("click", (e) => {
            sessionStorage.setItem("musicAllowed", "true");
            fadeOut(bgMusic, 500); // fade out before leaving page
        });
    });
});

// Make sure music plays on normal load AND back/forward cache
window.addEventListener("pageshow", (event) => {
    if (event.persisted) { // page restored from bfcache
        const musicAllowed = sessionStorage.getItem("musicAllowed");
        if (musicAllowed) {
            // autoplay will likely fail, so wait for click
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.zIndex = 9999;
            overlay.style.cursor = "pointer";
            overlay.style.background = "rgba(0,0,0,0)";
            document.body.appendChild(overlay);

            overlay.addEventListener("click", () => {
                bgMusic.play().then(() => fadeIn(bgMusic)).catch(() => {});
                document.body.removeChild(overlay);
            });
        }
    }
});


// ======================
// Handle Back Button (bfcache) fix
// ======================
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        const mainContent = document.querySelector(".main-content");
        const overlay = document.getElementById("click-overlay");

        // Make main content visible
        if (mainContent) {
            mainContent.style.opacity = 1;
        }

        // Remove overlay if it exists
        if (overlay) {
            overlay.remove();
        }

        // Play music if allowed
        const musicAllowed = sessionStorage.getItem("musicAllowed");
        if (musicAllowed && bgMusic.paused) {
            bgMusic.play().then(() => fadeIn(bgMusic)).catch(() => {});
        }
    }
});






// ======================
// SFX SYSTEM
// ======================

// cache for audio objects
const sfxCache = {};

// play sfx helper
function playSFX(src, volume = 0.5) {
    if (!src) return;

    if (!sfxCache[src]) {
        const audio = new Audio(src);
        audio.volume = volume;
        sfxCache[src] = audio;
    }

    const sfx = sfxCache[src];
    sfx.currentTime = 0; // rapid fire support
    sfx.play().catch(() => {});
}

// attach sfx to elements
document.addEventListener("DOMContentLoaded", () => {
    // hover sfx
    document.querySelectorAll("[data-sfx-hover]").forEach(el => {
        el.addEventListener("mouseenter", () => {
            playSFX(el.dataset.sfxHover, parseFloat(el.dataset.sfxVolume) || 0.5);
        });
    });

    // click sfx
    document.querySelectorAll("[data-sfx-click]").forEach(el => {
        el.addEventListener("click", () => {
            playSFX(el.dataset.sfxClick, parseFloat(el.dataset.sfxVolume) || 0.5);
        });
    });

});











// // bgm.js

// const bgMusic = new Audio("../audio/home_bgm.mp3");
// bgMusic.loop = true;
// bgMusic.volume = 0; // start at 0 for fade in

// // fade in function
// function fadeIn(audio, targetVolume = 0.2, duration = 3000) {
//     const stepTime = 50;
//     const steps = duration / stepTime;
//     const volumeStep = targetVolume / steps;

//     const fadeInterval = setInterval(() => {
//         if (audio.volume < targetVolume) {
//             audio.volume = Math.min(audio.volume + volumeStep, targetVolume);
//         } else {
//             clearInterval(fadeInterval);
//         }
//     }, stepTime);
// }

// // fade out function
// function fadeOut(audio, duration = 1000) {
//     const stepTime = 50;
//     const steps = duration / stepTime;
//     const volumeStep = audio.volume / steps;

//     const fadeInterval = setInterval(() => {
//         if (audio.volume > 0) {
//             audio.volume = Math.max(audio.volume - volumeStep, 0);
//         } else {
//             clearInterval(fadeInterval);
//             audio.pause();
//         }
//     }, stepTime);
// }

// // Check if user has already "enabled" music
// function initMusic() {
//     const musicAllowed = sessionStorage.getItem("musicAllowed");

//     if (musicAllowed) {
//         bgMusic.play().then(() => fadeIn(bgMusic)).catch(() => {});
//     } else {
//         // wait for first click
//         document.addEventListener("click", enableMusic, { once: true });
//     }
// }

// // Enable music when user clicks anywhere or clicks nav
// function enableMusic() {
//     sessionStorage.setItem("musicAllowed", "true");
//     bgMusic.play().then(() => fadeIn(bgMusic)).catch(() => {});
// }

// // Add event listener to nav buttons to remember music permission
// document.addEventListener("DOMContentLoaded", () => {
//     initMusic();

//     const navButtons = document.querySelectorAll(".nav-buttons a");
//     navButtons.forEach(link => {
//         link.addEventListener("click", (e) => {
//             sessionStorage.setItem("musicAllowed", "true"); // store permission
//             // optional: fade out before leaving page
//             fadeOut(bgMusic, 500);
//         });
//     });
// });
