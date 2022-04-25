import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';

export interface WatchlistProps {
  visible: boolean;
  close: () => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ visible, close }) => {
  return (
    <>
      <Drawer opened={visible} onClose={() => close()} title="Register" padding="xl" size="xl">
        <div>movies</div>
      </Drawer>
    </>
  );
};

export default Watchlist;
