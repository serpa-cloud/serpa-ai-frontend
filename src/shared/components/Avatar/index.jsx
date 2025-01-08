// @flow
import Image from 'next/image';
import { graphql, useFragment } from 'react-relay';

import styles from './index.module.sass';

import type { Avatar$key } from './__generated__/Avatar.graphql';

export type { Avatar$key };

type Props = {|
  +circle?: ?boolean,
  +shadow?: ?boolean,
  +className?: ?string,
  +fixedWidth?: ?number,
  +fixedHeight?: ?number,
  +node: null | Avatar$key,
  +fallbackIcon?: ?React$Node,
|};

export default function Avatar({
  node,
  circle = true,
  shadow = false,
  className = '',
  fixedWidth = null,
  fixedHeight = null,
  fallbackIcon = null,
}: Props): React$Node {
  const data = useFragment(
    graphql`
      fragment Avatar on Image {
        id
        url
        alt
        width
        height
      }
    `,
    node,
  );

  const avatarClassNames = [
    styles.avatar,
    circle ? styles.circle : styles.rounded,
    shadow ? styles.shadow : '',
    className,
  ].join(' ');

  if (!data)
    return (
      <div
        style={{
          width: `${fixedWidth ?? 40}px`,
          height: fixedHeight ? `${fixedHeight}px` : `${fixedWidth ?? 40}px`,
        }}
        className={[avatarClassNames, styles.avatarFallback].join(' ')}
      >
        {fallbackIcon && fallbackIcon}
      </div>
    );

  const { alt, width, height, url } = data;

  return (
    <Image
      alt={alt}
      src={url}
      width={`${fixedWidth || width / 2}`}
      height={height ? `${fixedHeight || height / 2}` : 'auto'}
      className={avatarClassNames}
    />
  );
}
