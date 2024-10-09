import { useEffect, useRef, useState } from "react";
import {
  changeViewAtom,
  currentPageAtom,
  pagesAtom,
} from "../constants/Constants";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export const UI = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const pages = useAtomValue(pagesAtom);
  const setView = useSetAtom(changeViewAtom);
  const [audioSound, setAudioSound] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const previousPage = useRef(currentPage);

  useEffect(() => {
    if (!audioSound) return;

    const playAudioMultipleTimes = (times) => {
      for (let i = 0; i < times; i++) {
        setTimeout(() => {
          // Crear una nueva instancia de Audio en cada reproducción
          const audio = new Audio("/audios/pageFlip2.mp3");
          audio.volume = 0.7;
          audio.play();
        }, i * 100); // Delay entre cada reproducción
      }
    };

    const pageDifference = Math.abs(currentPage - previousPage.current);
    playAudioMultipleTimes(pageDifference);
    previousPage.current = currentPage;
  }, [currentPage, audioSound]);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 640);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="absolute top-6 right-4 flex flex-row gap-2">
        <button
          className="rounded-md w-10 h-10 z-10 hover:scale-110"
          onClick={() => setView("Left")}
        >
          <img
            className="w-full h-full"
            src="/images/LeftView.webp"
            alt="LeftView"
          />
        </button>
        <button
          className="rounded-md w-10 h-10 z-10 hover:scale-110"
          onClick={() => setView("Center")}
        >
          <img
            className="w-full h-full"
            src="/images/CenterView.webp"
            alt="LeftView"
          />
        </button>
        <button
          className="rounded-md w-10 h-10 z-10 hover:scale-110"
          onClick={() => setView("Right")}
        >
          <img
            className="w-full h-full"
            src="/images/RightView.webp"
            alt="LeftView"
          />
        </button>
        <button
          className="rounded-md w-10 h-10 z-10 hover:scale-110"
          onClick={() => setAudioSound(!audioSound)}
        >
          <svg
            className="w-full h-full p-1"
            viewBox="0 0 184 176"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.1528 120H13C10.7909 120 9 118.209 9 116V55C9 52.7909 10.7909 51 13 51H41.2808C42.3784 51 43.4278 50.549 44.1831 49.7526L82.0978 9.77736C84.5854 7.15457 89 8.91514 89 12.53V163.136C89 166.856 84.3671 168.561 81.955 165.73L44.1978 121.406C43.4378 120.514 42.3248 120 41.1528 120Z"
              fill="#FC7D2A"
              stroke="black"
              strokeWidth="16.67"
            />
            {!audioSound ? (
              <>
                <path
                  d="M119.5 116.5L175.5 60.5"
                  stroke="black"
                  strokeWidth="16.67"
                  strokeLinecap="round"
                />
                <path
                  d="M175.5 116.5L119.5 60.5"
                  stroke="black"
                  strokeWidth="16.67"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <path
                  d="M139.496 37C152.568 50.0812 159.912 67.8185 159.912 86.3119C159.912 104.805 152.568 122.543 139.496 135.623"
                  stroke="black"
                  strokeWidth="16.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M121 117.486C129.173 109.309 133.765 98.2208 133.765 86.6598C133.765 75.0988 129.173 64.0117 121 55.8354"
                  stroke="black"
                  strokeWidth="16.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}
          </svg>
        </button>
      </div>

      <>
        <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
          <a
            className={`pointer-events-auto mt-5 ml-5 ${
              isSmallScreen ? "w-10" : "w-40"
            }`}
            href=""
          >
            <img
              className="w-40"
              src={`/images/${isSmallScreen ? "LoadingLogo" : "LogoLarge"}.webp`}
            />
          </a>
          <div className="w-full overflow-auto pointer-events-auto flex justify-center">
            <div className="overflow-auto flex items-center gap-4 max-w-full pb-10 pl-10 p-r">
              {[...pages].map((_, index) => (
                <button
                  type="button"
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
