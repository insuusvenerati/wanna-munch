import { Container, SimpleGrid } from "@mantine/core";
import { GetStaticProps } from "next";
import { ArticleCard } from "../components/ArticleCard";
import { Podcast } from "../types/podcast";
import { STRAPI_URL } from "../util/constants";

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${STRAPI_URL}/api/podcasts?populate=%2A`);
  const data: Podcast = await response.json();

  return {
    props: { data },
  };
};

type Props = {
  data: Podcast;
};

export default function Web({ data }: Props) {
  return (
    <Container>
      <SimpleGrid cols={2}>
        {data.data.map((podcast) => (
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
  );
}