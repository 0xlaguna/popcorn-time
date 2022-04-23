import React from 'react';

// Shells
import MainShell from '../shells/MainShell';

// Components
import MovieList from './list/MovieList';

export default function MoviePage() {
  return (
    <div>
      <MovieList />
    </div>
  );
}

MoviePage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainShell>{page}</MainShell>;
};
