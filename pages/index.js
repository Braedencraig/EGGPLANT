import Container from "../components/container";
import Layout from "../components/layout";
import { getNavigation, getHomepage } from "../lib/api";
import About from "../components/about";
import Awards from "../components/awards";
import GetInTouch from "../components/getInTouch";
import Head from "next/head";
import VimeoThumbnail from "../components/vimeoThumbnail";

export default function Index({
  navigation,
  homepage,
  videos,
  about,
  awards,
  getInTouch,
  people,
  footer,
  cities,
  socials,
}) {
  return (
    <>
      <Layout
        heroData={homepage}
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
        </Head>
        <Container fullBleed={true}>
          <div className="md:py-[60px] w-full flex flex-wrap">
            {videos
              .filter((video) => video.videoUrl)
              .map((video, index) => {
                return (
                  <div
                    className="w-[100%] sm:w-[50%] lg:w-[33%] cursor-pointer"
                    key={index}
                  >
                    <VimeoThumbnail
                      url={video.videoUrl}
                      clientName={video.clientName}
                      projectTitle={video.projectTitle}
                    />
                  </div>
                );
              })}
          </div>
        </Container>
        <About data={about} />
        <Awards data={awards} />
        <GetInTouch data={getInTouch} people={people} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { nav, navItems } = (await getNavigation()) ?? [];
  const {
    homepage,
    videos,
    about,
    awards,
    getInTouch,
    people,
    footer,
    cities,
    socials,
  } = (await getHomepage()) ?? [];
  return {
    props: {
      homepage,
      videos,
      about,
      awards,
      getInTouch,
      people,
      footer,
      cities,
      socials,
      navigation: {
        nav,
        navItems,
      },
    },
  };
}
