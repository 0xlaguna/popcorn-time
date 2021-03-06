import React from 'react';

import { Bookmark, Heart, Share } from 'tabler-icons-react';

// mantine
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { useSessionStore } from '../../../lib/Stores';
import { isNil } from 'ramda';
import { useMutateWatchlist } from '../../../api/watchlist';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

export interface MovieItemProps {
  id: number;
  image: string;
  link: string;
  title: string;
  description: string;
}

export const MovieItem: React.FC<
  MovieItemProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof MovieItemProps>
> = ({ className, id, image, link, title, description, ...others }) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const linkProps = { href: link };

  const jwt = useSessionStore((state) => state.jwt);

  const { mutate } = useMutateWatchlist();

  const addToWatchlist = (values: object) => {
    mutate(values, {
      onSuccess: () => {
        showNotification({
          title: 'Success',
          message: 'Added to your watchlist',
        });
      },
      onError: () => {
        showNotification({
          title: 'Error',
          message: 'There was an error, check network',
        });
      },
    });
  };

  return (
    <Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
      <Card.Section>
        <a {...linkProps}>
          <Image src={image} height={180} />
        </a>
      </Card.Section>

      <Text className={classes.title} weight={500} component="a" {...linkProps}>
        {title}
      </Text>

      <Text size="sm" color="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group position="apart" className={classes.footer}>
        {!isNil(jwt) && (
          <Group spacing={8} mr={0}>
            <ActionIcon
              onClick={() => addToWatchlist({ movie: id })}
              className={classes.action}
              style={{ color: theme.colors.red[6] }}
            >
              <Heart size={16} />
            </ActionIcon>
          </Group>
        )}
      </Group>
    </Card>
  );
};
