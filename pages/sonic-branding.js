import GetInTouch from "../components/getInTouch";
import Container from "../components/container";
import Layout from "../components/layout";
import SonicThumbnail from "../components/sonicThumbnail";
import { getNavigation, getSonicBranding, getVideos } from "../lib/api";
import Head from "next/head";

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
  const sonicBrandingVideos = videos
    .map((video) => (video.sonicBrandingText !== null ? video : null))
    .filter((el) => el !== null);
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
                  className="w-[100%] sm:w-[50%] lg:w-[calc(33%)] video-tab cursor-pointer mb-4"
                  key={index}
                >
                  <SonicThumbnail
                    url={video.videoUrl}
                    clientName={video.clientName}
                    projectTitle={video.projectTitle}
                    copy={video.sonicBrandingText.json.content}
                  />
                </div>
              ))}
            </div>
          </Container>
        </div>
        <GetInTouch data={getInTouch} people={people} />
      </Layout>
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
        navItems,
      },
    },
  };
}
