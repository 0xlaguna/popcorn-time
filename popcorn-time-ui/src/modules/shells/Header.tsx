import React from 'react';

// mantine
import { createStyles, Header, Autocomplete, Group, Burger } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';

import UserProfileHeader from '../profile/UserProfileHeader';

// assets
import { Search } from 'tabler-icons-react';
import PopcornLogo from '../../common/assets/PopcornLogo';
import { ColorSchemeToggle } from '../../ui/utils/ColorSchemeToggle';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

export interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ links }) => {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={() => toggleOpened()} size="sm" />
          <PopcornLogo />
        </Group>

        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<Search size={16} />}
            data={['The batman', 'Joker']}
          />
          <Group ml={50} spacing={5} className={classes.links}>
            <UserProfileHeader />
            <ColorSchemeToggle />
          </Group>
        </Group>
      </div>
    </Header>
  );
};

export default HeaderSearch;
