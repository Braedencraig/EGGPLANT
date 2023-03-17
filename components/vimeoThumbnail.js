import { useState } from "react";
import ReactPlayer from "react-player";
import close from "../public/closemodal.png";

function VimeoThumbnail({ url, clientName, projectTitle }) {
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const videoId = url.split("/").pop();

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleClick}
      >
        <img
          srcSet={`
        https://vumbnail.com/${videoId}.jpg 640w, 
        https://vumbnail.com/${videoId}_large.jpg 640w, 
        https://vumbnail.com/${videoId}_medium.jpg 200w, 
        https://vumbnail.com/${videoId}_small.jpg 100w
    `}
          sizes="(max-width: 640px) 100vw, 640px"
          src={`https://vumbnail.com/${videoId}.jpg`}
          alt="Vimeo Thumbnail"
          className="w-full h-full object-cover special"
        />

        <div
          className={`absolute inset-0 bg-black flex items-center justify-center text-white transition-opacity duration-500 ${
            isHovering ? "opacity-[90%]" : "opacity-0"
          }`}
        >
          <div className="flex flex-col text-center">
            <p
              style={{
                letterSpacing: "0.2em",
                fontFamily: `Roboto, san-serif`,
                padding: "0 20px",
              }}
              className="text-accent-1 text-xl font-bold mb-2"
            >
              {clientName.toUpperCase()}
            </p>
            <p className="text-md">{projectTitle}</p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="bg-black fixed z-10 inset-0 top-0 left-0 right-0 bottom-0">
          <div className="fixed inset-0 z-10 bg-black flex items-center justify-center">
            <div className="player-wrapper">
              <button
                className="cursor-pointer z-[10000] mb-6 relative"
                onClick={() => setShowModal(false)}
              >
                <img src={close.src} alt="Close" />
              </button>
              <ReactPlayer
                controls={true}
                url={url}
                playing
                className="react-player"
                width="100%"
                height="100%"
              />
              <div className="flex flex-col text-left mt-6 text-fun">
                <p className="text-accent-1 text-xl">
                  {clientName.toUpperCase()} / {projectTitle.toUpperCase()}
                </p>
                <p className="text-white text-lg">CATEGORY</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VimeoThumbnail;
