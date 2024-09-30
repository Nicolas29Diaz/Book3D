import { useAtom } from "jotai";
import { pageAtom, pages } from "../constants/Constants";
import Page from "./Page";

function Book({ ...props }) {
  const [page] = useAtom(pageAtom);
  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {[...pages].map((pageData, index) => (
        <Page
          key={index}
          number={index}
          {...pageData}
          page={page}
          opened={page > index}
          bookClosed={page === 0 || page === pages.length}
        />
      ))}
    </group>
  );
}

export default Book;
