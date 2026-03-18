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

const popUp = document.getElementById('popUp-modal')

//6. Open chat pop-up when chat button is clicked
function openPopup(){
  popUp.classList.add('show')
  //overlay.classList.add('active');
  //document.body.style.overflow = 'hidden'; // Prevent background scrolling
}
function closePopup(){
  popUp.classList.remove('show')
}


/* --   OVERALL CONTACT SECTION BEHAVIOR -- */

/* ── Character counter ───────── */
const msgEl  = document.getElementById('cf-msg');
const charEl = document.getElementById('cf-char');
msgEl.addEventListener('input', () => {
  charEl.textContent = msgEl.value.length + ' / 1000';
});

/* ── Validation ────────── */
function validate() {
  let ok = true;
  const nameEl  = document.getElementById('cf-name');
  const emailEl = document.getElementById('cf-email');

  // clear previous state
  [nameEl, emailEl, msgEl].forEach(el => el.classList.remove('error'));
  ['err-name','err-email','err-msg'].forEach(id =>
    document.getElementById(id).classList.remove('show')
  );

  if (!nameEl.value.trim()) {
    nameEl.classList.add('error');
    document.getElementById('err-name').classList.add('show');
    ok = false;
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(emailEl.value.trim())) {
    emailEl.classList.add('error');
    document.getElementById('err-email').classList.add('show');
    ok = false;
  }

  if (msgEl.value.trim().length < 20) {
    msgEl.classList.add('error');
    document.getElementById('err-msg').classList.add('show');
    ok = false;
  }

  return ok;
}

/* ── Submit → WhatsApp ────────────────────────────── */
function submitForm() {
  if (!validate()) return;

  const btn = document.getElementById('cf-submit');
  btn.disabled = true;
  btn.textContent = 'Opening WhatsApp…';

  /* ── ✏️  REPLACE with your number (digits only, no + or spaces)
          Example:  '447911123456'  for a UK +44 number
                    '2348012345678' for a Nigerian +234 number  ── */
  const PHONE = '2349155101626';

  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = msgEl.value.trim();

  const text = [
    '👋 New message from your portfolio!',
    '',
    `🧑 Name:    ${name}`,
    `📧 Email:   ${email}`,
    subject ? `📌 Subject: ${subject}` : null,
    '',
    `💬 Message:\n${message}`,
  ].filter(line => line !== null).join('\n');

  const waURL = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

  /* Show success banner, then open WhatsApp */
  const form = document.getElementById('cfForm');
  form.style.opacity        = '0.4';
  form.style.pointerEvents  = 'none';
  document.getElementById('cf-success').classList.add('show');

  setTimeout(() => window.open(waURL, '_blank'), 800);
}

/* -- END OF OVERALL CONTACT SECTION BEHAVIOUR -- */

// Initial check on page load
window.addEventListener('DOMContentLoaded', updateInertState);