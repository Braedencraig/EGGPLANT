async function fetchGraphQL(query) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

export async function getNavigation() {
  const entries = await fetchGraphQL(
    `query {
      navigationCollection {
        items {
          title
          logo{
            url
          }
        }
      }
      navigationItemCollection {
        items {
          linkUrl
          linkText
        }
      }
    }`
  );
  return {
    nav: entries.data.navigationCollection.items,
    navItems: entries.data.navigationItemCollection.items,
  };
}

export async function getHomepage() {
  const entries = await fetchGraphQL(
    `query {
      homepageCollection {
       items {
         title
         copy
         backgroundVideo {
          url
         }
        }
      }
      videoCollection {
        items {
          clientName
          projectTitle,
          videoUrl
        }
      }
      aboutCollection {
        items {
          title
          copy {
            json
          }
        }
      }
      awardCollection {
        items {
          title
          year
          linkUrl
          linkText
          copy {
            json
          }
        }
      }
      getInTouchCollection {
        items {
          title
          image{
            url
          }
        }
      }
      personCollection {
        items {
          name
          title
          email
        }
      }
      footerCollection {
        items {
          logo {
            url
          }
        }
      }
      cityCollection {
        items {
          city
          address {
            json
          }
        }
      }
      socialCollection {
        items {
          socialUrl
        }
      }
    }`
  );
  return {
    homepage: entries.data.homepageCollection.items,
    videos: entries.data.videoCollection.items,
    about: entries.data.aboutCollection.items,
    awards: entries.data.awardCollection.items,
    getInTouch: entries.data.getInTouchCollection.items,
    people: entries.data.personCollection.items,
    footer: entries.data.footerCollection.items,
    cities: entries.data.cityCollection.items,
    socials: entries.data.socialCollection.items,
  };
}

export async function getAdvertising() {
  const entries = await fetchGraphQL(
    `query {
      advertisingCollection {
        items{
          title
          backgroundVideo {
            url
          }
          copy {
            json
          }
        }
      }
      footerCollection {
        items {
          logo {
            url
          }
        }
      }
      cityCollection {
        items {
          city
          address {
            json
          }
        }
      }
      socialCollection {
        items {
          socialUrl
        }
      }
      getInTouchCollection {
        items {
          title
          image{
            url
          }
        }
      }
      personCollection {
        items {
          name
          title
          email
        }
      }
    }`
  );
  return {
    advertising: entries.data.advertisingCollection.items,
    footer: entries.data.footerCollection.items,
    cities: entries.data.cityCollection.items,
    socials: entries.data.socialCollection.items,
    getInTouch: entries.data.getInTouchCollection.items,
    people: entries.data.personCollection.items,
  };
}

export async function getTvFilm() {
  const entries = await fetchGraphQL(
    `query {
      tvFilmCollection {
        items{
          title
          backgroundVideo {
            url
          }
          copy {
            json
          }
        }
      }
      footerCollection {
        items {
          logo {
            url
          }
        }
      }
      cityCollection {
        items {
          city
          address {
            json
          }
        }
      }
      socialCollection {
        items {
          socialUrl
        }
      }
      getInTouchCollection {
        items {
          title
          image{
            url
          }
        }
      }
      personCollection {
        items {
          name
          title
          email
        }
      }
    }`
  );
  return {
    tvFilm: entries.data.tvFilmCollection.items,
    footer: entries.data.footerCollection.items,
    cities: entries.data.cityCollection.items,
    socials: entries.data.socialCollection.items,
    getInTouch: entries.data.getInTouchCollection.items,
    people: entries.data.personCollection.items,
  };
}

export async function getVideoGames() {
  const entries = await fetchGraphQL(
    `query {
      videoGamesCollection {
        items{
          title
          backgroundVideo {
            url
          }
          copy {
            json
          }
        }
      }
      footerCollection {
        items {
          logo {
            url
          }
        }
      }
      cityCollection {
        items {
          city
          address {
            json
          }
        }
      }
      socialCollection {
        items {
          socialUrl
        }
      }
      getInTouchCollection {
        items {
          title
          image{
            url
          }
        }
      }
      personCollection {
        items {
          name
          title
          email
        }
      }
    }`
  );
  return {
    videoGames: entries.data.videoGamesCollection.items,
    footer: entries.data.footerCollection.items,
    cities: entries.data.cityCollection.items,
    socials: entries.data.socialCollection.items,
    getInTouch: entries.data.getInTouchCollection.items,
    people: entries.data.personCollection.items,
  };
}

export async function getSonicBranding() {
  const entries = await fetchGraphQL(
    `query {
      sonicBrandingCollection {
        items{
          title
          backgroundVideo {
            url
          }
          copy {
            json
          }
        }
      }
      footerCollection {
        items {
          logo {
            url
          }
        }
      }
      cityCollection {
        items {
          city
          address {
            json
          }
        }
      }
      socialCollection {
        items {
          socialUrl
        }
      }
      getInTouchCollection {
        items {
          title
          image{
            url
          }
        }
      }
      personCollection {
        items {
          name
          title
          email
        }
      }
    }`
  );
  return {
    sonicBranding: entries.data.sonicBrandingCollection.items,
    footer: entries.data.footerCollection.items,
    cities: entries.data.cityCollection.items,
    socials: entries.data.socialCollection.items,
    getInTouch: entries.data.getInTouchCollection.items,
    people: entries.data.personCollection.items,
  };
}

export async function getVideos() {
  const entries = await fetchGraphQL(
    `query {
      videoCollection(limit: ${100} skip: ${0}) {
        items {
          clientName
          projectTitle
          videoUrl
          sonicBrandingTitle
          sonicBrandingSubtitle
          sonicBrandingText {
            json
          }
          categoryCollection {
            items{
              sys {
                id
              }
            }
          }
        }
      }
      categoryCollection {
        items {
          sys {
            id
          }
          categoryText
        }
      }
    }`
  );
  return {
    videos: entries.data.videoCollection.items,
    categories: entries.data.categoryCollection.items,
  };
}

export async function getMoreVideos() {
  const entries = await fetchGraphQL(
    `query {
      videoCollection(limit: ${100} skip: ${100}) {
        items {
          clientName
          projectTitle
          videoUrl
          sonicBrandingTitle
          sonicBrandingSubtitle
          sonicBrandingText {
            json
          }
          categoryCollection {
            items{
              sys {
                id
              }
            }
          }
        }
      }
      categoryCollection {
        items {
          sys {
            id
          }
          categoryText
        }
      }
    }`
  );
  return {
    videos2: entries.data.videoCollection.items,
    categories2: entries.data.categoryCollection.items,
  };
}
