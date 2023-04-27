export class EditPanel {
  constructor() {
    this.editPanel = document.querySelector("#editPanel");
    this.firstEditPanel = document.querySelector("#firstPanel");
    this.secondEditPanel = document.querySelector("#secondPanel");
    this.validateBt = document.querySelector("#validateBt");

    this.imgSrc;
    this.imgTitle;
    this.imgCategory;
    this.imgCategoryId;

    this.condition1 = false;
    this.condition2 = false;
    this.condition3 = false;

    this.initEvents();
  }

  initEvents() {
    document.querySelector("#openEditPanel").addEventListener("mousedown", () => {
      this.openEditPanel(true, 0);
    });

    document.querySelector("#addPictureBt").addEventListener("mousedown", () => {
      this.openEditPanel(true, 1);
    });

    document.querySelector("#return").addEventListener("mousedown", () => {
      this.openEditPanel(true, 0);
    });

    document.querySelectorAll(".closeEditPanel").forEach(element => {
      element.addEventListener("mousedown", () => {
        this.openEditPanel(false, -1);
      });
    });

    document.querySelector("#pictureFile").addEventListener("change", event => {
      this.condition1 = true;

      document.querySelector(".selectFileSettings").classList.add("hide");
      document.querySelector(".pictureRender").classList.remove("hide");

      let pictureSrc = event.target.value.replace("C:\\fakepath\\", "/FrontEnd/assets/images/");
      document.querySelector(".pictureRender img").src = pictureSrc;

      this.imgSrc = pictureSrc;

      this.canAddPicture();
    });

    document.querySelector("#pictureTitle").addEventListener("input", event => {
      if (event.target.value === "") this.condition2 = false;
      else this.condition2 = true;

      this.imgTitle = event.target.value;

      this.canAddPicture();
    });

    document.querySelector("#pictureCategory").addEventListener("change", event => {
      this.condition3 = true;

      this.imgCategory = event.target.value;
      this.imgCategoryId = event.target.selectedIndex;

      this.canAddPicture();
    });

    document.querySelector("#validateBt").addEventListener("mousedown", () => {
      if (this.canAddPicture()) this.addPictureToGallery();
    });

    document.querySelector("#deleteAll").addEventListener("mousedown", () => {
      this.deleteAll();
    });
  }

  canAddPicture() {
    if (this.condition1 && this.condition2 && this.condition3) {
      this.validateBt.classList.remove("editPanelButtonOff");

      return true;
    } else {
      this.validateBt.classList.add("editPanelButtonOff");

      return false;
    }
  }

  addPictureToGallery() {
    this.openEditPanel(false, -1);

    const gallery = document.querySelector(".gallery");

    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");

    imageElement.src = this.imgSrc;
    imageElement.alt = this.imgTitle;
    figcaptionElement.innerText = this.imgTitle;

    figureElement.append(imageElement, figcaptionElement);
    figureElement.dataset.catId = this.imgCategoryId;

    gallery.append(figureElement);
  }

  openEditPanel(open, panelId) {
    if (open) {
      this.editPanel.style.display = "block";

      switch (panelId) {
        case 0:
          this.firstEditPanel.style.display = "flex";
          this.secondEditPanel.style.display = "none";
          break;
        case 1:
          this.firstEditPanel.style.display = "none";
          this.secondEditPanel.style.display = "flex";
          break;
      }
    } else this.editPanel.style.display = "none";
  }

  static loadProjects(works) {
    const editPanelGallery = document.querySelector("#editPanelGallery");

    for (let i = 0; i < works.length; i++) {
      const img = document.createElement("img");
      const figure = document.createElement("figure");
      const figcaption = document.createElement("figcaption");
      const div = document.createElement("div");
      const trashIcon = document.createElement("img");

      img.src = works[i].imageUrl;
      img.alt = works[i].title;
      img.id = "picture";
      figcaption.innerText = "éditer";

      trashIcon.src = "/FrontEnd/assets/icons/trash.png";
      trashIcon.id = "trashIcon";
      div.appendChild(trashIcon);
      div.classList.add("trashIconContainer");
      div.id = i;

      div.addEventListener("mousedown", () => {
        this.deleteWork(div);
      });

      figure.append(img, div, figcaption);

      editPanelGallery.append(figure);
    }
  }

  static deleteWork(div) {
    const galleryWorks = document.querySelectorAll("[data-cat-id]");
    const editPanelWorks = document.querySelector("#editPanelGallery").childNodes;

    for (let i = 0; i < galleryWorks.length; i++) {
      if (galleryWorks[i].id === div.id) {
        galleryWorks[i].remove();
        editPanelWorks[i + 1].remove();
      }
    }
  }

  static loadCategory(filters) {
    const pictureCategory = document.querySelector("#pictureCategory");

    for (let filter of filters) {
      const option = document.createElement("option");
      option.innerText = filter.name;
      option.id = filter.id;

      pictureCategory.appendChild(option);
    }
  }
}
