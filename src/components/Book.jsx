import { useAtom } from "jotai";
import { pages, currentPageAtom } from "../constants/Constants";
import Page from "./Page";
// import { useEffect, useState } from "react";

function Book({ ...props }) {
  const [currentPage] = useAtom(currentPageAtom);

  // const [delayedPage, setDelayedPage] = useState(currentPage);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setDelayedPage(currentPage);
  //   }, 1000);
  //   return () => clearTimeout(timeout);
  // }, [currentPage]);

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {[...pages].map((pageData, index) => (
        <Page
          key={index}
          pageNumber={index}
          {...pageData}
          currentPage={currentPage}
          pageOpened={currentPage > index}
          bookClosed={currentPage === 0 || currentPage === pages.length}
        />
      ))}
    </group>
  );
}

export default Book;
