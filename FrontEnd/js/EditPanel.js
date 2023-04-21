export class EditPanel {
  static openEditPanel(open) {
    if (!this.editPanel) this.editPanel = document.querySelector(".editPanel");

    if (open) {
      this.editPanel.style.display = "block";
    } else this.editPanel.style.display = "none";
  }

  static loadProjects() {
    const editPanelGallery = document.querySelector("#editPanelGallery");
    const works = document.querySelectorAll("[data-cat-id] img");

    for (let work of works) {
      const imgElement = document.createElement("img");
      const figureElement = document.createElement("figure");
      const figcaptionElement = document.createElement("figcaption");

      imgElement.src = work.currentSrc;
      imgElement.alt = work.alt;
      figcaptionElement.innerText = "éditer";

      figureElement.append(imgElement, figcaptionElement);

      editPanelGallery.append(figureElement);
    }
  }
}
