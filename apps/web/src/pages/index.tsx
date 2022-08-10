import { Container, SimpleGrid, Title } from "@mantine/core";
import { GetStaticProps } from "next";
import { ArticleCard } from "../components/ArticleCard";
import { Layout } from "../components/Layout";
import { Meta } from "../types/metadata";
import { Podcast } from "../types/podcast";
import { STRAPI_URL } from "../util/constants";

export const getStaticProps: GetStaticProps = async () => {
  const podcastsResponse = await fetch(
    `${STRAPI_URL}/api/podcasts?populate=%2A`
  );
  const metaResponse = await fetch(`${STRAPI_URL}/api/meta?populate=%2A`);

  const podcastsData: Podcast = await podcastsResponse.json();
  const metaData: Podcast = await metaResponse.json();

  return {
    props: { podcastsData, metaData },
  };
};

type Props = {
  podcastsData: Podcast;
  metaData: Meta;
};

export default function Web({ podcastsData, metaData }: Props) {
  const { data } = podcastsData;
  if (data?.length === 0)
    return (
      <Container>
        <Title order={2}> No podcasts uploaded right now </Title>
      </Container>
    );
  return (
    <Layout meta={metaData}>
      <Container>
        <SimpleGrid breakpoints={[{ minWidth: "sm", cols: 2 }]}>
          {data?.map((podcast) => (
            <ArticleCard
              key={podcast.id}
              description={podcast.attributes.description}
              title={podcast.attributes.title}
              image={podcast.attributes.cover.data.attributes.url}
              user={podcast.attributes.user.data.attributes.username}
              audio={podcast.attributes.audio}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
