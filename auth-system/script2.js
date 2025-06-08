const form = document.getElementById('contact-form');
const responseMsg = document.getElementById('responseMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const plainFormData = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("https://formspree.io/f/mayvlxyz", {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });

    if (res.ok) {
      form.reset();
      responseMsg.style.display = 'block';
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  } catch (err) {
    alert("Network error. Please try again later.");
  }
});

const slides = document.querySelectorAll(".slide");
let currentIndex = 0;
let interval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  interval = setInterval(nextSlide, 4000);
}

function pause() {
  clearInterval(interval);
}

function resume() {
  startAutoSlide();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMenu() {
  const menu = document.getElementById("navLinks");
  menu.classList.toggle("active");
}

document.querySelector(".btn.left").addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

document.querySelector(".btn.right").addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

function resetInterval() {
  pause();
  startAutoSlide();
}

let startX = 0;
const carousel = document.querySelector(".carousel-container");

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) prevSlide();
  else if (diff < -50) nextSlide();

  resetInterval();
});

const slider = document.querySelector('.slider-wrapper');
const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
  slider.style.transform = translateX(-${index * 100}%);
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
  currentIndex = index;
  resetInterval();
}

dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => goToSlide(idx));
});

function animateOnScroll() {
  document.querySelectorAll('.animate').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
  animateOnScroll();
  startAutoSlide();
});

const leftBtn = document.querySelector(".btn.left");
const rightBtn = document.querySelector(".btn.right");

if (leftBtn && rightBtn) {
  leftBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  rightBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });
}