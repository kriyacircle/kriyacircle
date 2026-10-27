/* ============================================================
   KRIYA CIRCLE — Main JavaScript
   ============================================================ */

/* ---- Sticky Navbar ---------------------------------------- */
(function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    function onScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

/* ---- Mobile Hamburger Menu -------------------------------- */
(function () {
    const btn = document.getElementById('hamburger');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
        const open = links.classList.toggle('open');
        btn.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            links.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target) && links.classList.contains('open')) {
            links.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
})();

/* ---- Fade-In on Scroll (IntersectionObserver) ------------ */
(function () {
    const items = document.querySelectorAll('.fade-in');
    if (!items.length) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    items.forEach(function (el) { observer.observe(el); });
})();

/* ---- Active Nav Link on Scroll --------------------------- */
(function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navLinks.forEach(function (a) {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + entry.target.id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '-60px 0px 0px 0px'
    });

    sections.forEach(function (s) { observer.observe(s); });
})();

/* ---- Contact Form Validation & Submit -------------------- */
(function () {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    if (!form) return;

    function showError(inputId, errorId, msg) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) input.classList.add('error');
        if (error) error.textContent = msg;
    }

    function clearErrors() {
        form.querySelectorAll('input, select, textarea').forEach(function (el) {
            el.classList.remove('error');
        });
        form.querySelectorAll('.field-error').forEach(function (el) {
            el.textContent = '';
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        let valid = true;

        if (!name || name.value.trim().length < 2) {
            showError('name', 'name-error', 'Please enter your name.');
            valid = false;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError('email', 'email-error', 'Please enter a valid email address.');
            valid = false;
        }

        if (!valid) return;

        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        /* Simulate sending — replace with real endpoint when ready */
        setTimeout(function () {
            form.reset();
            submitBtn.textContent = 'Send Message 🙏';
            submitBtn.disabled = false;
            if (successMsg) {
                successMsg.classList.remove('hidden');
                setTimeout(function () {
                    successMsg.classList.add('hidden');
                }, 6000);
            }
        }, 1200);
    });
})();

/* ---- Smooth scroll polyfill for older browsers ----------- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
    });
});
