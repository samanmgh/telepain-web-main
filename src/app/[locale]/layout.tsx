import React from "react";
import {NextIntlClientProvider} from "next-intl";
import type {Metadata} from "next";
import "@/styles/globals.css";
import "@/styles/main.scss"
import {Toaster} from "react-hot-toast";
import {SWRConfig} from "swr";
import {getMessages} from "next-intl/server";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Tele pain solutions",
  description: "Generated by Tele pain solutions",
};

type Props = {
  children: React.ReactNode;
  params: never
}

const RootLayout: React.FC<Props> = async ({children, params}) => {
  const {locale} = params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'en' ? 'ltr' : 'rtl'}>
    <body className={roboto.className}>
    <NextIntlClientProvider messages={messages}>
      <SWRConfig>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: 'white',
              color: 'black',
              fontSize: '14px',
              boxShadow: '0 0 0 #fff',
            },
          }}
        />
      </SWRConfig>
    </NextIntlClientProvider>
    </body>
    </html>
  );
};

export default RootLayout;
