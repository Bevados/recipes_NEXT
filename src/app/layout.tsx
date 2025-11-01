import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Header from '../components/UI/layout/header';

import Provider from '../providers/providers';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth';

import { siteConfig } from '@/config/site.config';
import { layoutConfig } from '@/config/layout.config';

import './globals.css';
import AppLoader from '@/hoc/app-loader';
import Title from '@/components/UI/layout/title';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              <Title />
              <main
                className={`flex flex-col max-w-[1024px] mx-auto px-[24px] justify-start items-center`}
                style={{
                  height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`,
                }}
              >
                {children}
              </main>
              <footer
                className={`flex justify-center items-center `}
                style={{ height: `${layoutConfig.footerHeight}` }}
              >
                {siteConfig.description}
              </footer>
            </AppLoader>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
