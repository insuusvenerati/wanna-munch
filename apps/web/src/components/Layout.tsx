import { Alert, Center, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { Meta } from "../types/metadata";
import { FooterSocial } from "./Footer";
import { HeaderMiddle } from "./Header";
import { Masthead } from "./Masthead";

type Props = {
  meta: Meta;
  children: JSX.Element | JSX.Element[];
};

export const Layout = ({ meta, children }: Props) => {
  const { data } = meta;
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <>
      <NextSeo
        description="MBMBAM Podcast audio clips"
        title={data.attributes.siteTitle}
      />
      <Alert
        icon={<IconAlertCircle size={16} />}
        closeButtonLabel="Close alert"
        withCloseButton
        title="Welcome!"
        onClose={() => setAlertVisible(false)}
        style={{ display: alertVisible ? "inherit" : "none" }}
      >
        This site is still under construction.
      </Alert>
      <Masthead image={data.attributes.logo.data?.attributes.url} />
      <HeaderMiddle
        social={data.attributes.social}
        links={data.attributes.links}
      />
      <Center>
        <Text
          mb={60}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          size={30}
          weight={700}
        >
          MBMBaM Out of Context Clips
        </Text>
      </Center>
      {children}
      <FooterSocial />
    </>
  );
};
