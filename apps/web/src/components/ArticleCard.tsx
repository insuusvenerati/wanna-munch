import {
  ActionIcon,
  Badge,
  Card,
  Center,
  createStyles,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { Audio } from "../types/podcast";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

interface ArticleCardProps {
  image: string;
  title: string;
  description: string;
  user: string;
  audio: Audio;
}

export function ArticleCard({
  className,
  image,
  title,
  description,
  user,
  audio,
  ...others
}: ArticleCardProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof ArticleCardProps>) {
  const { classes, cx, theme } = useStyles();

  return (
    <Card
      withBorder
      radius="md"
      className={cx(classes.card, className)}
      {...others}
    >
      <Card.Section>
        <Image src={image} height={180} />
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        {/* {rating} */}
      </Badge>

      <Text className={classes.title} weight={500} component="a">
        {title}
      </Text>

      <Text mb="sm" size="sm" color="dimmed" lineClamp={4}>
        {description}
      </Text>

      <audio controls>
        <source
          src={audio.data.attributes.url}
          type={audio.data.attributes.mime}
        />
      </audio>

      <Group position="apart" className={classes.footer}>
        <Center>
          {/* <Avatar src={author.image} size={24} radius="xl" mr="xs" /> */}
          <Text size="sm" inline>
            {user}
          </Text>
        </Center>

        <Group spacing={8} mr={0}>
          <ActionIcon className={classes.action}>
            {/* <IconHeart size={16} color={theme.colors.red[6]} /> */}
          </ActionIcon>
          <ActionIcon className={classes.action}>
            {/* <IconBookmark size={16} color={theme.colors.yellow[7]} /> */}
          </ActionIcon>
          <ActionIcon className={classes.action}>
            {/* <IconShare size={16} /> */}
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
