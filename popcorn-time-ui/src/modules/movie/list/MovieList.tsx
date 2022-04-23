import React, { useEffect } from 'react';

import { map } from 'ramda';

// mantine
import { Grid, Skeleton, Container, createStyles, Button } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
// components

import { MovieItem, MovieItemProps } from './MovieItem';

// api
import { useGetMovieList } from '../../../api/movies';

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

const ChildSkeleton = <Skeleton height={140} radius="md" animate={true} />;

export const MovieList: React.FC = () => {
  const { classes } = useStyles();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 });

  const { data: list, isLoading, fetchNextPage, hasNextPage } = useGetMovieList();

  useEffect(() => {
    hasNextPage && scrollIntoView({ alignment: 'center' });
  });

  const onLoadMore = () => {
    fetchNextPage();
  };

  return (
    <Container>
      {isLoading ? (
        <Grid>
          <Grid.Col xs={3}>{ChildSkeleton}</Grid.Col>
          <Grid.Col xs={3}>{ChildSkeleton}</Grid.Col>
          <Grid.Col xs={3}>{ChildSkeleton}</Grid.Col>
          <Grid.Col xs={3}>{ChildSkeleton}</Grid.Col>
        </Grid>
      ) : (
        <div className={classes.MovieGrid}>
          {map(
            (moviePage) => (
              <React.Fragment key={moviePage.next}>
                {map((movie) => {
                  const props: MovieItemProps = {
                    image: movie.cover,
                    link: `/movie/${movie.id}/detail`,
                    title: movie.title,
                    description: movie.plot,
                    rating: '★★★★★★★★★★',
                  };

                  return <MovieItem key={movie.id} {...props} />;
                }, moviePage.results)}
              </React.Fragment>
            ),
            list!.pages
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
