// Initialize icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const mobileCta = document.getElementById('mobile-cta');
    const footer = document.querySelector('footer');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'border-b', 'border-white/10');
            navbar.querySelector('.absolute').classList.replace('bg-brand-dark/80', 'bg-brand-darker/95');
        } else {
            navbar.classList.remove('shadow-lg', 'border-b', 'border-white/10');
            navbar.querySelector('.absolute').classList.replace('bg-brand-darker/95', 'bg-brand-dark/80');
        }

        // Hide mobile CTA when reaching footer to prevent overlap
        if (footer) {
            const footerTop = footer.getBoundingClientRect().top;
            if (footerTop < window.innerHeight) {
                document.body.classList.add('footer-visible');
            } else {
                document.body.classList.remove('footer-visible');
            }
        }
    });

    // Mobile Menu Toggle logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (isOpen) => {
        const whatsappBtn = document.querySelector('a[href*="wa.me"]');
        if (isOpen) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // Lock scroll
            if (whatsappBtn) whatsappBtn.classList.add('opacity-0', 'pointer-events-none');
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = ''; // Unlock scroll
            if (whatsappBtn) whatsappBtn.classList.remove('opacity-0', 'pointer-events-none');
        }
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => toggleMenu(false));
    }

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Form Handling
    const leadForm = document.getElementById('lead-form');
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    const formSuccess = document.getElementById('form-success');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate Phone
            const phoneVal = phoneInput.value.replace(/\D/g, '');
            if (phoneVal.length !== 10) {
                phoneError.classList.remove('hidden');
                phoneInput.classList.add('border-red-500');
                return;
            } else {
                phoneError.classList.add('hidden');
                phoneInput.classList.remove('border-red-500');
            }

            // Mock Submission
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Processing...';
            submitBtn.disabled = true;
            lucide.createIcons();

            setTimeout(() => {
                formSuccess.classList.remove('hidden');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                leadForm.reset();
                lucide.createIcons();

                // Optional: Auto redirect to WhatsApp after 2 seconds
                // setTimeout(() => {
                //    window.open('https://wa.me/919876543210?text=I%20have%20submitted%20the%20form%20for%20a%20free%20trial', '_blank');
                // }, 2000);
            }, 1500);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
