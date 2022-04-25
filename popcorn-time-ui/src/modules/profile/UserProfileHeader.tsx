import { forwardRef, useState } from 'react';
import { ChevronRight, Heart, Logout } from 'tabler-icons-react';

// mantine
import { Group, Avatar, Text, Menu, UnstyledButton, useMantineTheme } from '@mantine/core';

import WatchList from './Watchlist';

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

  const triggerWatchList = () => setOpenWatchlist(!openWatchlist);

  return (
    <>
      <Group position="center">
        <Menu withArrow placement="center" control={<UserButton name="laguna" email="" />}>
          <Menu.Item
            icon={<Heart size={14} color={theme.colors.red[6]} />}
            onClick={() => triggerWatchList()}
          >
            Watchlist
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>
        </Menu>
      </Group>
      <WatchList visible={openWatchlist} close={() => triggerWatchList()} />
    </>
  );
};

export default UserProfileHeader;
