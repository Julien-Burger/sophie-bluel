import { LoadGallery } from "./LoadGallery.js";

window.addEventListener("DOMContentLoaded", () => {
  getData();
});

async function getData() {
  try {
    const data = await fetch("http://localhost:5678/api/works");
    const worksData = await data.json();

    let loadGallery = new LoadGallery(worksData);

    loadGallery.createProjects(worksData);
    loadGallery.createFiltersBt(getFilters(worksData));
  } catch (error) {
    alert("Server request problem!");
  }

  isConnected();
}

function getFilters(worksData) {
  let filters = [];
  let filtersId = [];

  for (let work of worksData) {
    if (filtersId.includes(work.category.id)) continue;

    filtersId.push(work.category.id);

    let filter = {
      id: work.category.id,
      name: work.category.name,
    };

    filters.push(filter);
  }

  return filters;
}

function isConnected() {
  if (localStorage.getItem("isConnected")) {
    showEditionUI();
  }

  localStorage.clear();
}

function showEditionUI() {
  const allModify = document.querySelectorAll(".modify");
  const edition = document.querySelector("#edition").parentElement;
  const filters = document.querySelector(".filtres");

  for (let modify of allModify) {
    modify.style.display = "flex";
  }

  edition.style.display = "flex";

  filters.style.display = "none";
}
