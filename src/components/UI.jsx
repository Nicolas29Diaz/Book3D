import { currentPageAtom, pagesAtom } from "../constants/Constants";
import { useAtom, useAtomValue } from "jotai";

export const UI = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const pages = useAtomValue(pagesAtom);

  return (
    <>
      <>
        <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
          <a
            className="pointer-events-auto mt-10 ml-10"
            href="https://lessons.wawasensei.dev/courses/react-three-fiber"
          >
            <img className="w-20" src="/images/wawasensei-white.png" />
          </a>
          <div className="w-full overflow-auto pointer-events-auto flex justify-center">
            <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
              {[...pages].map((_, index) => (
                <button
                  key={index}
                  className={`border-transparent hover:border-white transition-all duration-300  px-4 py-2  rounded-full  text-lg uppercase shrink-0 border ${
                    index === currentPage
                      ? "bg-white/90 text-black"
                      : "bg-black/30 text-white"
                  }`}
                  onClick={() => setCurrentPage(index)}
                >
                  {index === 0 ? "Cover" : `${index}`}
                </button>
              ))}
              <button
                className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                  currentPage === pages.length
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setCurrentPage(pages.length)}
              >
                Back Cover
              </button>
            </div>
          </div>
        </main>

        {/* <div className="fixed inset-0 flex items-center -rotate-2 select-none "> */}
        <div className="hidden">
          <div className="relative">
            <div className="bg-white/0  animate-horizontal-scroll flex items-center gap-8 w-max px-8">
              <h1 className="shrink-0 text-white text-10xl font-black ">
                Wawa Sensei
              </h1>
              <h2 className="shrink-0 text-white text-8xl italic font-light">
                React Three Fiber
              </h2>
              <h2 className="shrink-0 text-white text-12xl font-bold">
                Three.js
              </h2>
              <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
                Ultimate Guide
              </h2>
              <h2 className="shrink-0 text-white text-9xl font-medium">
                Tutorials
              </h2>
              <h2 className="shrink-0 text-white text-9xl font-extralight italic">
                Learn
              </h2>
              <h2 className="shrink-0 text-white text-13xl font-bold">
                Practice
              </h2>
              <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
                Creative
              </h2>
            </div>
            <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
              <h1 className="shrink-0 text-white text-10xl font-black ">
                Wawa Sensei
              </h1>
              <h2 className="shrink-0 text-white text-8xl italic font-light">
                React Three Fiber
              </h2>
              <h2 className="shrink-0 text-white text-12xl font-bold">
                Three.js
              </h2>
              <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
                Ultimate Guide
              </h2>
              <h2 className="shrink-0 text-white text-9xl font-medium">
                Tutorials
              </h2>
              <h2 className="shrink-0 text-white text-9xl font-extralight italic">
                Learn
              </h2>
              <h2 className="shrink-0 text-white text-13xl font-bold">
                Practice
              </h2>
              <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
                Creative
              </h2>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
