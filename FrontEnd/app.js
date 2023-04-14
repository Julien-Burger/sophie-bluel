import { LoadGallery } from "./LoadGallery.js";

//Request page informations
const data = await fetch("http://localhost:5678/api/works");
const worksData = await data.json();

const data2 = await fetch("http://localhost:5678/api/categories");
const filtersData = await data2.json();

//Loading page informations
let loadGallery = new LoadGallery(worksData);

loadGallery.createProjects(...worksData);
loadGallery.createFiltersBt(...filtersData);

//If admin is connected
if (localStorage.getItem("isConnected")) {
  showEditionUI();
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

localStorage.clear();
