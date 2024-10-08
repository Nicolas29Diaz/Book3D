import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function LoadingScreen({ loadedPictures }) {
  const { progress } = useProgress();
  const [loading, setLoading] = useState(true);
  const [hideLoadingScreen, setHideLoadingScreen] = useState(true);
  const [fullProgress, setFullProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setFullProgress((prev) => {
          if (prev < 80) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return 80;
          }
        });
      }, 50); // Adjust the interval time as needed
    } else {
      setFullProgress(100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (progress >= 100 && loadedPictures) {
      setLoading(false);
      setTimeout(() => {
        setHideLoadingScreen(false);
        document.getElementById("loading").style.display = "none";
      }, 1000);
    } else {
      setLoading(true);
    }
  }, [progress, loadedPictures]);

  return (
    <>
      {hideLoadingScreen && (
        <div
          className="absolute z-20 w-full h-full overflow-hidden"
          style={{ background: "radial-gradient(#c04d00 10%, #232323 100%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 overflow-hidden rounded-full">
            <div
              className={`absolute bottom-0 left-0 w-full bg-white`}
              style={{ height: fullProgress, transition: "height 0.5s" }}
            ></div>
          </div>
          <svg
            className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-auto"
            width="158"
            height="158"
            viewBox="0 0 158 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="78.9505"
              cy="78.9505"
              r="73.9505"
              stroke="black"
              strokeWidth="10"
            />
            <path
              d="M79.4234 31.202L83.0321 42.3087H94.7104L85.2625 49.173L88.8713 60.2797L79.4234 53.4153L69.9754 60.2797L73.5842 49.173L64.1363 42.3087H75.8146L79.4234 31.202Z"
              fill="black"
            />
            <path
              d="M79.4234 95.497L83.0321 106.604H94.7104L85.2625 113.468L88.8713 124.575L79.4234 117.71L69.9754 124.575L73.5842 113.468L64.1363 106.604H75.8146L79.4234 95.497Z"
              fill="black"
            />
            <path
              d="M47.2757 63.3495L50.8844 74.4562H62.5627L53.1148 81.3205L56.7236 92.4272L47.2757 85.5629L37.8277 92.4272L41.4365 81.3205L31.9886 74.4562H43.6669L47.2757 63.3495Z"
              fill="black"
            />
            <path
              d="M111.571 63.3495L115.18 74.4562H126.858L117.41 81.3205L121.019 92.4272L111.571 85.5629L102.123 92.4272L105.732 81.3205L96.2838 74.4562H107.962L111.571 63.3495Z"
              fill="black"
            />
          </svg>
        </div>
      )}
    </>
  );
}

LoadingScreen.propTypes = {
  loadedPictures: PropTypes.bool.isRequired,
};

export default LoadingScreen;
