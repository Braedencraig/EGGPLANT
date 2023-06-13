import { useState } from "react";
import ReactPlayer from "react-player";
import FadeInSection from "./fadeIn";
import close from "../public/closemodal.png";

function SonicThumbnail({
  url,
  clientName,
  projectTitle,
  copy,
  setShowModal,
  setActiveVideo,
  sonicTitle,
  sonicSubtitle,
  thumbnail,
}) {
  const [isHovering, setIsHovering] = useState(false);

  const videoId = url.split("/").pop();

  const handleClick = (id) => {
    setShowModal(true);
    window.scrollTo(0, 0);
    setActiveVideo({
      id,
      clientName,
      projectTitle,
      copy,
      sonicTitle,
      sonicSubtitle,
    });
  };

  return (
    <FadeInSection>
      <div
        className="relative overflow-hidden videoMouse"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => handleClick(url)}
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
        <div className="flex flex-col text-left mt-4">
          <p className="text-accent-1 text-2xl">{clientName}</p>
          {copy.content.map((item, index) => {
            return (
              <p
                style={{
                  display: "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                key={index}
                className="text-white text-lg"
              >
                {item.content[0].value}
              </p>
            );
          })}
        </div>
      </div>
    </FadeInSection>
  );
}

export default SonicThumbnail;
