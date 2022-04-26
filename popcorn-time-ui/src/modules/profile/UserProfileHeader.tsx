import { forwardRef, useState } from 'react';
import Router from 'next/router';
import { ChevronRight, Heart, Logout, Login } from 'tabler-icons-react';

// mantine
import { Group, Avatar, Text, Menu, UnstyledButton, useMantineTheme, Button } from '@mantine/core';

// helpers
import { isNil } from 'ramda';

import WatchList from './WatchlistDrawer';
import LoginModal from './LoginModal';

import { useSessionStore } from '../../lib/Stores';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={null} radius="xl" color="indigo" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <ChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

const UserProfileHeader: React.FC = () => {
  const theme = useMantineTheme();
  const [openWatchlist, setOpenWatchlist] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const jwt = useSessionStore((state) => state.jwt);

  const logOut = useSessionStore((state) => state.logOut);

  const triggerWatchList = () => setOpenWatchlist(!openWatchlist);

  return (
    <>
      {isNil(jwt) ? (
        <Button onClick={() => setOpenLogin(!openLogin)}>
          <Avatar src={null} radius="xl" color="indigo">
            <Login />
          </Avatar>
        </Button>
      ) : (
        <Group position="center">
          <Menu withArrow placement="center" control={<UserButton name="L" email="" />}>
            <Menu.Item
              icon={<Heart size={14} color={theme.colors.red[6]} />}
              onClick={() => triggerWatchList()}
            >
              Watchlist
            </Menu.Item>

            <Menu.Label>Settings</Menu.Label>
            <Menu.Item
              icon={<Logout size={14} />}
              onClick={() => {
                Router.push({
                  pathname: '/',
                });
                logOut();
              }}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Group>
      )}
      <WatchList visible={openWatchlist} close={() => triggerWatchList()} />
      <LoginModal visible={openLogin} onClose={() => setOpenLogin(!openLogin)} />
    </>
  );
};

export default UserProfileHeader;
