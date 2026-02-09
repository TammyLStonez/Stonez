const menubarToggle = document.querySelector('.menubar-toggle');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.querySelector('.menu-overlay');
const media = window.matchMedia("(width < 880px)");

// 1. Centralized logic to handle inert state
function updateInertState() {
  const isMobile = media.matches;
  const isMenuOpen = navMenu.classList.contains('active');

  if (isMobile) {
    if (isMenuOpen) {
      // Mobile Open
      navMenu.removeAttribute('inert');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    else {
      // Mobile Closed
      navMenu.setAttribute('inert', '');
      overlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
  else {
    // Desktop Mode
    navMenu.removeAttribute('inert');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 2. Toggle Button Click
menubarToggle.addEventListener('click', () => {
  menubarToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
            
  // Re-evaluate inert state every time we toggle
  updateInertState();
});

// 3. Overlay Click (closes menu)
overlay.addEventListener('click', () => {
  menubarToggle.classList.remove('active');
  navMenu.classList.remove('active');
  updateInertState();
});

// 4. Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (media.matches) {
      menubarToggle.classList.remove('active');
      navMenu.classList.remove('active');
      updateInertState();
    }
  });
});

// 5. Handle window resizing
media.addEventListener('change', updateInertState);

// Initial check on page load
window.addEventListener('DOMContentLoaded', updateInertState);