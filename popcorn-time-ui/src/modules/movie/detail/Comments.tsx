import React from 'react';

// mantine
import { createStyles, Text, Avatar, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

interface CommentProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
}

export const Comment: React.FC<CommentProps> = ({ postedAt, body, author }) => {
  const { classes } = useStyles();
  return (
    <div>
      <Group>
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <div>
          <Text size="sm">{author.name}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {body}
      </Text>
    </div>
  );
};
