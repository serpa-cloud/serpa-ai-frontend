// @flow

'use client';

import { RelayEnvironmentProvider } from 'react-relay';

import Header from '../Header';
import getRelayEnvironment from '../../../RelayEnvironment';

import styles from './index.module.sass';

type Props = { children: React$Node, token: string };

let RelayEnvironment;

if (typeof window !== 'undefined') {
  RelayEnvironment = getRelayEnvironment();
}

export default function App({ children, token }: Props): React$Node {
  const environment = RelayEnvironment || getRelayEnvironment(token);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Header />
      <section className={styles.section}>{children}</section>
    </RelayEnvironmentProvider>
  );
}
