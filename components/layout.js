import Navigation from "../components/navigation";
import Footer from "../components/footer";
import GetInTouch from "../components/getInTouch";
import Meta from "../components/meta";
import ReactPlayer from "react-player";
import close from "../public/closemodal.png";

export default function Layout({
  navigation,
  children,
  heroData,
  alternate = false,
  footer,
  cities,
  socials,
  tiny = false,
  home = false,
  video = false,
  showModal,
  activeVideo,
  setShowModal,
  sonicBranding = false,
  getInTouch,
  people,
}) {
  if (showModal) {
    return (
      <>
        <Meta />
        <div className="bg-black">
          {sonicBranding && <Navigation data={navigation} />}
          <div
            className={`bg-black flex justify-center pt-[80px] ${
              sonicBranding &&
              "h-[850px] md:h-[1200px] mb-[100px] sm:mb-[200px] lg:mb-[400px]"
            }`}
          >
            <div
              className={`player-wrapper ${
                sonicBranding && "mt-[40px] md:mt-[140px] fadein doit"
              }`}
            >
              {!sonicBranding && (
                <button
                  className=" z-[10000] mb-6 relative"
                  onClick={() => setShowModal(false)}
                >
                  <img src={close.src} alt="Close" />
                </button>
              )}
              <ReactPlayer
                controls={true}
                url={activeVideo.id}
                playing
                className="react-player"
                width="100%"
                height="100%"
              />
              <div className="flex flex-col text-left my-6 text-fun pb-[80px]">
                <p
                  style={{ fontFamily: `Futura, san-serif` }}
                  className={`${
                    sonicBranding
                      ? "text-accent-1 text-[25px] md:text-4xl"
                      : "text-accent-1 text-[18px]"
                  }`}
                >
                  {activeVideo.clientName &&
                    activeVideo.clientName.toUpperCase()}{" "}
                  -{" "}
                  {activeVideo.projectTitle &&
                    activeVideo.projectTitle.toUpperCase()}
                </p>
                {sonicBranding && (
                  <>
                    <div className="mt-6">
                      <p className="text-accent-1 text-[16px] md:text-lg">
                        {activeVideo.sonicTitle}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-white text-[16px] md:text-lg">
                        {activeVideo.sonicSubtitle}
                      </p>
                    </div>
                    <div className="">
                      <button
                        style={{ borderRadius: "60px" }}
                        className="transition duration-150 ease-out sonic-button hover:bg-white bg-accent-1 text-black md:max-w-[312px] flex items-center justify-between mt-[40px] md:mt-[60px] py-4 px-6 md:px-8 text-[16px] md:text-lg font-bold"
                        onClick={() => {
                          setShowModal(false);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <span className="max-w-[42px]">
                          <img src="/arrow.png" alt="Go back" />
                        </span>
                        <p className="ml-2">Sonic Branding</p>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {sonicBranding && (
          <>
            <GetInTouch data={getInTouch} people={people} />
            <Footer data={footer} cities={cities} socials={socials} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <div className={`${tiny ? "h-[520px]" : ""} relative`}>
          {!sonicBranding && (
            <video
              className={`h-full w-full object-cover ${
                tiny ? "min-h-[520px]" : "min-h-[609px] !h-[50vh]"
              }`}
              // src={heroData[0].backgroundVideo.url}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline
              playsineline
              style={{ filter: "opacity(0.5)", filter: "brightness(0.3)" }}
            >
              <source src={heroData[0].backgroundVideo.url} />
            </video>
          )}
          <Navigation data={navigation} />
          <div
            className={`absolute ${alternate ? "text-left" : "text-center"} ${
              heroData[0].title === "Video Games"
                ? `${video ? "top-[42%]" : "top-[28%] md:top-[50%]"}`
                : "top-1/2"
            }  ${
              alternate
                ? "md:text-left left-0 right-0 text-center md:container2 mx-0 md:mx-auto px-[16px] md:px-[45px] md:block flex flex-col items-center"
                : "left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            } w-full ${
              home
                ? "max-w-[400px] md:max-w-[634px]"
                : "max-w-[400px] md:max-w-[480px]"
            }`}
          >
            <h1
              className={`  ${
                home
                  ? "max-w-[400px] md:max-w-[634px] leading-[1.25]"
                  : "max-w-[400px] md:max-w-[480px]"
              } ${
                alternate ? "text-accent-1 " : "text-white"
              } text-4xl md:text-6xl font-bold mb-10`}
            >
              {heroData[0].title}
            </h1>
            <div
              className={`text-md md:text-md text-white   ${
                home
                  ? "max-w-[400px] md:max-w-[634px]"
                  : "max-w-[400px] md:max-w-[480px]"
              } ${
                heroData[0].title === "Video Games" ? "md:max-w-[600px]" : ""
              }`}
            >
              {heroData[0].copy.json ? (
                heroData[0].copy.json.content[0].content.map((item, index) => {
                  if (item.nodeType === "text") {
                    return item.value;
                  }

                  if (item.nodeType === "hyperlink") {
                    return (
                      <a
                        className="text-md md:text-lg text-accent-1 underline cursor-none"
                        href={item.data.uri}
                        key={index}
                      >
                        {item.content[0].value}
                      </a>
                    );
                  }
                })
              ) : (
                <p className="text-md md:text-lg text-white">
                  {heroData[0].copy}
                </p>
              )}
            </div>
          </div>
        </div>
        <main>{children}</main>
      </div>
      <Footer data={footer} cities={cities} socials={socials} />
    </>
  );
}
