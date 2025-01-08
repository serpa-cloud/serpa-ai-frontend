// @flow
// Spinner.jsx
import styles from './index.module.sass';

type Props = {|
  color?: ?string,
  size?: ?number,
|};

export default function Spinner({ color = '', size = 24 }: Props): React$Node {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.spinner}
    >
      <circle
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
        stroke={color || 'var(--primary-color-1)'}
        className={styles.path}
      />
    </svg>
  );
}
