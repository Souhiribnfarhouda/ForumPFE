import { NextPage } from 'next';
import { AppProps } from 'next/app';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export type CustomNextPage<P = any> = NextPage<P> & {
  auth?: boolean;
  isAdmin?: boolean;
  Layout?: any;
};

export type CustomAppProps = AppProps & {
  Component: CustomNextPage;
};
