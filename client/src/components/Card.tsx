import React from "react";
import {IconDownload} from '@tabler/icons-react';
import {ActionIcon, createStyles, getStylesRef, Paper, rem, Text} from '@mantine/core';
import {IPost} from "../types";
import {downloadImage} from "../utils";

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    minHeight: rem(280),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

    [`&:hover .${getStylesRef('overlay')}`]: {
      display: 'none',
    },

    [`&:hover .${getStylesRef('image')}`]: {},

    [`&:hover .${getStylesRef('content')}`]: {
      display: 'flex',
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef('image'),
    backgroundSize: 'cover',
    transition: 'transform 500ms ease',
  },

  overlay: {
    display: 'none',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    ref: getStylesRef('overlay')
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
    display: 'none',
    ref: getStylesRef('content'),
    background: theme.black,
    position: 'absolute',
    bottom: 0,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },

  title: {
    color: theme.white,
    marginBottom: rem(5),
  },
}));

interface IProps {
  data: IPost
}

const Card = ({data}: IProps): JSX.Element => {
  const {classes, theme} = useStyles();
  const {_id, prompt, photo} = data;

  return (
    <Paper
      shadow="lg"
      className={classes.card}
      radius="md"
    >
      <div className={classes.image} style={{backgroundImage: `url(${photo})`}}/>
      <div className={classes.overlay}/>

      <div className={classes.content}>
        <Text size="md" className={classes.title}>
          {prompt}
        </Text>
        <ActionIcon variant="filled" color="indigo" title="download image" onClick={() => downloadImage(_id, photo)}>
          <IconDownload size="1rem" stroke={1.5}/>
        </ActionIcon>
      </div>
    </Paper>
  );
}

export default Card;
