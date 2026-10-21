/**
 * CITY BEAT INDEPENDENT LIVING, LLC
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initFaqAccordion();
  initIntakeForm();
  initTourBooking();
  initCapabilityPrint();
  updateCurrentYear();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  const hamburgerSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  const closeSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  function setMenuState(open) {
    if (open) {
      navMenu.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close navigation menu');
      toggleBtn.innerHTML = closeSvg;
      document.body.classList.add('nav-open');
    } else {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
      toggleBtn.innerHTML = hamburgerSvg;
      document.body.classList.remove('nav-open');
    }
  }

  // Toggle button click
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    const willOpen = !navMenu.classList.contains('open');
    setMenuState(willOpen);
  });

  // Stop clicks inside nav menu from bubbling to document (unless clicking link)
  navMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Close menu when clicking any nav link or CTA button inside the menu
  const menuLinks = navMenu.querySelectorAll('a, button');
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open')) {
      if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
        setMenuState(false);
      }
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      setMenuState(false);
      toggleBtn.focus();
    }
  });

  // Close when window resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navMenu.classList.contains('open')) {
      setMenuState(false);
    }
  });
}

/* Header Scroll Shadow */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('active');
            const otherAns = other.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        // Toggle clicked
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

/* Resident Intake & Referral Form Handling */
function initIntakeForm() {
  const form = document.getElementById('residentIntakeForm');
  const banner = document.getElementById('intakeSuccessBanner');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Submitting Referral...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;

        if (banner) {
          banner.style.display = 'block';
          banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        form.reset();
      }, 900);
    });
  }
}

/* Tour Booking Form */
function initTourBooking() {
  const tourForm = document.getElementById('tourScheduleForm');
  const tourSuccess = document.getElementById('tourSuccessBanner');

  if (tourForm) {
    tourForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = tourForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Scheduling Visit...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Schedule Visit';
        if (tourSuccess) {
          tourSuccess.style.display = 'block';
        }
        tourForm.reset();
      }, 800);
    });
  }
}

/* Capability Statement Print Trigger */
function initCapabilityPrint() {
  const printBtn = document.getElementById('printCapabilityBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* Auto update current year */
function updateCurrentYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const currYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = currYear;
  });
}
