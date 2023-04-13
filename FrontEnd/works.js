export class Works {
  constructor(gallery, filtres, works) {
    this.gallery = gallery;
    this.filtres = filtres;
    this.works = works;
    this.filtersBt = [];
  }

  createProjects(...works) {
    for (let work of works) {
      const figureElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      const figcaptionElement = document.createElement("figcaption");

      imageElement.src = work.imageUrl;
      figcaptionElement.innerText = work.title;

      figureElement.append(imageElement, figcaptionElement);

      this.gallery.append(figureElement);
    }
  }

  createFiltersBt(...filters) {
    this.createFirstButton();

    for (let filter of filters) {
      const button = document.createElement("button");

      button.innerText = filter.name;
      button.classList.add("filtresNotSelected", "filtersButton");
      button.id = filter.id;
      this.addListenersToFiltersBt(button, filter.id);

      this.filtersBt.push(button);
      this.filtres.append(button);
    }
  }

  createFirstButton() {
    const button = document.createElement("button");

    button.innerText = "Tous";
    button.classList.add("filtresSelected", "filtersButton");
    button.id = 0;
    this.addListenersToFiltersBt(button, 0);

    this.filtersBt.push(button);
    this.filtres.append(button);
  }

  addListenersToFiltersBt(button, buttonId) {
    button.addEventListener("click", event => {
      for (let button of this.filtersBt) {
        if (button === event.target) {
          button.classList.add("filtresSelected");
          button.classList.remove("filtresNotSelected");
        } else {
          button.classList.remove("filtresSelected");
          button.classList.add("filtresNotSelected");
        }
      }

      this.filterWorks(buttonId);
    });
  }

  filterWorks(buttonId) {
    const filtedWorks = [];

    this.gallery.innerHTML = "";

    for (let work of this.works) {
      if (work.categoryId === buttonId) {
        filtedWorks.push(work);
      }
    }

    if (buttonId === 0) {
      this.createProjects(...this.works);
    } else {
      this.createProjects(...filtedWorks);
    }
  }
}
