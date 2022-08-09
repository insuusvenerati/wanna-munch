import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { HeaderMiddle } from "../components/Header";

const links = [
  {
    link: "/",
    label: "Home",
  },
];

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Wanna Munch</title>
        <meta name="description" content="MBMBAM Podcast audio clips" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <HeaderMiddle links={links} />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
