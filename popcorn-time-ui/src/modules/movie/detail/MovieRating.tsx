import React, { useState } from 'react';
import { createStyles, Text, Avatar, Group, Paper, Badge, Textarea, Button } from '@mantine/core';

import { Rating } from 'react-simple-star-rating';

const useStyles = createStyles((theme) => ({
  Comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
  Body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

export interface MovieRatingProps {
  movieId: number;
}

const MovieRating: React.FC<MovieRatingProps> = ({ movieId }) => {
  const { classes } = useStyles();
  const [ratingValue, setRatingValue] = useState(0);

  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };

  return (
    <Paper withBorder radius="md" className={classes.Comment}>
      <div>
        <div>
          <Group>
            <Avatar src={null} alt="no image here" color="indigo" />
            <div>
              <Text size="sm">{'laguna'}</Text>
            </div>
          </Group>
          <Text className={classes.Body} size="sm" lineClamp={6}>
            <Textarea placeholder="it was cool!" label="rate this movie" />
          </Text>
        </div>
        <Group position="right">
          <Rating size={22} ratingValue={ratingValue} iconsCount={10} onClick={handleRating} />
          <Button disabled={ratingValue === 0}>Rate</Button>
        </Group>
      </div>
    </Paper>
  );
};

export default MovieRating;
