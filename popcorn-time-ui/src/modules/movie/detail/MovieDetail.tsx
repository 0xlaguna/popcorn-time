import React from 'react';

// mantine
import {
  createStyles,
  Card,
  Overlay,
  CardProps,
  Button,
  Text,
  useMantineTheme,
  Group,
  Space,
} from '@mantine/core';

import Comments from './Comments';
import { useSessionStore } from '../../../lib/Stores';

const useStyles = createStyles((theme) => ({
  card: {
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  content: {
    position: 'absolute',
    padding: theme.spacing.xl,
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  action: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
  },

  title: {
    color: theme.white,
    marginBottom: theme.spacing.xs / 2,
  },

  description: {
    color: theme.white,
    maxWidth: 220,
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

export interface MovieDetailProps {
  movieId: number;
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
  action: {
    label: string;
    link: string;
  };
}

const MovieDetail: React.FC<
  MovieDetailProps & Omit<CardProps<'div'>, keyof MovieDetailProps | 'children'>
> = ({ movieId, title, description, image, action, style, className, ...others }) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
    <>
      <Card
        radius="md"
        style={{ backgroundImage: `url(${image})`, ...style }}
        className={cx(classes.card, className)}
        {...others}
      >
        <Overlay
          gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`}
          opacity={0.55}
          zIndex={0}
        />

        <div className={classes.content}>
          <Text size="lg" weight={700} className={classes.title}>
            {title}
          </Text>

          <Text size="sm" className={classes.description}>
            {description}
          </Text>

          <Group position="apart" className={classes.footer}>
            <Button variant="white" color="dark" component="a" size="xs" href={action.link}>
              {action.label}
            </Button>
          </Group>
        </div>
      </Card>
      <div>
        <Comments movieId={movieId} />
      </div>
    </>
  );
};

export default MovieDetail;
