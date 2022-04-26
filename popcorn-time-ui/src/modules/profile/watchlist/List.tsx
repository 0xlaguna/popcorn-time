import React, { useEffect } from 'react';

import { map } from 'ramda';

import { Container, Space, Button, ScrollArea } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import Skeleton from '../../../common/components/Skeleton';

import { useGetWatchlist } from '../../../api/watchlist';

import Item from './Item';

const List: React.FC = () => {
  const { data: list, isLoading, fetchNextPage, hasNextPage, refetch } = useGetWatchlist();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 });

  useEffect(() => {
    hasNextPage && scrollIntoView({ alignment: 'center' });
  });

  const onLoadMore = () => {
    fetchNextPage();
  };

  return (
    <Container>
      {isLoading ? (
        <Skeleton />
      ) : (
        <ScrollArea style={{ height: '90vh' }}>
          {map(
            (watchPage) => (
              <React.Fragment key={watchPage.next}>
                {map((watch) => {
                  return (
                    <React.Fragment key={watch.id}>
                      <Space h="sm" />
                      <Item cover={watch.movie_cover} title={watch.movie_title} />
                    </React.Fragment>
                  );
                }, watchPage.results)}
              </React.Fragment>
            ),
            list?.pages || []
          )}
        </ScrollArea>
      )}
      {hasNextPage && (
        <div ref={targetRef}>
          <Button style={{ marginTop: '4px' }} loading={isLoading} onClick={() => onLoadMore()}>
            Load more
          </Button>
        </div>
      )}
    </Container>
  );
};

export default List;
