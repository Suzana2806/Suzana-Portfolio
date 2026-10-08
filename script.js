// 1. Typing effect in the hero
const roles = ["Software Engineer", "AI Product Builder", "NLP & LLM Enthusiast"];
const typingEl = document.getElementById("typing");
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = roles[roleIndex];
  typingEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

// 2. 3D tilt effect on every element with a data-tilt attribute
document.querySelectorAll("[data-tilt]").forEach((el) => {
  const max = parseFloat(el.dataset.tilt) || 10;

  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform =
      `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) scale3d(1.03, 1.03, 1.03)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

// 3. Fade-in animation when sections scroll into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// 4. Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// 5. Footer year
document.getElementById("year").textContent = new Date().getFullYear();
// 6. Smooth tilt + parallax for the hero photo
const photoCard = document.getElementById("photoCard");
const heroVisual = document.querySelector(".hero-visual");

if (photoCard && heroVisual) {
  heroVisual.addEventListener("mousemove", (e) => {
    const r = heroVisual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    photoCard.style.setProperty("--ry", `${x * 10}deg`);
    photoCard.style.setProperty("--rx", `${-y * 10}deg`);
    photoCard.style.setProperty("--mx", x.toFixed(3));
    photoCard.style.setProperty("--my", y.toFixed(3));
  });

  heroVisual.addEventListener("mouseleave", () => {
    photoCard.style.setProperty("--ry", "0deg");
    photoCard.style.setProperty("--rx", "0deg");
    photoCard.style.setProperty("--mx", "0");
    photoCard.style.setProperty("--my", "0");
  });
}