import React from 'react';

// Shells
import MainShell from '../shells/MainShell';

// Components
import { Welcome } from '../../common/components/Welcome';

interface MoviePageProps {
  leftPanel?: React.ReactNode;
}

export const MoviePage: React.FC<MoviePageProps> = () => {
  return (
    <div>
      <MainShell>
        <Welcome />
      </MainShell>
    </div>
  );
};

export default MoviePage;
