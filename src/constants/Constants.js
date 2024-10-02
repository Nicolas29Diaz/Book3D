import { atom } from "jotai";

// Definir átomos
export const currentPageAtom = atom(0);
export const pagesAtom = atom([]);

// Función para generar páginas
export const generatePages = (pictures) => {
  const pages = [];

  // Primera página (portada)
  pages.push({
    front: "/textures/BackCover.webp",
    back: pictures[0],
  });

  // Páginas interiores
  for (let i = 1; i < pictures.length - 1; i += 2) {
    pages.push({
      front: pictures[i],
      back: pictures[i + 1],
    });
  }

  // Última página (contraportada)
  pages.push({
    front: pictures[pictures.length - 1],
    back: "/textures/BackCover.webp",
  });

  return pages;
};
