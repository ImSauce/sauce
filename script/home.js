 // Theme toggle functionality
        const themeBtn = document.querySelector('.header-icons .icon-btn:first-child');
        let isDark = true;

        themeBtn.addEventListener('click', () => {
            isDark = !isDark;
            const icon = themeBtn.querySelector('i');
            icon.className = isDark ? 'bi bi-sun' : 'bi bi-moon';
        });

        // Sound toggle functionality
        const soundBtn = document.querySelector('.header-icons .icon-btn:last-child');
        let isMuted = false;

        soundBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            const icon = soundBtn.querySelector('i');
            icon.className = isMuted ? 'bi bi-volume-mute' : 'bi bi-volume-up';
        });

        // Button click handlers
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                console.log(`${btn.textContent} clicked`);
            });
        });