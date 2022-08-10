import MeiliSearch from "meilisearch";
import { MEILISEARCH_KEY, MEILISEARCH_URL } from "./constants";

export const meilisearchClient = new MeiliSearch({
  host: MEILISEARCH_URL,
  headers: {
    Authorization: `Bearer ${MEILISEARCH_KEY}`,
    "Content-Type": "application/json",
  },
});
