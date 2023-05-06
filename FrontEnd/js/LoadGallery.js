/**
 * Load and filter all works contained on the server.
 */
export class LoadGallery {
  /**
   * Create a project and appending it to the HTML element selected.
   * @param {string} imgUrl Image source of the project.
   * @param {string} title Title of the project display under the image.
   * @param {number} categoryId Use to filter the work.
   * @param {number} workId Use to delete the work.
   * @param {HTMLElement} parentElement HTML element to append the project.
   */
  static createProject(imgUrl, title, categoryId, workId, parentElement) {
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");

    imageElement.src = imgUrl;
    imageElement.alt = title;
    figcaptionElement.innerText = title;

    figureElement.append(imageElement, figcaptionElement);
    figureElement.dataset.catId = categoryId;
    figureElement.dataset.workId = workId;

    parentElement.append(figureElement);
  }

  /**
   * Create filter and append it to the HTML element selected.
   * @param {Array} filters Array of objects containing filter data.
   * @param {HTMLElement} parentElement HTML element to append the filter.
   */
  static createFiltersBt(filters, parentElement) {
    for (let filter of filters) {
      const button = document.createElement("button");

      button.innerText = filter.name;
      button.dataset.filterId = filter.id;

      if (filter.name === "Tous") button.classList.add("SelectedFilter", "filtersButton");
      else button.classList.add("NotSelectedFilter", "filtersButton");

      parentElement.append(button);
    }

    this.addFiltersEventListener();
  }

  /**
   * Add event listener to all filter buttons.
   */
  static addFiltersEventListener() {
    const filterBts = document.querySelectorAll("[data-filter-id]");

    for (let filterBt of filterBts) {
      filterBt.addEventListener("mousedown", () => {
        this.filterWorks(filterBt.dataset.filterId, filterBts);
      });
    }
  }

  /**
   * Filter all works by the button id pass as parameter.
   * @param {number} buttonId Id of the button pressed.
   * @param {array} filterBts All HTML filter buttons elements.
   */
  static filterWorks(buttonId, filterBts) {
    this.showHideWorks(buttonId);
    this.changeFiltersUI(buttonId, filterBts);
  }

  /**
   * Show / hide works base on the button id pass as parameter.
   * @param {number} buttonId Id of the button pressed.
   */
  static showHideWorks(buttonId) {
    const works = document.querySelectorAll("[data-cat-id]");

    for (let work of works) {
      if (parseInt(buttonId) === 0) {
        work.classList.remove("hide");
      } else if (work.dataset.catId === buttonId) {
        work.classList.remove("hide");
      } else {
        work.classList.add("hide");
      }
    }
  }

  /**
   * Switch CSS class on all buttons.
   * @param {number} buttonId Id of the button pressed.
   * @param {array} filtersBt All HTML filter buttons elements.
   */
  static changeFiltersUI(buttonId, filtersBt) {
    for (let filterBt of filtersBt) {
      if (filterBt.dataset.filterId === buttonId) {
        filterBt.classList.add("SelectedFilter");
        filterBt.classList.remove("NotSelectedFilter");
      } else {
        filterBt.classList.remove("SelectedFilter");
        filterBt.classList.add("NotSelectedFilter");
      }
    }
  }
}
