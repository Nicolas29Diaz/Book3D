import { useEffect } from "react";
import PropTypes from "prop-types";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
}

const generateCanvasTexture = async (
  data,
  index,
  height = 1000,
  width = 750
) => {
  const isLeftPage = index % 2 === 0;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  let templateImage = "";

  switch (data.race) {
    case "Human":
      templateImage = "/templates/TemplateEarth2.webp";
      break;
    case "Namekian":
      templateImage = "/templates/TemplateEarth2.webp";
      break;
    case "Frieza Race":
      templateImage = "/templates/TemplateEarth2.webp";
      break;
    case "Android":
      templateImage = "/templates/TemplateEarth1.webp";
      break;
    case "Saiyan":
      templateImage = "/templates/TemplateEarth1.webp";
      break;
    default:
      "Human";
  }

  let TextContainer = "";
  isLeftPage
    ? (TextContainer = "/templates/TextContainerLeft.webp")
    : (TextContainer = "/templates/TextContainerRight.webp");

  const images = [templateImage, data.image, TextContainer];

  try {
    const imagesLoaded = await Promise.all(images.map((src) => loadImage(src)));

    //Template
    ctx.drawImage(imagesLoaded[0], 0, 0, width, height);

    if (isLeftPage) {
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      //Character
      ctx.drawImage(imagesLoaded[1], 318, 24, 423, 942);
      //TextContainer
      ctx.drawImage(imagesLoaded[2], 0, 0, width, height);

      //Name
      ctx.font = "900 70px Arial";
      ctx.fillStyle = "white";
      ctx.lineWidth = 10;
      ctx.strokeStyle = "black";
      ctx.strokeText(data.name.toUpperCase(), 32, 85);
      ctx.fillText(data.name.toUpperCase(), 32, 85);

      //Race
      ctx.font = "bold 45px Arial";
      ctx.fillStyle = "#F2D947";
      ctx.lineWidth = 10;
      ctx.strokeStyle = "black";
      ctx.strokeText(data.race, 37, 40);
      ctx.fillText(data.race, 37, 40);

      //TITLES
      ctx.font = "bold 32px Arial";
      ctx.fillStyle = "#D6B70E";
      //KI
      ctx.fillText("Base KI", 37, 200);
      //Max KI
      ctx.fillText("Base KI", 37, 299);
      //Gender
      ctx.fillText("Gender", 37, 398);
      //Affiliation
      ctx.fillText("Affiliation", 37, 497);
      //Description
      ctx.fillText("Description", 37, 620);

      //VALUES
      ctx.font = "bold 30px Arial";
      ctx.fillStyle = "white";
      //Ki
      ctx.fillText(data.ki, 37, 237);
      //Max ki
      ctx.fillText(data.maxKi, 37, 336);
      //Gender
      ctx.fillText(data.gender, 37, 435);
      //Affiliation
      ctx.fillText(data.affiliation, 37, 534);
      //Description
      ctx.font = "normal 28px Arial";
      wrapText(ctx, data.description, 37, 668, 448, 30);
    } else {
      ctx.textAlign = "right";
      ctx.textBaseline = "top";

      //Character
      ctx.drawImage(imagesLoaded[1], 18, 24, 423, 942);
      //TextContainer
      ctx.drawImage(imagesLoaded[2], 0, 0, width, height);

      //Name
      ctx.font = "900 70px Arial";
      ctx.fillStyle = "white";
      ctx.lineWidth = 10;
      ctx.strokeStyle = "black";
      ctx.strokeText(data.name.toUpperCase(), 718, 85);
      ctx.fillText(data.name.toUpperCase(), 718, 85);

      //Race
      ctx.font = "bold 45px Arial";
      ctx.fillStyle = "#F2D947";
      ctx.lineWidth = 10;
      ctx.strokeStyle = "black";
      ctx.strokeText(data.race, 718, 40);
      ctx.fillText(data.race, 718, 40);

      //TITLES
      ctx.font = "bold 32px Arial";
      ctx.fillStyle = "#D6B70E";
      //KI
      ctx.fillText("Base KI", 718, 200);
      //Max KI
      ctx.fillText("Base KI", 718, 299);
      //Gender
      ctx.fillText("Gender", 718, 398);
      //Affiliation
      ctx.fillText("Affiliation", 718, 497);
      //Description
      ctx.fillText("Description", 435, 620);

      //VALUES
      ctx.font = "bold 30px Arial";
      ctx.fillStyle = "white";
      //Ki
      ctx.fillText(data.ki, 718, 237);
      //Max ki
      ctx.fillText(data.maxKi, 718, 336);
      //Gender
      ctx.fillText(data.gender, 718, 435);
      //Affiliation
      ctx.fillText(data.affiliation, 718, 534);
      //Description
      ctx.font = "normal 28px Arial";
      ctx.textAlign = "left";
      wrapText(ctx, data.description, 260, 668, 448, 30);
    }

    const imageUrl = canvas.toDataURL("image/jpeg");
    return imageUrl;
  } catch (error) {
    console.error("Error loading images:", error);
  }
};

const PictureGenerator = ({ onGenerate, data }) => {
  useEffect(() => {
    const generateTextures = async () => {
      const textures = []; // Creamos un array vacío para almacenar las texturas

      // Genera las texturas basadas en el número de imágenes que quieras crear
      for (let i = 0; i < data.length; i++) {
        const texture = await generateCanvasTexture(data[i], i); // Espera a que se genere cada textura
        textures.push(texture); // Añade la textura al array
      }

      // Llama a la función onGenerate con las texturas generadas
      onGenerate(textures);
    };

    generateTextures(); // Llamamos a la función asíncrona para generar las texturas
  }, [onGenerate, data]);

  return null; // Este componente no necesita renderizar nada en pantalla
};

PictureGenerator.propTypes = {
  onGenerate: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default PictureGenerator;

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 7) {
  let words = text.split(" ");
  let line = "";
  let lines = [];

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + " ";
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;

    // Si el ancho de la línea supera el máximo, dibuja la línea y comienza una nueva
    if (testWidth > maxWidth && i > 0) {
      lines.push(line); // Guardar la línea completa
      line = words[i] + " "; // Comienza una nueva línea con la palabra actual
    } else {
      line = testLine; // Continúa construyendo la línea
    }
    if (lines.length >= maxLines) {
      break;
    }
  }
  lines.push(line); // Agrega la última línea

  if (lines.length > maxLines) {
    lines[maxLines] = lines[maxLines].trim() + "...";
  }

  // Dibuja cada línea de texto en el canvas
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + i * lineHeight);
  }
}
