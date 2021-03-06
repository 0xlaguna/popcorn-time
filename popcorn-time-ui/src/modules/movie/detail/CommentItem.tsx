import React from 'react';

// mantine
import { createStyles, Text, Avatar, Group, Paper, Badge } from '@mantine/core';

import { Star } from 'tabler-icons-react';

// lib
import { FormatDate } from '../../../lib/dayjs';
import { map } from 'ramda';

const useStyles = createStyles((theme) => ({
  Comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
  Body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
  Rating: {
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
  },
  MainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(15em, 1fr))',
    gap: '10px',
  },
}));

interface CommentProps {
  postedAt: Date;
  body: string;
  author: string;
  rate: number;
}

const Comment: React.FC<CommentProps> = ({ postedAt, body, author, rate }) => {
  const { classes } = useStyles();

  const startIterator = Array.from({ length: rate }, (_, i) => i + 1);

  return (
    <Paper withBorder radius="md" className={classes.Comment}>
      <div className={classes.MainGrid}>
        <div>
          <Group>
            <Avatar src={null} alt="no image here" color="indigo" />
            <div>
              <Text size="sm">{author}</Text>
              <Text size="xs" color="dimmed">
                {FormatDate(postedAt)}
              </Text>
            </div>
          </Group>
          <Text className={classes.Body} size="sm" lineClamp={6}>
            {body}
          </Text>
        </div>
        <Group position="right">
          <Badge
            className={classes.Rating}
            variant="gradient"
            gradient={{ from: 'yellow', to: 'red' }}
          >
            {map(
              (it) => (
                <Star size={15} key={it} />
              ),
              startIterator
            )}
          </Badge>
        </Group>
      </div>
    </Paper>
  );
};

export default Comment;
