import { useEffect } from "react";
import { useAtom } from "jotai";
import { dataAtom } from "../constants/Constants";

const useFetch = (
  url = "https://dragonball-api.com/api/characters?limit=18"
) => {
  const [, setData] = useAtom(dataAtom); // Desestructura el setter del atom

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error en la respuesta del API");
        }
        const jsonData = await response.json();
        setData(jsonData.items); // Almacena los datos en el atom
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url, setData]); // Agrega setData a las dependencias
};

export default useFetch;
