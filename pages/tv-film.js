import GetInTouch from "../components/getInTouch";
import Layout from "../components/layout";
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
  console.log(categories);
  return (
    <>
      <Layout
        alternate={true}
        heroData={tvFilm}
        navigation={navigation}
        footer={footer}
        cities={cities}
        socials={socials}
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
          allowedCategories={[
            "TV",
            "Score",
            "Film",
            "Theme",
            "Original Song",
            "Music Supervision",
          ]}
          videos={videos}
          categories={categories}
          options={[
            { value: "All", label: "ALL" },
            { value: "3FdihYJgo7P7u7fEu9MMve", label: "TV" },
            { value: "W3sFwJgAwP3bEYV4ykIo8", label: "SCORE" },
            { value: "1KtDtZFWbsxirzmJzBdcE7", label: "FILM" },
            { value: "3QJNZPGszWfII2iBeSE7Ny", label: "THEME" },
            { value: "29RbpcnlGepxn0l3Bg2qVn", label: "ORIGINAL SONG" },
            { value: "16elG76rIZjcF1glbJfiWH", label: "MUSIC SUPERVISION" },
          ]}
        />
        <GetInTouch data={getInTouch} people={people} />
      </Layout>
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
        navItems,
      },
    },
  };
}
