import { useState, useEffect } from "react";
import GetInTouch from "../components/getInTouch";
import Container from "../components/container";
import Layout from "../components/layout";
import SonicThumbnail from "../components/sonicThumbnail";
import { getNavigation, getSonicBranding, getVideos } from "../lib/api";
import Head from "next/head";
import classNames from "classnames";
import FadeInSection from "../components/fadeIn";

export default function Index({
  navigation,
  sonicBranding,
  footer,
  cities,
  socials,
  getInTouch,
  people,
  videos,
  categories,
}) {
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const sonicBrandingVideos = videos
    .map((video) => (video.sonicBrandingText !== null ? video : null))
    .filter((el) => el !== null);

  const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
  };

  const Cursor = () => {
    if (typeof navigator !== "undefined" && isMobile()) return null;

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
      addEventListeners();
      handleLinkHoverEvents();
      return () => removeEventListeners();
    }, []);

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a").forEach((el) => {
        el.addEventListener("mouseover", () => setLinkHovered(true));
        el.addEventListener("mouseout", () => setLinkHovered(false));
      });

      document.querySelectorAll(".videoMouse").forEach((el) => {
        el.addEventListener("mouseover", () => setLinkHovered(true));
        el.addEventListener("mouseout", () => setLinkHovered(false));
      });

      document.querySelectorAll("button").forEach((el) => {
        el.addEventListener("mouseover", () => setLinkHovered(true));
        el.addEventListener("mouseout", () => setLinkHovered(false));
      });
    };

    const cursorClasses = classNames("cursor", {
      "cursor--clicked": clicked,
      "cursor--hidden": hidden,
      "cursor--link-hovered": linkHovered,
    });

    return (
      <div
        className={cursorClasses}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    );
  };

  return (
    <>
      <Layout
        alternate={true}
        heroData={sonicBranding}
        navigation={navigation}
        footer={footer}
        cities={cities}
        socials={socials}
        tiny={true}
        showModal={showModal}
        activeVideo={activeVideo}
        setShowModal={setShowModal}
        sonicBranding={true}
        getInTouch={getInTouch}
        people={people}
      >
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
          <title>{`Eggplant`}</title>
          {/* SEO TO DO!!! */}
        </Head>
        <div className="videos bg-black py-20">
          <Container>
            <div className="flex flex-wrap py-[10px]">
              {sonicBrandingVideos.map((video, index) => (
                <div
                  style={{ border: "10px solid black" }}
                  className="w-[100%] sm:w-[50%] lg:w-[calc(33%)] video-tab mb-4"
                  key={index}
                >
                  <SonicThumbnail
                    url={video.videoUrl}
                    clientName={video.clientName}
                    projectTitle={video.projectTitle}
                    sonicTitle={video.sonicBrandingTitle}
                    sonicSubtitle={video.sonicBrandingSubtitle}
                    copy={video.sonicBrandingText.json.content}
                    data={getInTouch}
                    people={people}
                    setShowModal={setShowModal}
                    setActiveVideo={setActiveVideo}
                  />
                </div>
              ))}
            </div>
          </Container>
        </div>
        <GetInTouch data={getInTouch} people={people} />
      </Layout>
      <Cursor />
    </>
  );
}

export async function getStaticProps() {
  const { nav, navItems } = (await getNavigation()) ?? [];
  const { sonicBranding, footer, cities, socials, getInTouch, people } =
    (await getSonicBranding()) ?? [];
  const { videos, categories } = (await getVideos()) ?? [];

  return {
    props: {
      sonicBranding,
      footer,
      cities,
      socials,
      getInTouch,
      people,
      videos,
      categories,
      navigation: {
        nav,
        navItems: navItems.reverse(),
      },
    },
  };
}
