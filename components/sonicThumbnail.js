import { useState } from "react";
import ReactPlayer from "react-player";
import close from "../public/closemodal.png";

function SonicThumbnail({ url, clientName, projectTitle, copy }) {
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
        <div className="flex flex-col text-left mt-4">
          <p className="text-accent-1 text-2xl">{clientName}</p>
          {copy.map((item, index) => {
            return (
              <p
                style={{
                  display: "block",
                  //   width: "120px",
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
      {showModal && (
        <div className="fixed inset-0 z-10 z-[3000] bg-black flex items-center justify-center flex-col player-test">
          <div className="player-wrapper">
            <ReactPlayer
              controls={true}
              url={url}
              className="react-player"
              playing
              width="100%"
              height="100%"
            />
          </div>
          <div className="flex flex-col text-left mt-0 max-w-[960px]">
            <p
              style={{ fontFamily: `Futura, san-serif` }}
              className="text-accent-1 text-2xl md:text-4xl font-bold"
            >
              {clientName && clientName.toUpperCase()} -{" "}
              {projectTitle && projectTitle.toUpperCase()}
            </p>
            <div className="mt-6">
              {copy.map((item, index) => {
                return (
                  <p key={index} className="text-white text-md md:text-lg">
                    {item.content[0].value}
                  </p>
                );
              })}
            </div>
            <button
              style={{ borderRadius: "60px" }}
              className="sonic-button bg-accent-1 text-black max-w-[260px] flex items-center justify-between mt-6 md:mt-8 py-4 px-6 md:px-8 text-md md:text-lg font-bold"
              onClick={() => setShowModal(false)}
            >
              <span>
                <img src="/arrow.png" alt="Go back" />
              </span>
              Sonic Branding
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SonicThumbnail;
