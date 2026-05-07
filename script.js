let menuData = {};
let currentLang = 'de';
let darkMode = false;

fetch('menu.json')
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

/* 🌙 Dark Mode Toggle */
function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
}

/* ✨ Animation Helper */
function animateIn(element, delay = 0) {
    setTimeout(() => {
      element.style.transition = "all 0.4s ease";
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }, delay);
  }

function renderMenu() {
  const data = menuData[currentLang];

  document.getElementById('title').innerText = data.title;

  const menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = "";

  data.categories.forEach((cat, index) => {
    const catDiv = document.createElement('div');
    catDiv.className = "category";

    const catTitle = document.createElement('h2');
    catTitle.innerText = cat.name;
    catDiv.appendChild(catTitle);

    cat.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = "item";

      itemDiv.innerHTML = `
        <div class="item-left">
          <div class="item-name">${item.name}</div>
          <div class="item-desc">${item.description || ""}</div>
        </div>
        <div class="item-price">${formatPrice(item.price)}</div>
      `;

      catDiv.appendChild(itemDiv);
    });

    menuDiv.appendChild(catDiv);

// Animation starten mit Verzögerung (schönes nacheinander Einblenden)
animateIn(catDiv, index * 120);

    /* ✨ Animation pro Kategorie */
    animateIn(catDiv);
  });
}