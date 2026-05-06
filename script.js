let menuData = {};
let currentLang = 'de';

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

function renderMenu() {
  const data = menuData[currentLang];

  document.getElementById('title').innerText = data.title;

  const menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = "";

  data.categories.forEach(cat => {
    const catDiv = document.createElement('div');
    catDiv.className = "category";

    const catTitle = document.createElement('h2');
    catTitle.innerText = cat.name;
    catDiv.appendChild(catTitle);

    cat.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = "item";

      itemDiv.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price}€</span>
      `;

      catDiv.appendChild(itemDiv);
    });

    menuDiv.appendChild(catDiv);
  });
}