const emailLink = document.querySelector('.contact-item[href^="mailto:"]');

emailLink.addEventListener("click", (e) => {
    e.preventDefault();

    let modal = document.getElementById("emailModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "emailModal";
        modal.className = "modal-container";

        const formWrapper = document.createElement("div");
        formWrapper.className = "email-modal";

        formWrapper.innerHTML = `
            <h2>Send me a message! 🐢</h2>
            <form id="contactForm" action="https://formsubmit.co/samueljamescinco@gmail.com" method="POST">
                <input type="hidden" name="_subject" value="New message from ur personal website!">
                <input type="hidden" name="_template" value="box">

                <!-- Honeypot field for spam bots -->
                <div style="display:none;">
                    <input type="text" name="_honey" autocomplete="off">
                </div>

                <div class="input-group">
                    <input type="text" name="name" required>
                    <label>Name</label>
                </div>
                <div class="input-group">
                    <input type="email" name="email" required>
                    <label>Email</label>
                </div>
                <div class="input-group">
                    <input type="text" name="subject" required>
                    <label>Subject</label>
                </div>
                <div class="input-group">
                    <textarea name="message" rows="5" required></textarea>
                    <label>Message</label>
                </div>
                <button type="submit">Send</button>

                <input type="hidden" name="_next" value="https://imsauce.github.io/Personal-Website-2026/html/contacts.html">
                <input type="hidden" name="_captcha" value="false">
            </form>
        `;

        modal.appendChild(formWrapper);
        document.body.appendChild(modal);

        // Click outside closes modal
        modal.addEventListener("click", ev => {
            if (ev.target === modal) modal.classList.remove("active");
        });

        // Floating label logic
        const inputs = formWrapper.querySelectorAll("input, textarea");
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                input.classList.toggle("has-value", !!input.value);
            });
        });

        // Simple spam/email validation before submission
        formWrapper.querySelector("form").addEventListener("submit", ev => {
            const form = ev.target;
            const honey = form.querySelector('input[name="_honey"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (honey) {
                ev.preventDefault();
                alert("Spam detected 🤖");
                return false;
            }

            if (!emailRegex.test(email)) {
                ev.preventDefault();
                alert("Bruh, that email looks sus 😭");
                return false;
            }

            // If all checks pass, form submits normally to formsubmit.co
        });
    }

    modal.classList.add("active");
});