/* ==========================================
   JAVASCRIPT — Portfolio of Mageshwaran M
========================================== */

/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let fx = mx, fy = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateCursor() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  cursorFollower.style.left = fx + 'px';
  cursorFollower.style.top = fy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ---- Particle Canvas ---- */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 1.5 + 0.3;
    this.speed = Math.random() * 0.4 + 0.1;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = -this.speed;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
    this.hue = Math.random() > 0.5 ? 217 : 188; // blue or cyan
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life > this.maxLife || this.y < 0 || this.x < 0 || this.x > W) this.reset();
  }
  draw() {
    const ratio = this.life / this.maxLife;
    const a = ratio < 0.2 ? ratio / 0.2 : ratio > 0.8 ? (1 - ratio) / 0.2 : 1;
    ctx.save();
    ctx.globalAlpha = this.alpha * a;
    ctx.fillStyle = `hsl(${this.hue}, 80%, 70%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  particles = Array.from({ length: 80 }, () => new Particle());
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ---- Navbar ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveNav();
  animateSkillBars();
  revealElements();
});

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sTop = section.offsetTop - 100;
    if (window.scrollY >= sTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section') === current);
  });
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

/* ---- Typed Text Effect ---- */
const typedEl = document.getElementById('typedText');
const roles = [
  'Computer Science Student',
  'Web Developer',
  'Curious Learner',
  'Problem Solver',
  'Aspiring Developer'
];
let roleIdx = 0, charIdx = 0, deleting = false;

function typeEffect() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 90);
}
typeEffect();

/* ---- Scroll Reveal ---- */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

function revealElements() {
  const triggerBottom = window.innerHeight * 0.88;
  revealEls.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      setTimeout(() => el.classList.add('in-view'), i * 50);
    }
  });
}
revealElements();

/* ---- Skill Bar Animation ---- */
let barsAnimated = false;

function animateSkillBars() {
  if (barsAnimated) return;
  const skillSection = document.getElementById('skills');
  if (!skillSection) return;
  const top = skillSection.getBoundingClientRect().top;
  if (top < window.innerHeight * 0.85) {
    barsAnimated = true;
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const fill = bar.querySelector('.skill-bar-fill');
      const width = bar.getAttribute('data-width');
      setTimeout(() => { fill.style.width = width + '%'; }, 300);
    });
  }
}

/* ---- Contact Form ---- */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  if (!name || !email || !message) {
    shakeForm();
    return;
  }

  const btn = document.getElementById('formSubmitBtn');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Sending...';

  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Send Message';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1500);
});

function shakeForm() {
  const formWrap = document.querySelector('.contact-form-wrap');
  formWrap.style.animation = 'shake 0.5s ease';
  setTimeout(() => formWrap.style.animation = '', 600);
}

// Shake keyframe via JS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ---- Floating Badges Parallax on Hover ---- */
const avatarWrap = document.querySelector('.hero-avatar-wrap');
if (avatarWrap) {
  avatarWrap.addEventListener('mousemove', e => {
    const rect = avatarWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    const img = avatarWrap.querySelector('.avatar-img-wrap');
    if (img) {
      img.style.transform = `perspective(600px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg) scale(1.03)`;
    }
  });
  avatarWrap.addEventListener('mouseleave', () => {
    const img = avatarWrap.querySelector('.avatar-img-wrap');
    if (img) img.style.transform = '';
  });
}

/* ---- Smooth section highlighting on nav click ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ---- FAQ Accordion Toggle ---- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      const b = i.querySelector('.faq-question');
      if (b) b.setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ---- Init on load ---- */
window.addEventListener('load', () => {
  revealElements();
  animateSkillBars();
  updateActiveNav();
});

