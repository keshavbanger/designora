document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Sticky Navbar
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. Mobile Menu Toggle
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeMenu.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ==========================================================================
       3. Scroll Animations
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });

    /* ==========================================================================
       4. Treatments Tab Filter
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const filterItems = document.querySelectorAll('.filter-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            filterItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                    // Small timeout to allow display change before fading in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    // Timeout to hide element after fade out
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Should match CSS transition duration
                }
            });
        });
    });

    /* ==========================================================================
       5. Initialize Treatments Grid Display
       ========================================================================== */
    // Ensure all items are properly visible initially
    filterItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });
    
    /* ==========================================================================
       6. Booking Form Submission (Prevent Default)
       ========================================================================== */
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('.form-submit');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Appointment Requested...';
            submitBtn.style.backgroundColor = 'var(--color-black)';
            submitBtn.style.color = 'var(--color-white)';
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for booking! We will contact you shortly to confirm your appointment.');
                bookingForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = 'var(--color-white)';
                submitBtn.style.color = 'var(--color-gold)';
            }, 1500);
        });
    }
});
