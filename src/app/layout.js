// @flow
import './globals.css';
import App from './components/App';

import { redirect } from 'next/navigation';

import { verifySession } from './lib/dal';

export const metadata = {
  title: 'Serpa AI',
  description: 'Build 20x faster',
};

export default async function RootLayout({
  children,
}: {
  children: React$Node,
}): Promise<React$Node> {
  const session = await verifySession();

  if (!session) {
    redirect(process.env.SIGNIN_PAGE);
  }

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body>
        <App token={session.token}>{children}</App>
      </body>
    </html>
  );
}
