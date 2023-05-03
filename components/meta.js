import Head from "next/head";
import image from "../public/hero.png";

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Eggplant Music & Sound – Original Music.  Music Supervision.  Music Licensing.  Sound Design.  Voice Direction.`}
      />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content="Eggplant, Eggplant Studio, Eggplant Music, Eggplant Sound, Eggplant Music & Sound, Eggplant Music and Sound, Eggplant Original Music, Eggplant Music Supervision, Eggplant Music Licensing, Eggplant Sound Design, Eggplant Voice Direction, The Eggplant, Eggplant Music + Sound"
      />
      <meta
        name="description"
        content="Eggplant Music & Sound – Original Music.  Music Supervision.  Music Licensing.  Sound Design.  Voice Direction."
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content="Eggplant Music + Sound" />
      <meta
        property="og:description"
        content="Eggplant Music & Sound – Original Music.  Music Supervision.  Music Licensing.  Sound Design.  Voice Direction."
      />
      <meta property="og:image" content={image} />
      <link rel="canonical" href="https://theeggplant.com/" />
    </Head>
  );
}
