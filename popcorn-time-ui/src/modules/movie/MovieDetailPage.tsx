import React from 'react';

import { useRouter } from 'next/router';

// mantine
import { LoadingOverlay, Container } from '@mantine/core';

// helpers
import { path, isNil } from 'ramda';

// Shells
import MainShell from '../shells/MainShell';

// api
import { useGetMovieDetail } from '../../api/movies';

// components
import MovieDetail from './detail/MovieDetail';

export default function MovieDetailPage() {
  const router = useRouter();
  const query = router.query;

  const queryMovieId = path<string>(['id'], query);

  if (isNil(queryMovieId)) return <div>Invalid movie identifier</div>;

  const movieId = Number.parseInt(queryMovieId);

  const { data, isLoading } = useGetMovieDetail(movieId);

  console.log({ data });

  return (
    <Container>
      {isLoading ? (
        <div style={{ width: 400, position: 'relative' }}>
          <LoadingOverlay visible={isLoading} />
        </div>
      ) : (
        <MovieDetail
          movieId={data!.id}
          title={data?.title}
          description={data?.plot}
          image={data!.cover}
          action={{ label: 'book', link: '#' }}
        />
      )}
    </Container>
  );
}

MovieDetailPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainShell>{page}</MainShell>;
};
