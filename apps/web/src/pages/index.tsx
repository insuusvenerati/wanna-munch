import { Container, SimpleGrid, Title } from "@mantine/core";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { ArticleCard } from "../components/ArticleCard";
import { Layout } from "../components/Layout";
import { PodcastSearch } from "../types/meilisearch";
import { Meta } from "../types/metadata";
import { Podcast } from "../types/podcast";
import { STRAPI_URL } from "../util/constants";
import { meilisearchClient } from "../util/meilisearch";

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
  const [podcasts, setPodcasts] = useState<PodcastSearch[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    meilisearchClient
      .index("podcast")
      .search<PodcastSearch>(search)
      .then((res) => setPodcasts(res.hits));
  }, [search]);

  const { data } = podcastsData;
  if (data?.length === 0)
    return (
      <Container>
        <Title order={2}> No podcasts uploaded right now </Title>
      </Container>
    );
  return (
    <Layout setSearch={setSearch} search={search} meta={metaData}>
      <Container>
        <SimpleGrid breakpoints={[{ minWidth: "sm", cols: 2 }]}>
          {podcasts?.map((podcast) => (
            <ArticleCard
              key={podcast.id}
              description={podcast.description}
              title={podcast.title}
              image={podcast.cover.url}
              user={podcast.user.username}
              audio={{
                mime: podcast.audio.mime,
                url: podcast.audio.url,
              }}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
