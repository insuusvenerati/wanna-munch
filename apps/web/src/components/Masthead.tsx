import { Box, createStyles, Image } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    borderBottomColor: "white",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
  },
}));

type Props = {
  image: string | undefined;
};

export const Masthead = ({ image }: Props) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.header}>
      <Image fit="contain" src={image} alt="Masthead Background" />
    </Box>
  );
};
