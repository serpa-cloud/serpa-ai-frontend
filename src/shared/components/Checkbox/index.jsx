// @flow
import React from 'react';
import classNames from 'classnames';

import Text from '../Text';
import Icon from '../Icon';
import Flexbox from '../Flexbox';
import InteractiveElement from '../InteractiveElement';

import styles from './index.module.sass';

type Props = {|
  +label?: ?React$Node,
  +checked: boolean,
  +disabled?: boolean,
  +onChange: (
    boolean,
    SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
  ) => void,
  +disableFocus?: ?boolean,
|};

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  disableFocus = false,
}: Props): React$Node {
  const handleOnChange = React.useCallback<
    (SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>) => void,
  >(
    (e) => {
      if (onChange) onChange(!checked, e);
    },
    [onChange, checked],
  );

  return (
    <Flexbox
      columnGap={16}
      className={classNames(styles.container, disabled ? styles.disabled : styles.enabled)}
    >
      <InteractiveElement
        disabled={disabled}
        onClick={handleOnChange}
        disableFocus={disableFocus}
        className={classNames(styles.checkContainer, checked ? styles.checked : styles.unchecked)}
      >
        {checked ? <Icon icon="check" color="--always-white" weight={300} size={20} /> : null}
      </InteractiveElement>
      {label ? <Text type="s1r">{label}</Text> : null}
    </Flexbox>
  );
}
