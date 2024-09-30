import { useAtom } from "jotai";
import { pageAtom, pages } from "../constants/Constants";
import Page from "./Page";

function Book({ ...props }) {
  const [page] = useAtom(pageAtom);
  return (
    <group {...props}>
      {[...pages].map((pageData, index) => (
        <Page key={index} number={index} {...pageData} page={page} />
      ))}
    </group>
  );
}

export default Book;
