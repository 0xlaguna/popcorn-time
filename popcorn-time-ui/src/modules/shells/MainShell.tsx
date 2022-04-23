import React, { useEffect, useState } from 'react';

// Mantine
import { AppShell, Footer, useMantineTheme } from '@mantine/core';

import HeaderSearch from './Header';

export type MainShellProps = {};

const MainShell: React.FC<MainShellProps> = ({ children }) => {
  const theme = useMantineTheme();

  useEffect(() => {
    console.log('rendering shell');
  });

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      footer={
        <Footer height={60} p="md">
          2022 PopcornTime Inc
        </Footer>
      }
      header={<HeaderSearch links={[{ link: '/ff', label: 'info' }]} />}
    >
      {children}
    </AppShell>
  );
};

export default MainShell;
