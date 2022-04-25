import React, { useEffect } from 'react';

import { Space, Button } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';

import { map } from 'ramda';

// components
import CommentItem from './CommentItem';
import Skeleton from '../../../common/components/Skeleton';

// api
import { useGetMovieRatings } from '../../../api/movies';

export interface CommentsProps {
  movieId: number;
}

const Comments: React.FC<CommentsProps> = ({ movieId }) => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 });
  const {
    data: list,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetMovieRatings({ movie_id: movieId });

  useEffect(() => {
    hasNextPage && scrollIntoView({ alignment: 'center' });
  });

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div>
          {map(
            (ratingPage) => (
              <React.Fragment key={ratingPage.next}>
                {map((rating) => {
                  return (
                    <React.Fragment key={rating.id}>
                      <Space h="xl" />
                      <CommentItem
                        postedAt={rating.posted_at}
                        body={rating.comment}
                        author={rating.username}
                        rate={rating.rating}
                      />
                    </React.Fragment>
                  );
                }, ratingPage.results)}
              </React.Fragment>
            ),
            list!.pages
          )}
        </div>
      )}
      {hasNextPage && (
        <div ref={targetRef}>
          <Button style={{}} loading={isLoading} onClick={() => fetchNextPage()}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default Comments;
