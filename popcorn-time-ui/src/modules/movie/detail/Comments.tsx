import React from 'react';

import { Space } from '@mantine/core';

// components
import CommentItem from './CommentItem';
import { useGetMovieRatings } from '../../../api/movies';

export interface CommentsProps {
  movieId: number;
}

const Comments: React.FC<CommentsProps> = ({ movieId }) => {
  const { data: list, isLoading } = useGetMovieRatings({ movie_id: movieId });
  console.log({ list, isLoading });

  return (
    <div>
      <CommentItem
        postedAt="2022-04-08"
        body="It was kinda cool, but i didnt like the par where batman kills joker"
        author="laguna"
      />
      <Space h="xl" />
      <CommentItem postedAt="2022-04-08" body="It was cool!" author="laguna" />
      <Space h="xl" />
      <CommentItem postedAt="2022-04-08" body="It was cool!" author="laguna" />
    </div>
  );
};

export default Comments;
