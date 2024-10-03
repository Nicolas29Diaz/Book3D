import { useEffect } from "react";
import PropTypes from "prop-types";

const generateCanvasTexture = (data, index, height = 1000, width = 750) => {
  return new Promise((resolve, reject) => {
    // Crear el canvas y el contexto
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    // Cargar la imagen de fondo en formato WebP
    const backgroundImage = new Image();
    backgroundImage.src = `${
      data.race === "Human"
        ? "/templates/PageTemplate1Earth.webp"
        : "/templates/PageTemplate1Earth.webp"
    }`;

    // Cuando la imagen se cargue
    backgroundImage.onload = () => {
      // Dibuja la imagen de fondo cubriendo todo el canvas
      context.drawImage(backgroundImage, 0, 0, width, height);

      // Dibujar el texto en el canvas

      context.font = "bold 70px Arial";
      context.fillStyle = "white";
      context.textAlign = "left"; // Alinear el texto a la izquierda
      context.textBaseline = "bottom"; // Establecer la línea base en la parte inferior
      if (index % 2 === 0) {
        context.fillText(data.name, 50, 140);
        context.font = "bold 40px Arial";
        context.fillText(data.ki, 50, 220);
      } else {
        context.fillText(data.name, 450, 140);
        context.font = "bold 40px Arial";
        context.fillText(data.ki, 450, 220);
      }

      // Ahora que la imagen está dibujada, convertir el canvas a un URL de imagen
      const imageUrl = canvas.toDataURL("image/jpeg"); // Convertir a formato JPG
      resolve(imageUrl); // Resuelve la promesa con la URL de la imagen
    };

    // Si ocurre un error al cargar la imagen
    backgroundImage.onerror = (error) => {
      reject("Error cargando la imagen: " + error.message);
    };
  });
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
