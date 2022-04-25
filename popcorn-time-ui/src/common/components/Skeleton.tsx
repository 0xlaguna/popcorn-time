import React from 'react';
import { Skeleton as MSkeleton, Grid } from '@mantine/core';

const ChildSkeleton = <MSkeleton height={140} radius="md" animate={true} />;

const Skeleton: React.FC = () => {
  return (
    <Grid>
      <Grid.Col xs={3}>{ChildSkeleton}</Grid.Col>
      <Grid.Col xs={3}>{ChildSkeleton}</Grid.Col>
      <Grid.Col xs={3}>{ChildSkeleton}</Grid.Col>
      <Grid.Col xs={3}>{ChildSkeleton}</Grid.Col>
    </Grid>
  );
};

export default Skeleton;
