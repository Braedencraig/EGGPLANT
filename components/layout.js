import Navigation from "../components/navigation";
import Footer from "../components/footer";
import Meta from "../components/meta";

export default function Layout({
  navigation,
  children,
  heroData,
  alternate = false,
  footer,
  cities,
  socials,
}) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <div className="relative">
          <video
            className="h-full w-full object-cover min-h-[609px]"
            src={heroData[0].backgroundVideo.url}
            autoPlay
            loop
            muted
          />
          <Navigation data={navigation} />
          <div
            className={`absolute ${alternate ? "text-left" : "text-center"} ${
              heroData[0].title === "Video Games" ? "top-[33%]" : "top-1/2"
            }  ${
              alternate
                ? "md:text-left left-0 right-0 text-center container mx-auto px-[16px] md:px-[45px] md:block flex flex-col items-center"
                : "left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            } w-full max-w-[300px] md:max-w-[410px]`}
          >
            <h1
              className={`${
                alternate
                  ? "text-accent-1 max-w-[300px] md:max-w-[410px]"
                  : "text-white"
              } text-4xl md:text-6xl font-bold mb-6`}
            >
              {heroData[0].title}
            </h1>
            <div className="text-md md:text-lg text-white max-w-[300px] md:max-w-[410px]">
              {heroData[0].copy.json ? (
                heroData[0].copy.json.content[0].content.map((item, index) => {
                  if (item.nodeType === "text") {
                    return item.value;
                  }

                  if (item.nodeType === "hyperlink") {
                    return (
                      <a
                        className="text-md md:text-lg text-accent-1 underline"
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
