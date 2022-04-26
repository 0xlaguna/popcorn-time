import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';

import List from './watchlist/List';

export interface WatchlistProps {
  visible: boolean;
  close: () => void;
}

const WatchlistDrawer: React.FC<WatchlistProps> = ({ visible, close }) => {
  return (
    <>
      <Drawer opened={visible} onClose={() => close()} title="Watchlist" padding="xl" size="xl">
        <List />
      </Drawer>
    </>
  );
};

export default WatchlistDrawer;
