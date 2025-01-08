'use client';
// @flow
import { useState, useCallback } from 'react';
import classNames from 'classnames';

import Text from '../Text';
import Icon from '../Icon';
import Flexbox from '../Flexbox';
import Spinner from '../Spinner';
import InteractiveElement from '../InteractiveElement';

import styles from './index.module.sass';

import type { InteractiveElementEvent } from '../InteractiveElement';

export type ButtonType = 'primary' | 'secondary' | 'danger' | 'main';
export type ButtonSize = 'default' | 'hero';

type Props = {|
  +children?: ?string,
  +icon?: ?string,
  +iconRight?: ?string,
  +disabled?: boolean,
  +buttonType?: ButtonType,
  +onClick: InteractiveElementEvent,
  +size?: ?ButtonSize,
  +loading?: ?boolean,
  +autoFocus?: ?boolean,
|};

export default function Button({
  icon = null,
  children = null,
  size = 'default',
  iconRight = null,
  disabled = false,
  onClick,
  buttonType = 'main',
  autoFocus = false,
  loading = false,
}: Props): React$Node {
  const [hover, setHover] = useState<boolean>(false);
  const isHero = size === 'hero';

  const handleOnClick = useCallback(
    (e: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>) => {
      if (onClick) onClick(e);
    },
    [onClick],
  );

  return (
    <div
      className={classNames(
        styles.container,
        styles[buttonType],
        disabled ? styles.disabled : styles.enable,
        { [styles.heroContainer]: isHero },
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <InteractiveElement
        onClick={onClick}
        disabled={disabled}
        autoFocus={autoFocus}
        onKeyPress={handleOnClick}
        className={styles.content}
        label={children ?? ''}
      >
        <Flexbox
          className={styles.textContainer}
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          columnGap={isHero ? 24 : 12}
        >
          {loading && <Spinner size={16} color="var(--always-white)" />}
          {icon && (
            <Icon
              icon={icon}
              size={20}
              color={
                buttonType === 'secondary' ? '--primary-color-1' : '--button-primary-text-color'
              }
            />
          )}
          <Text
            type={isHero ? 's2m' : 's0b'}
            color={buttonType === 'secondary' ? '--primary-color-1' : '--button-primary-text-color'}
          >
            {children}
          </Text>
          {iconRight && (
            <Icon
              icon={iconRight}
              size={20}
              color={
                buttonType === 'secondary' ? '--primary-color-1' : '--button-primary-text-color'
              }
            />
          )}
        </Flexbox>
      </InteractiveElement>
      <div
        className={classNames(
          styles.overlay,
          {
            [styles.secondaryOverlay]: buttonType === 'secondary',
            [styles.dangerOverlay]: buttonType === 'danger',
            [styles.mainOverlay]: buttonType === 'main',
          },
          { [styles.hover]: hover, [styles.unhover]: !hover },
        )}
      />
    </div>
  );
}
