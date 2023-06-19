import '@/styles/globals.css'
import Head from 'next/head';
//Use React Query
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
//Config Tailwind and MaterialUI
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/config/materialUI/theme";
import Nprogress from '@/components/Nprogress';

import type { AppProps } from 'next/app'
import { useEffect } from 'react';
export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
      console.log("serviceWorker start")
    } else {
      console.log("serviceWorker not start ")
    }
    self.addEventListener('install', () => {
      console.log('service worker installed')
    });

    self.addEventListener('activate', () => {
      console.log('service worker activated')
    });
  }, [])


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>AroundTheCode</title>
        </Head>
        <Nprogress>
          <Component {...pageProps} />
        </Nprogress>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
