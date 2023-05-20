import { LoadGallery } from "./LoadGallery.js";

export class EditPanel {
    constructor() {
        this.editPanel = document.querySelector("#editPanel");
        this.firstEditPanel = document.querySelector("#firstPanel");
        this.secondEditPanel = document.querySelector("#secondPanel");
        this.validateBt = document.querySelector("#validateBt");

        this.imgSrc;
        this.imgTitle;
        this.imgCategoryId;

        this.condition1 = false;
        this.condition2 = false;
        this.condition3 = false;

        this.initEvents();
    }

    /**
     * Initialize all "addEventListener".
     */
    initEvents() {
        //#region Open / close edit panel listeners
        //Open the first panel (edit gallery).
        document.querySelector("#openEditPanel").addEventListener("mousedown", () => {
            this.openEditPanel(true, 0);
        });

        //Open the second panel (add picture).
        document.querySelector("#addPictureBt").addEventListener("mousedown", () => {
            this.openEditPanel(true, 1);
        });

        //Return back to the first panel.
        document.querySelector("#return").addEventListener("mousedown", () => {
            this.openEditPanel(true, 0);
        });

        //Close edit panel.
        document.querySelectorAll(".closeEditPanel").forEach(element => {
            element.addEventListener("mousedown", () => {
                this.openEditPanel(false, -1);
            });
        });
        //#endregion

        document.querySelector("#pictureFile").addEventListener("change", event => {
            this.condition1 = true;

            document.querySelector(".selectFileSettings").classList.add("hide");
            document.querySelector(".pictureRender").classList.remove("hide");

            let pictureSrc = URL.createObjectURL(event.target.files[0]);

            document.querySelector(".pictureRender img").src = pictureSrc;

            this.imgSrc = event.target.files[0];

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

            this.imgCategoryId = event.target.selectedIndex;

            this.canAddPicture();
        });

        document.querySelector("#validateBt").addEventListener("mousedown", () => {
            if (this.canAddPicture()) this.addPictureToGallery();
        });

        //#region Listener for extra buttons without fonctionality.
        document.querySelector("#deleteAll").addEventListener("mousedown", () => {
            alert("Fonctionalité en cours de développement.");
        });

        document.querySelector("#editDescription").addEventListener("mousedown", () => {
            alert("Fonctionalité en cours de développement.");
        });

        document.querySelector("#editPictureProfil").addEventListener("mousedown", () => {
            alert("Fonctionalité en cours de développement.");
        });

        document.querySelector("#publishChanges").addEventListener("mousedown", () => {
            alert("Fonctionalité en cours de développement.");
        });
        //#endregion
    }

    /**
     * Check if the conditions are validate to add a work.
     * @returns True if the 3 inputs are checked. Otherwise false.
     */
    canAddPicture() {
        if (this.condition1 && this.condition2 && this.condition3) {
            this.validateBt.classList.remove("editPanelButtonOff");

            return true;
        } else {
            this.validateBt.classList.add("editPanelButtonOff");

            return false;
        }
    }

    /**
     * Call the server to add the picture settings to the data base.
     */
    async addPictureToGallery() {
        this.openEditPanel(false, -1); //Close edit panel.

        const formData = new FormData();

        formData.append("image", this.imgSrc);
        formData.append("title", this.imgTitle);
        formData.append("category", this.imgCategoryId);

        const request = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, //Check if admin is connected
            },
            body: formData,
        });

        if (request.ok) {
            const response = await request.json();

            LoadGallery.createProject(response.imageUrl, response.title, response.categoryId, response.id);
        }
    }

    /**
     * Open / close the panel you pass in parameter.
     * @param {boolean} open True = open / False = close.
     * @param {number} panelId 0 = edit panel / 1 = add panel.
     */
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

    /**
     * Load all works to the edit panel.
     * @param {array} works All works to load.
     */
    static loadProjects(works) {
        const editPanelGallery = document.querySelector("#editPanelGallery");

        for (let work of works) {
            const img = document.createElement("img");
            const figure = document.createElement("figure");
            const figcaption = document.createElement("figcaption");
            const trashDiv = document.createElement("div");
            const trashIcon = document.createElement("i");
            const moveDiv = document.createElement("div");
            const moveIcon = document.createElement("i");

            img.src = work.imageUrl;
            img.alt = work.title;
            img.id = "picture"; //css style
            figcaption.innerText = "éditer";

            figcaption.addEventListener("mousedown", () => {
                alert("Fonctionalité en cours de développement.")
            })

            trashIcon.classList.add("fa-solid", "fa-sm", "fa-trash-can")
            trashIcon.id = "trashIcon";
            trashDiv.appendChild(trashIcon);
            trashDiv.classList.add("trashIconContainer");

            trashDiv.addEventListener("mousedown", () => {
                this.deleteWork(work.id);
            });

            moveIcon.classList.add("fa-solid", "fa-sm", "fa-maximize");
            moveIcon.id = "moveIcon";
            moveDiv.appendChild(moveIcon);
            moveDiv.classList.add("moveIconContainer");

            moveDiv.addEventListener("mousedown", () => {
                alert("Fonctionalité en cours de développement.")
            });

            figure.append(img, trashDiv, moveDiv, figcaption);
            figure.dataset.workId = work.id;

            editPanelGallery.append(figure);
        }
    }

    /**
     * Call the server to delete a work.
     * @param {number} workId Work id to delete.
     */
    static async deleteWork(workId) {
        const request = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, //Check if admin is connected
            },
        });

        if (request.ok) {
            const works = document.querySelectorAll(`[data-work-id="${workId}"]`);

            works[0].remove();
            works[1].remove();
        }
    }

    /**
     * Create a HTML option element for each filter in parameter.
     * @param {Array} filters All filters name.
     */
    static loadCategories(filters) {
        const pictureCategory = document.querySelector("#pictureCategory");

        for (let filter of filters) {
            const option = document.createElement("option");
            option.innerText = filter.name;
            option.id = filter.id;

            pictureCategory.appendChild(option);
        }
    }
}
