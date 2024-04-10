import { useState, useEffect } from "react";
import GetInTouch from "../components/getInTouch";
import Layout from "../components/layout";
// import VideoTab from "../components/videoTab";
import VideoTabOrdered from "../components/videoTabOrdered";
import classNames from "classnames";
import { createClient } from "contentful";

import {
  getNavigation,
  getAdvertising,
  getVideos,
  getMoreVideos,
} from "../lib/api";
import Head from "next/head";

export default function Index({
  navigation,
  advertising,
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
        heroData={advertising}
        navigation={navigation}
        footer={footer}
        cities={cities}
        socials={socials}
        tiny={true}
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
        <VideoTabOrdered
          setShowModal={setShowModal}
          setActiveVideo={setActiveVideo}
          showModal={showModal}
          allowedCategories={[
            "Music Supervision",
            "Voice Direction",
            "Original Music",
            "Sound Design",
          ]}
          videos={orderedVideos}
          categories={categories}
          options={[
            { value: "All", label: "ALL" },
            { value: "5ES8HaNhDnvVCmnTB6h2gm", label: "MUSIC SUPERVISION" },
            { value: "7dazPdlrSbwu1xCsyZDjiS", label: "VOICE DIRECTION" },
            { value: "152HcaQ54UlYeCqSbw9wHm", label: "ORIGINAL MUSIC" },
            { value: "g0IDM5gzybmQBH0P6J9xb", label: "SOUND DESIGN" },
          ]}
        />
        <GetInTouch data={getInTouch} people={people} />
      </Layout>
      {typeof navigator !== "undefined" && isMobile() ? null : <Cursor />}
    </>
  );
}

export async function getStaticProps() {
  const { nav, navItems } = (await getNavigation()) ?? [];
  const { advertising, footer, cities, socials, getInTouch, people } =
    (await getAdvertising()) ?? [];
  const { videos, categories } = (await getVideos()) ?? [];
  const { videos2, categories2 } = (await getMoreVideos()) ?? [];

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const data = await client.getEntries();

  const orderedVideos = data.items.filter(
    (item) => item.sys.contentType.sys.id === "advertising"
  );

  return {
    props: {
      advertising,
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
