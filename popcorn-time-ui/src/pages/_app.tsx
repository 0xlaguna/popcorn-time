import { Fragment, useState } from 'react';

import { Page } from '../types/page';

// Next
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { getCookie, setCookies } from 'cookies-next';
import { AppProps } from 'next/app';

// Mantine
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

// Libs
import { QueryClientProvider } from 'react-query';
import popCornQueryClient from '../lib/QueryClient';

// nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type Props = AppProps & {
  Component: Page;
};

export default function App(props: Props & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <Layout>
      <Head>
        <title>Popcorn time</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <QueryClientProvider client={popCornQueryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>{getLayout(<Component {...pageProps} />)}</NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </Layout>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
