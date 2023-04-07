import GetInTouch from "../components/getInTouch";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import classNames from "classnames";
import VideoTab from "../components/videoTab";
import { getNavigation, getTvFilm, getVideos } from "../lib/api";
import Head from "next/head";

export default function Index({
  navigation,
  tvFilm,
  footer,
  cities,
  socials,
  getInTouch,
  people,
  videos,
  categories,
}) {
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
        heroData={tvFilm}
        navigation={navigation}
        footer={footer}
        cities={cities}
        socials={socials}
        tiny={true}
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
        <VideoTab
          reverse={true}
          allowedCategories={[
            // "TV",
            // "Score",
            // "Film",
            // "Theme",
            "Original Song",
            "Music Supervision",
          ]}
          videos={videos}
          categories={categories}
          options={[
            { value: "All", label: "ALL" },
            // { value: "3FdihYJgo7P7u7fEu9MMve", label: "TV" },
            // { value: "W3sFwJgAwP3bEYV4ykIo8", label: "SCORE" },
            // { value: "1KtDtZFWbsxirzmJzBdcE7", label: "FILM" },
            // { value: "3QJNZPGszWfII2iBeSE7Ny", label: "THEME" },
            { value: "29RbpcnlGepxn0l3Bg2qVn", label: "ORIGINAL SONG" },
            { value: "16elG76rIZjcF1glbJfiWH", label: "MUSIC SUPERVISION" },
          ]}
        />
        <GetInTouch data={getInTouch} people={people} />
      </Layout>
      <Cursor />
    </>
  );
}

export async function getStaticProps() {
  const { nav, navItems } = (await getNavigation()) ?? [];
  const { tvFilm, footer, cities, socials, getInTouch, people } =
    (await getTvFilm()) ?? [];
  const { videos, categories } = (await getVideos()) ?? [];

  return {
    props: {
      tvFilm,
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
