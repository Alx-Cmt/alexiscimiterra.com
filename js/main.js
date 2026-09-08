const buttons = document.querySelectorAll(".buttons a");

function setActive(btn, activeClass = "active") {
  buttons.forEach((b) => b.classList.remove(activeClass));
  btn.classList.add(activeClass);
}

function setupToggle(buttons) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setActive(btn));
  });
}

setupToggle(buttons);

function setupScrollSpy() {
  const sections = Array.from(buttons)
    .filter((btn) => btn.getAttribute("href")?.startsWith("#"))
    .map((btn) => {
      const id = btn.getAttribute("href").slice(1);
      return { btn, section: document.getElementById(id) };
    })
    .filter((entry) => entry.section);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = sections.find((s) => s.section === entry.target);
          if (match) setActive(match.btn);
        }
      });
    },
    {
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach(({ section }) => observer.observe(section));
}

setupScrollSpy();

//Carousel
const mobileQuery = window.matchMedia("(max-width: 991px)"); // On cree le breakpoint dans JS
const dotsContainer = document.querySelector(".dots-container"); // on met le container des dots HTML dans une const 

let carouselIndex = 1; //On initialise l'index du carousel 

//Creation d'une fonction
function renderDots() {
  const count = mobileQuery.matches
    ? document.querySelectorAll(".carousel .slides").length
    : document.getElementsByClassName("carousel").length;

  dotsContainer.innerHTML = ""; // vide les anciens dots
  for (let i = 1; i <= count; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => currentSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function plusSlides(n) {
  showCarousel(carouselIndex += n);
}

function currentSlide(n) {
  showCarousel(carouselIndex = n);
}

function showCarousel(n) {
  let i;
  let dots = document.getElementsByClassName("dot");

  if (mobileQuery.matches) {
    let allSlides = document.querySelectorAll(".carousel .slides");
    if (n > allSlides.length) { carouselIndex = 1 }
    if (n < 1) { carouselIndex = allSlides.length }

    for (i = 0; i < allSlides.length; i++) {
      allSlides[i].classList.remove("mobile-active");
    }
    allSlides[carouselIndex - 1].classList.add("mobile-active");

  } else {
    let carousels = document.getElementsByClassName("carousel");
    if (n > carousels.length) { carouselIndex = 1 }
    if (n < 1) { carouselIndex = carousels.length }

    for (i = 0; i < carousels.length; i++) {
      carousels[i].style.display = "none";
    }
    carousels[carouselIndex - 1].style.display = "flex";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (dots[carouselIndex - 1]) {
    dots[carouselIndex - 1].className += " active";
  }
}

// Initialisation
renderDots();
showCarousel(carouselIndex);

document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
document.querySelector(".next").addEventListener("click", () => plusSlides(1));

// Regénère les dots + réinitialise au changement desktop ↔ mobile
mobileQuery.addEventListener("change", () => {
  carouselIndex = 1;
  renderDots();
  showCarousel(carouselIndex);
});

const burger = document.getElementById("burger");
const navMenu = document.querySelector(".buttons");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navMenu.classList.toggle("open");
});

document.querySelectorAll(".buttons a").forEach((link) => {
    link.addEventListener("click", () => {
        burger.classList.remove("active");
        navMenu.classList.remove("open");
    });
});