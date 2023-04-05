import GetInTouch from "../components/getInTouch";
import Layout from "../components/layout";
import VideoTab from "../components/videoTab";
import { getNavigation, getAdvertising, getVideos } from "../lib/api";
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
  categories,
}) {
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
            "Original Music",
            "Music Supervision",
            "Sound Design",
            "Voice Direction",
          ]}
          videos={videos}
          categories={categories}
          options={[
            { value: "All", label: "ALL" },
            { value: "152HcaQ54UlYeCqSbw9wHm", label: "ORIGINAL MUSIC" },
            { value: "5ES8HaNhDnvVCmnTB6h2gm", label: "MUSIC SUPERVISION" },
            { value: "g0IDM5gzybmQBH0P6J9xb", label: "SOUND DESIGN" },
            { value: "7dazPdlrSbwu1xCsyZDjiS", label: "VOICE DIRECTION" },
          ]}
        />
        <GetInTouch data={getInTouch} people={people} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { nav, navItems } = (await getNavigation()) ?? [];
  const { advertising, footer, cities, socials, getInTouch, people } =
    (await getAdvertising()) ?? [];
  const { videos, categories } = (await getVideos()) ?? [];

  return {
    props: {
      advertising,
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
