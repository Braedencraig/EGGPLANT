import Container from "../components/container";
import { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";
import Layout from "../components/layout";
import {
  getNavigation,
  getHomepage,
  getVideos,
  getMoreVideos,
} from "../lib/api";
import About from "../components/about";
// import Awards from "../components/awards";
import GetInTouch from "../components/getInTouch";
import Head from "next/head";
import VimeoThumbnail from "../components/vimeoThumbnail";
import FadeInSection from "../components/fadeIn";

export default function Index({
  navigation,
  homepage,
  videos,
  videos2,
  about,
  awards,
  getInTouch,
  people,
  footer,
  cities,
  socials,
}) {
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

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

      document.querySelectorAll(".getintouch").forEach((el) => {
        el.addEventListener("mouseover", () => setBgHovered(true));
        el.addEventListener("mouseout", () => setBgHovered(false));
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
        heroData={homepage}
        navigation={navigation}
        footer={footer}
        cities={cities}
        socials={socials}
        home={true}
        showModal={showModal}
        activeVideo={activeVideo}
        setShowModal={setShowModal}
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
        <Container fullBleed={true} heroFull={true}>
          <div className="md:py-[80px] w-full flex flex-wrap">
            {videos
              .concat(videos2)
              .filter((video) => video.categoryCollection.items.length === 0)
              .filter((video) => video.videoUrl)
              .map((video, index) => {
                return (
                  // <FadeInSection
                  // classNames="w-[100%] sm:w-[50%] lg:w-[33%]"
                  // key={index}
                  // >
                  <div className="w-[100%] sm:w-[50%] lg:w-[33%]" key={index}>
                    <VimeoThumbnail
                      thumbnail={video.thumbnailPhoto}
                      url={video.videoUrl}
                      clientName={video.clientName}
                      projectTitle={video.projectTitle}
                      setShowModal={setShowModal}
                      setActiveVideo={setActiveVideo}
                      showModal={showModal}
                    />
                  </div>
                  // </FadeInSection>
                );
              })}
          </div>
        </Container>
        <About data={about} />
        {/* <Awards data={awards} /> */}
        <GetInTouch data={getInTouch} people={people} />
      </Layout>
      {typeof navigator !== "undefined" && isMobile() ? null : <Cursor />}
    </>
  );
}

export async function getStaticProps() {
  const { nav, navItems } = (await getNavigation()) ?? [];
  const {
    homepage,
    // videos,
    about,
    awards,
    getInTouch,
    people,
    footer,
    cities,
    socials,
  } = (await getHomepage()) ?? [];
  const { videos, categories } = (await getVideos()) ?? [];
  const { videos2, categories2 } = (await getMoreVideos()) ?? [];

  return {
    props: {
      homepage,
      videos,
      videos2,
      about,
      awards,
      getInTouch,
      people,
      footer,
      cities,
      socials,
      navigation: {
        nav,
        navItems: navItems.reverse(),
      },
    },
    revalidate: 10,
  };
}
