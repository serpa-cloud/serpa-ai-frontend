// @flow
import classNames from 'classnames';
import styles from './index.module.sass';

export type CardProps = {
  className?: string,
  children?: React$Node,
  hideBorder?: ?boolean,
  hideShadow?: ?boolean,
  backgroundColor?: ?string,
};

export default function Card({
  children,
  className = '',
  hideBorder,
  hideShadow,
  backgroundColor,
}: CardProps): React$Node {
  const inlineStyles = {
    borderWidth: hideBorder ? 0 : 1,
    boxShadow: hideShadow ? 'none' : 'var(--shadow-1-color)',
    backgroundColor: backgroundColor ? `var(${backgroundColor})` : 'var(--card-background)',
  };

  return (
    <div className={classNames(styles.container, className)} style={inlineStyles}>
      {children}
    </div>
  );
}
