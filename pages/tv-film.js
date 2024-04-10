import GetInTouch from "../components/getInTouch";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import classNames from "classnames";
import VideoTabOrdered from "../components/videoTabOrdered";
import { getNavigation, getTvFilm, getVideos, getMoreVideos } from "../lib/api";
import Head from "next/head";
import { createClient } from "contentful";

export default function Index({
  navigation,
  tvFilm,
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
        heroData={tvFilm}
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
          reverse={false}
          setShowModal={setShowModal}
          setActiveVideo={setActiveVideo}
          showModal={showModal}
          tvFilm={true}
          allowedCategories={[
            // "TV",
            // "Score",
            // "Film",
            // "Theme",
            "Original Score and Songs",
            "Music Supervision",
          ]}
          videos={orderedVideos}
          categories={categories}
          options={[
            { value: "All", label: "ALL" },
            // { value: "3FdihYJgo7P7u7fEu9MMve", label: "TV" },
            // { value: "W3sFwJgAwP3bEYV4ykIo8", label: "SCORE" },
            // { value: "1KtDtZFWbsxirzmJzBdcE7", label: "FILM" },
            // { value: "3QJNZPGszWfII2iBeSE7Ny", label: "THEME" },
            {
              value: "29RbpcnlGepxn0l3Bg2qVn",
              label: "Original Score and Songs",
            },
            { value: "16elG76rIZjcF1glbJfiWH", label: "MUSIC SUPERVISION" },
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
  const { tvFilm, footer, cities, socials, getInTouch, people } =
    (await getTvFilm()) ?? [];
  const { videos, categories } = (await getVideos()) ?? [];
  const { videos2, categories2 } = (await getMoreVideos()) ?? [];

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const data = await client.getEntries();

  const orderedVideos = data.items.filter(
    (item) => item.sys.contentType.sys.id === "tvFilm"
  );

  return {
    props: {
      tvFilm,
      footer,
      cities,
      socials,
      getInTouch,
      people,
      videos,
      videos2,
      categories,
      categories2,
      navigation: {
        nav,
        navItems: navItems.reverse(),
      },
      orderedVideos: orderedVideos[0].fields.videos,
    },
    revalidate: 10,
  };
}
