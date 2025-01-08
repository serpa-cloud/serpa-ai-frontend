// @flow

import Link from 'next/link';
import Image from 'next/image';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { Flexbox, Avatar, TapIcon, useCreateAIProject } from '../../../shared';

import logoIcon from '../../../shared/images/icon.svg';

import styles from './index.module.sass';

export default function Header(): React$Node {
  const [createProject] = useCreateAIProject();

  const isMacOS = true;

  const userData = useLazyLoadQuery(
    graphql`
      query HeaderQuery {
        me {
          id
          media(width: 80, height: 80) {
            id
            ...Avatar
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  return (
    <header className={styles.header}>
      <Link href="/app">
        <Image priority src={logoIcon} width={40} height={40} alt="Serpa AI" />
      </Link>
      <Flexbox flexDirection="column" rowGap={16}>
        <TapIcon
          icon="search"
          keymap="f"
          onTap={() => console.log('search')}
          modifier={isMacOS ? 'metaKey' : 'ctrlKey'}
          label={`[${isMacOS ? 'cmd' : 'ctrl'} + f] Search`}
        />
        <TapIcon icon="add" label="[c] Create" onTap={createProject} keymap="c" />
        <Avatar node={userData?.me?.media ?? null} shadow />
      </Flexbox>
    </header>
  );
}
