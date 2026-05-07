let menuData = {};
let currentLang = 'de';
let darkMode = false;

fetch('./menu.json')
  .then(res => res.json())
  .then(data => {
    menuData = data;
    renderMenu();
  });

function setLanguage(lang) {
  currentLang = lang;
  renderMenu();
}

/* 💰 Preisformat */
function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}

/* 🌙 Dark Mode */
function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
}

/* ✨ Animation */
function animateIn(element, delay = 0) {

  element.style.opacity = 0;
  element.style.transform = "translateY(20px)";

  setTimeout(() => {
    element.style.transition = "all 0.5s ease";
    element.style.opacity = 1;
    element.style.transform = "translateY(0)";
  }, delay);
}

/* 📋 Menü rendern */
function renderMenu() {

  const data = menuData[currentLang];

  document.getElementById('title').innerText = data.title;

  const menuDiv = document.getElementById('menu');

  menuDiv.innerHTML = "";

  data.categories.forEach((cat, index) => {

    const catDiv = document.createElement('div');
    catDiv.className = "category";

    /* IDs für Sticky Navigation */

    const categoryName = cat.name.toLowerCase();

    if (categoryName.includes("vorspeisen")) {
      catDiv.id = "vorspeisen";
    }

    if (categoryName.includes("hauptspeisen")) {
      catDiv.id = "hauptspeisen";
    }

    if (categoryName.includes("desserts")) {
      catDiv.id = "desserts";
    }

    if (
      categoryName.includes("getränke") ||
      categoryName.includes("getraenke")
    ) {
      catDiv.id = "getraenke";
    }

    if (
      categoryName.includes("spirituosen") ||
      categoryName.includes("schnaps")
    ) {
      catDiv.id = "spirituosen";
    }

    /* Hauptkategorie */

    const catTitle = document.createElement('h1');
    catTitle.className = "category-title";
    catTitle.innerText = cat.name;

    catDiv.appendChild(catTitle);

    /* Unterkategorien */

    if (cat.subcategories) {

      cat.subcategories.forEach(subcat => {

        const subTitle = document.createElement('h2');
subTitle.className = "subcategory-title";
subTitle.innerText = subcat.name;

/* IDs für Unterkategorien */

const subName = subcat.name.toLowerCase();

if (subName.includes("spirituosen")) {
  subTitle.id = "spirituosen";
}

        catDiv.appendChild(subTitle);

        subcat.items.forEach(item => {

          const itemDiv = document.createElement('div');
          itemDiv.className = "item";

          itemDiv.innerHTML = `
            <div class="item-left">
              <div class="item-name">${item.name}</div>
              <div class="item-desc">${item.description || ""}</div>
            </div>

            <div class="item-price">
              ${formatPrice(item.price)}
            </div>
          `;

          catDiv.appendChild(itemDiv);
        });
      });

    } else {

      cat.items.forEach(item => {

        const itemDiv = document.createElement('div');
        itemDiv.className = "item";

        itemDiv.innerHTML = `
          <div class="item-left">
            <div class="item-name">${item.name}</div>
            <div class="item-desc">${item.description || ""}</div>
          </div>

          <div class="item-price">
            ${formatPrice(item.price)}
          </div>
        `;

        catDiv.appendChild(itemDiv);
      });
    }

    menuDiv.appendChild(catDiv);

    animateIn(catDiv, index * 120);
  });
}

/* =========================================
   BACK TO TOP BUTTON
========================================= */

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});