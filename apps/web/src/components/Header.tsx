import {
  ActionIcon,
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconSearch,
} from "@tabler/icons";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Social } from "../types/metadata";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  social: {
    width: 320,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
  social: Social[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SocialIcons = {
  Twitter: IconBrandTwitter,
  Instagram: IconBrandInstagram,
  Youtube: IconBrandYoutube,
};

export function HeaderMiddle({
  links,
  social,
  search,
  setSearch,
}: HeaderMiddleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = useMemo(
    () =>
      links.map((link) => (
        <a
          key={link.label}
          href={link.link}
          className={cx(classes.link, {
            [classes.linkActive]: active === link.link,
          })}
          onClick={(event) => {
            event.preventDefault();
            setActive(link.link);
          }}
        >
          {link.label}
        </a>
      )),
    [active, classes.link, classes.linkActive, cx, links]
  );

  return (
    <Header className={classes.header} height={56} mb={60}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={toggle}
          size="sm"
          className={classes.burger}
        />
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <TextInput
            icon={<IconSearch />}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            mr="sm"
            placeholder="Search"
            aria-label="Search"
          />
          {social &&
            social.map((s) => {
              return (
                <ActionIcon size="lg" key={s.url}>
                  {React.createElement(SocialIcons[s.icon], {
                    size: 25,
                    color: "white",
                    stroke: 1.5,
                  })}
                </ActionIcon>
              );
            })}
        </Group>
      </Container>
    </Header>
  );
}
