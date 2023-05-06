import { LoadGallery } from "./LoadGallery.js";
import { EditPanel } from "./EditPanel.js";

window.addEventListener("DOMContentLoaded", () => {
  new EditPanel(); //Init the edit panel constructor.
  getData();
});

/**
 * Call the server to get the works and load the works and the filters to the gallery.
 */
async function getData() {
  const data = await fetch("http://localhost:5678/api/works");

  if (data.ok) {
    const gallery = document.querySelector(".gallery");
    const filter = document.querySelector(".filtres");
    const worksData = await data.json();

    for (let work of worksData) {
      LoadGallery.createProject(work.imageUrl, work.title, work.categoryId, work.id, gallery);
    }

    LoadGallery.createFiltersBt(getFilters(worksData), filter);

    isConnected(worksData);
  }
}

/**
 * Retrieve the filters informations base on the works data.
 * @param {array} worksData
 * @returns Array of objects containing filters informations.
 */
function getFilters(worksData) {
  let filters = [{ id: 0, name: "Tous" }];
  let filtersId = [0];

  for (let work of worksData) {
    if (filtersId.includes(work.categoryId)) continue;

    let filter = {
      id: work.categoryId,
      name: work.category.name,
    };

    filtersId.push(work.categoryId);
    filters.push(filter);
  }

  return filters;
}

/**
 * Check whatever the user admin is connected.
 * @param {array} worksData
 */
function isConnected(worksData) {
  if (localStorage.getItem("userId") === "1") {
    EditPanel.loadProjects(worksData);
    EditPanel.loadCategories(getFilters(worksData));

    showEditionUI();
  }
}

/**
 * Show elements of the edition mode.
 */
function showEditionUI() {
  const allModify = document.querySelectorAll(".modify");
  const edition = document.querySelector("#edition").parentElement;
  const filters = document.querySelector(".filtres");
  const login = document.querySelector("#login");
  const logout = document.querySelector("#logout");

  for (let modify of allModify) {
    modify.style.display = "flex";
  }

  edition.style.display = "flex";

  filters.style.display = "none";

  login.style.display = "none";
  logout.style.display = "block";
}
