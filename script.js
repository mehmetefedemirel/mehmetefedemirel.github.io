const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const progress = document.querySelector(".progress");
const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${scrolled}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();



const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll('.nav-links a[href^="#"]');
const setActive = () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 160;
    if (window.scrollY >= top) current = section.id;
  });
  links.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
};
window.addEventListener("scroll", setActive, { passive: true });
setActive();

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = "true";
    img.src = img.dataset.fallback || new URL("images/smart-parking.svg", document.querySelector("script[src$='script.js']").src).href;
  });
});

// Close the navigation with the keyboard.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks?.classList.contains("open")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});
