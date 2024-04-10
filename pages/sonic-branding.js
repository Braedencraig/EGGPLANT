import { useState, useEffect } from "react";
import GetInTouch from "../components/getInTouch";
import Container from "../components/container";
import Layout from "../components/layout";
import SonicThumbnail from "../components/sonicThumbnail";
import {
  getNavigation,
  getSonicBranding,
  getVideos,
  getMoreVideos,
} from "../lib/api";
import Head from "next/head";
import classNames from "classnames";
import FadeInSection from "../components/fadeIn";
import { createClient } from "contentful";

export default function Index({
  navigation,
  sonicBranding,
  footer,
  cities,
  socials,
  getInTouch,
  people,
  videos,
  videos2,
  categories,
  orderedVideos,
}) {
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const isMobile = () => {
    const ua = navigator.userAgent;
    const mobileKeywords =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobileDevice = mobileKeywords.test(ua);

    const screenWidth = window.screen.width;
    const isSmallScreen = screenWidth < 768; // Example threshold for small screens

    return isMobileDevice || isSmallScreen;
  };

  const Cursor = () => {
    if (typeof navigator !== "undefined" && isMobile()) return null;

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [bgHovered, setBgHovered] = useState(false);

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
      document.querySelectorAll(".getintouch").forEach((el) => {
        el.addEventListener("mouseover", () => setBgHovered(true));
        el.addEventListener("mouseout", () => setBgHovered(false));
      });
    };

    const cursorClasses = classNames("cursor", {
      "cursor--clicked": clicked,
      "cursor--hidden": hidden,
      "cursor--link-hovered": linkHovered,
      "cursor--bg-hovered": bgHovered,
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
          <title>{`Eggplant Music & Sound – Original Music.  Music Supervision.  Music Licensing.  Sound Design.  Voice Direction.`}</title>
        </Head>
        <div className="videos bg-black py-20">
          <Container>
            <div className="flex flex-wrap py-[10px]">
              {orderedVideos.map((video, index) => (
                <div
                  style={{ border: "10px solid black" }}
                  className="w-[100%] sm:w-[50%] lg:w-[calc(33%)] video-tab mb-4"
                  key={index}
                >
                  <SonicThumbnail
                    thumbnail={video.fields.thumbnailPhoto}
                    url={video.fields.videoUrl}
                    clientName={video.fields.clientName}
                    projectTitle={video.fields.projectTitle}
                    sonicTitle={video.fields.sonicBrandingTitle}
                    sonicSubtitle={video.fields.sonicBrandingSubtitle}
                    copy={video.fields.sonicBrandingText}
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
      {typeof navigator !== "undefined" && isMobile() ? null : <Cursor />}
    </>
  );
}

export async function getStaticProps() {
  const { nav, navItems } = (await getNavigation()) ?? [];
  const { sonicBranding, footer, cities, socials, getInTouch, people } =
    (await getSonicBranding()) ?? [];
  const { videos, categories } = (await getVideos()) ?? [];
  const { videos2, categories2 } = (await getMoreVideos()) ?? [];

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const data = await client.getEntries();

  const orderedVideos = data.items.filter(
    (item) => item.sys.contentType.sys.id === "sonicBranding"
  );

  return {
    props: {
      sonicBranding,
      footer,
      cities,
      socials,
      getInTouch,
      people,
      videos,
      videos2,
      categories,
      navigation: {
        nav,
        navItems: navItems.reverse(),
      },
      orderedVideos: orderedVideos[0].fields.videos,
    },
    revalidate: 10,
  };
}
