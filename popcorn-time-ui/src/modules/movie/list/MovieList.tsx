import React, { useEffect } from 'react';

import { map } from 'ramda';

// mantine
import { Container, createStyles, Button } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
// components

import Skeleton from '../../../common/components/Skeleton';
import { MovieItem, MovieItemProps } from './MovieItem';

// api
import { useGetMovieList } from '../../../api/movies';
import { AddMovie } from './AddMovie/AddMovie';

const useStyles = createStyles((theme) => ({
  MovieGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(13em, 1fr))',
    gap: '10px',
  },
  LoadMore: {
    marginTop: '0.8rem',
  },
}));

export const MovieList: React.FC = () => {
  const { classes } = useStyles();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 });

  const { data: list, isLoading, fetchNextPage, hasNextPage, refetch } = useGetMovieList();

  useEffect(() => {
    hasNextPage && scrollIntoView({ alignment: 'center' });
  });

  const onLoadMore = () => {
    fetchNextPage();
  };

  return (
    <Container>
      <AddMovie updateData={refetch} />
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className={classes.MovieGrid} style={{ marginTop: '10px' }}>
          {map(
            (moviePage) => (
              <React.Fragment key={moviePage.next}>
                {map((movie) => {
                  const props: MovieItemProps = {
                    id: movie.id,
                    image: movie.cover,
                    link: `/movie/${movie.id}/detail`,
                    title: movie.title,
                    description: movie.plot,
                  };

                  return <MovieItem key={movie.id} {...props} />;
                }, moviePage.results)}
              </React.Fragment>
            ),
            list?.pages || []
          )}
        </div>
      )}
      {hasNextPage && (
        <div ref={targetRef}>
          <Button className={classes.LoadMore} loading={isLoading} onClick={() => onLoadMore()}>
            Load more
          </Button>
        </div>
      )}
    </Container>
  );
};

export default MovieList;
