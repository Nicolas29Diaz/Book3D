import { useAtom } from "jotai";
import { pagesAtom, currentPageAtom } from "../constants/Constants";
import Page from "./Page";
import { useEffect, useState } from "react";

function Book({ ...props }) {
  const [pages] = useAtom(pagesAtom);
  const [currentPage] = useAtom(currentPageAtom);

  const [delayedPage, setDelayedPage] = useState(currentPage);

  useEffect(() => {
    const pageDiff = Math.abs(delayedPage - currentPage);
    
    if (pageDiff > 1) {
      let lastPage = delayedPage;
      const interval = setInterval(
        () => {
          lastPage += lastPage < currentPage ? 1 : -1;
          setDelayedPage(lastPage);

          if (lastPage === currentPage) {
            clearInterval(interval);
          }
        },
        pageDiff > 7 ? 20 : pageDiff > 2 ? 80 : 150
      );
    } else {
      setDelayedPage(currentPage);
    }
  }, [currentPage, delayedPage]);

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {[...pages].map((pageData, index) => (
        <Page
          key={index}
          pageNumber={index}
          currentPage={delayedPage}
          pageOpened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          {...pageData}
        />
      ))}
    </group>
  );
}

export default Book;
