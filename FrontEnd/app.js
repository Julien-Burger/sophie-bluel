import { Works } from "./works.js";

const gallery = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres");

const data = await fetch("http://localhost:5678/api/works");
const worksData = await data.json();

const data2 = await fetch("http://localhost:5678/api/categories");
const filtersData = await data2.json();

let worksInstance = new Works(gallery, filtres, worksData);

worksInstance.createProjects(...worksData);
worksInstance.createFiltersBt(...filtersData);
