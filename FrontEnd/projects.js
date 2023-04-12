const gallery = document.querySelector(".gallery");
const worksData = await fetch("http://localhost:5678/api/works");
const works = await worksData.json();

function createProjects(...works) {
  for (let work of works) {
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");

    imageElement.src = work.imageUrl;
    figcaptionElement.innerText = work.title;

    figureElement.append(imageElement, figcaptionElement);

    gallery.append(figureElement);
  }
}

createProjects(...works);

const filtres = document.querySelector(".filtres");
const filtersBt = [];
const filtersData = await fetch("http://localhost:5678/api/categories");
const filters = await filtersData.json();

function createFiltersBt(...filters) {
  createFirstButton();

  for (let filter of filters) {
    const button = document.createElement("button");

    button.innerText = filter.name;
    button.classList.add("filtresNotSelected", "filtersButton");
    button.id = filter.id;
    addListenersToFiltersBt(button, filter.id);

    filtersBt.push(button);
    filtres.append(button);
  }
}

function createFirstButton() {
  const button = document.createElement("button");

  button.innerText = "Tous";
  button.classList.add("filtresSelected", "filtersButton");
  button.id = 0;
  addListenersToFiltersBt(button, 0);

  filtersBt.push(button);
  filtres.append(button);
}

function addListenersToFiltersBt(button, buttonId) {
  button.addEventListener("click", event => {
    for (let button of filtersBt) {
      if (button === event.target) {
        button.classList.add("filtresSelected");
        button.classList.remove("filtresNotSelected");
      } else {
        button.classList.remove("filtresSelected");
        button.classList.add("filtresNotSelected");
      }
    }

    filterWorks(buttonId);
  });
}

function filterWorks(buttonId) {
  const filtedWorks = [];

  gallery.innerHTML = "";

  for (let work of works) {
    if (work.categoryId === buttonId) {
      filtedWorks.push(work);
    }
  }

  if (buttonId === 0) {
    createProjects(...works);
  } else {
    createProjects(...filtedWorks);
  }
}

createFiltersBt(...filters);
