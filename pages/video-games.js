import GetInTouch from "../components/getInTouch";
import Layout from "../components/layout";
import VideoTab from "../components/videoTab";
import { getNavigation, getVideoGames, getVideos } from "../lib/api";
import Head from "next/head";

export default function Index({
  navigation,
  videoGames,
  footer,
  cities,
  socials,
  getInTouch,
  people,
  videos,
  categories,
}) {
  return (
    <>
      <Layout
        alternate={true}
        heroData={videoGames}
        navigation={navigation}
        footer={footer}
        cities={cities}
        socials={socials}
        tiny={true}
        video={true}
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
          allowedCategories={["Video Games"]}
          videos={videos}
          categories={categories}
          options={[
            { value: "All", label: "ALL" },
            { value: "qittXjYsnTeWZqneK9ayE", label: "VIDEO GAMES" },
          ]}
        />
        <GetInTouch data={getInTouch} people={people} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { nav, navItems } = (await getNavigation()) ?? [];
  const { videoGames, footer, cities, socials, getInTouch, people } =
    (await getVideoGames()) ?? [];
  const { videos, categories } = (await getVideos()) ?? [];

  return {
    props: {
      videoGames,
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
