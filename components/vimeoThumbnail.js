import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import close from "../public/closemodal.png";

function VimeoThumbnail({
  url,
  clientName,
  projectTitle,
  setShowModal,
  setActiveVideo,
  thumbnail,
}) {
  const [isHovering, setIsHovering] = useState(false);

  const videoId = url.split("/").pop();

  const handleClick = (id) => {
    setShowModal(true);
    setActiveVideo({ id, clientName, projectTitle });
  };

  return (
    <>
      <div
        className="relative overflow-hidden videoMouse"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => handleClick(url)}
        style={{ height: "100%" }}
      >
        {thumbnail?.url !== undefined ? (
          <img
            srcSet={`
        ${thumbnail.url} 640w, 
        ${thumbnail.url} 640w, 
        ${thumbnail.url} 200w, 
        ${thumbnail.url} 100w
    `}
            sizes="(max-width: 640px) 100vw, 640px"
            src={`${thumbnail.url}`}
            alt="Vimeo Thumbnail"
            className="w-full h-full object-cover"
          />
        ) : (
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
            className="w-full h-full object-cover"
          />
        )}
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
    </>
  );
}

export default VimeoThumbnail;
