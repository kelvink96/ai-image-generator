import React from 'react';
import {Anchor, Button, Container, createStyles, Group, Image, rem, Text, Title} from '@mantine/core';
import LogoImg from "../assets/logo.svg";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const BottomFooter = () => {
  const {classes} = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Title order={5}>AI Image Generator</Title>
        <Text size="sm">© {new Date().getFullYear()}{" "}
          <a href="https://github.com/kelvins-lab" target="_blank" rel="noreferrer">kelvins lab</a>.
          Designed with ❤ by <a href="https://lnk.bio/kelvink96" target="_blank" rel="noreferrer">Kelvin</a>. All rights
          reserved</Text>
        <Group spacing="xs">
          <Button
            component="a"
            href="https://github.com/kelvink96/ai-image-generator"
            target="_blank"
            variant="subtle"
          >
            GitHub
          </Button>
          <Button
            component="a"
            href="https://twitter.com/kelvink_96"
            target="_blank"
            variant="subtle"
          >
            Twitter
          </Button>
        </Group>
      </Container>
    </div>
  );
}

export default BottomFooter;
