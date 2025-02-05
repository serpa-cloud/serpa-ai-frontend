// @flow
'use client';
import { useRef, useEffect } from 'react';

const ENTER = 'Enter';
const ESCAPE = 'Escape';

export type InteractiveElementEvent = (
  SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
) => void | Promise<void>;

type Props = {
  label?: string,
  className?: string,
  disabled?: boolean,
  children: React$Node,
  +disableFocus?: ?boolean,
  +onClick?: ?InteractiveElementEvent,
  +onKeyPress?: ?InteractiveElementEvent,
  +onMouseEnter?: ?(?SyntheticMouseEvent<HTMLDivElement>) => void,
  +autoFocus?: ?boolean,
};

export default function InteractiveElement({
  label = '',
  onClick = null,
  children,
  disabled = false,
  className = '',
  onKeyPress = null,
  onMouseEnter = null,
  disableFocus = false,
  autoFocus = null,
}: Props): React$Node {
  const ref = useRef<?HTMLDivElement>();

  function handleMouseDown(e: SyntheticMouseEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleKeyPress(event: SyntheticKeyboardEvent<HTMLDivElement>) {
    event.persist();
    const { key } = event;
    if (key === ENTER) (onKeyPress || onClick)?.(event);
    if (key === ESCAPE) event.currentTarget.blur();
  }

  function handleClick(event: SyntheticMouseEvent<HTMLDivElement>) {
    event.persist();
    if (onClick) onClick(event);
  }

  const tabValue = disabled ? '-1' : '0';

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={disableFocus ? '' : tabValue}
      aria-disabled={!!disabled}
      role="button"
      aria-label={label}
      className={className || ''}
      onKeyDown={handleKeyPress}
      onMouseDown={handleMouseDown}
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        touchAction: 'manipulation',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : '',
      }}
    >
      {children}
    </div>
  );
}
