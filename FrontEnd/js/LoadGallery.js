export class LoadGallery {
  constructor(works) {
    this.gallery = document.querySelector(".gallery");
    this.filtres = document.querySelector(".filtres");
    this.works = works;
    this.filtersBt = [];
  }

  createProjects(works) {
    for (let work of works) {
      const figureElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      const figcaptionElement = document.createElement("figcaption");

      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;
      figcaptionElement.innerText = work.title;

      figureElement.append(imageElement, figcaptionElement);
      figureElement.dataset.catId = work.categoryId;

      this.gallery.append(figureElement);
    }
  }

  createFiltersBt(filters) {
    this.createFirstButton();

    for (let filter of filters) {
      const button = document.createElement("button");

      button.innerText = filter.name;
      button.classList.add("NotSelectedFilter", "filtersButton");
      button.id = filter.id;
      this.addListenersToFiltersBt(button, filter.id);

      this.filtersBt.push(button);
      this.filtres.append(button);
    }
  }

  createFirstButton() {
    const button = document.createElement("button");

    button.innerText = "Tous";
    button.classList.add("SelectedFilter", "filtersButton");
    button.id = 0;
    this.addListenersToFiltersBt(button, 0);

    this.filtersBt.push(button);
    this.filtres.append(button);
  }

  addListenersToFiltersBt(button, buttonId) {
    button.addEventListener("mousedown", event => {
      for (let button of this.filtersBt) {
        if (button === event.target) {
          button.classList.add("SelectedFilter");
          button.classList.remove("NotSelectedFilter");
        } else {
          button.classList.remove("SelectedFilter");
          button.classList.add("NotSelectedFilter");
        }
      }

      this.filterWorks(buttonId);
    });
  }

  filterWorks(buttonId) {
    const works = document.querySelectorAll("[data-cat-id]");

    for (let work of works) {
      if (buttonId === 0) {
        work.classList.remove("hide");
      } else if (parseInt(work.dataset.catId) === buttonId) {
        work.classList.remove("hide");
      } else {
        work.classList.add("hide");
      }
    }
  }
}
