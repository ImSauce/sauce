 $(document).ready(function() {
            const menuToggle = $('#menuToggle');
            const sidebar = $('#sidebar');
            const overlay = $('#overlay');
            const closeBtn = $('#closeBtn');

            // Open sidebar
            function openSidebar() {
                sidebar.addClass('active');
                overlay.addClass('active');
                $('body').css('overflow', 'hidden');
            }

            // Close sidebar
            function closeSidebar() {
                sidebar.removeClass('active');
                overlay.removeClass('active');
                $('body').css('overflow', 'auto');
            }

            // Toggle sidebar on menu button click
            menuToggle.on('click', function() {
                if (sidebar.hasClass('active')) {
                    closeSidebar();
                } else {
                    openSidebar();
                }
            });

            // Close sidebar on close button click
            closeBtn.on('click', function() {
                closeSidebar();
            });

            // Close sidebar on overlay click
            overlay.on('click', function() {
                closeSidebar();
            });

            // Close sidebar on escape key
            $(document).on('keydown', function(e) {
                if (e.key === 'Escape' && sidebar.hasClass('active')) {
                    closeSidebar();
                }
            });
        });