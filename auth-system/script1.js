
  




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

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Hamburger
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

// Touch swipe
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

// Init
const slider = document.querySelector('.slider-wrapper');
const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
  currentIndex = index;
  resetInterval();
}

// Add click listeners to dots
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

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}


  const counters = document.querySelectorAll('.counter');
  const options = { threshold: 0.6 };
  
  const startCounting = (entry) => {
    const counter = entry.target;
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = Math.ceil(target / 100);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry);
        obs.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));

  const courseData = [
  { title: "G.P Rating", duration: "6 Months" },
  { title: "Saloon Rating", duration: "6 Months" },
  { title: "Direct Entry Scheme", duration: "3 Months" },
  { title: "Diploma in Nautical Science", duration: "1 Year" },
  { title: "B.Sc. Nautical Science", duration: "3 Years" },
  { title: "B.E. Marine Engineering", duration: "4 Years" },
  { title: "Diploma in Marine Engineering", duration: "2 Years" },
  { title: "Marine Engg. ATS", duration: "2 Years 6 Months" },
  { title: "Naval Arch. & Offshore", duration: "4 Years" },
  { title: "HND (Nautical) UK", duration: "2 Years" },
  { title: "HND (Marine) UK", duration: "2 Years" },
  { title: "GME", duration: "1 Year" },
  { title: "ETO", duration: "4 Months" },
  
  { title: "Deck Officer Trainee", duration: "28 Months" }
];

function createCourseSlides() {
  const slideContainer = document.querySelector('.course-slide');
  slideContainer.innerHTML = '';

  for (let i = 0; i < courseData.length; i += 3) {
    const pageCourses = courseData.slice(i, i + 3);
    const slide = document.createElement('div');
    slide.style.display = "flex";
    slide.style.gap = "15px";

    pageCourses.forEach(course => {
      const card = document.createElement('div');
      card.className = 'course-card';
      card.innerHTML = `
        <div class="course-title"><i class="fas fa-book"></i> ${course.title}</div>
        <div class="course-duration"><i class="fas fa-clock"></i> ${course.duration}</div>
      `;
      slide.appendChild(card);
    });

    slideContainer.appendChild(slide);
  }
}

document.addEventListener('DOMContentLoaded', createCourseSlides);


// Initialize EmailJS
(function() {
  emailjs.init("SWTDHDfvc5Uc804v4"); // replace with your EmailJS public key
})();

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_nfknhec", "template_htzqn6j", this)
    .then(() => {
      alert("Message sent successfully!");
      this.reset();
    }, (error) => {
      alert("Failed to send message: " + error.text);
    });
});

