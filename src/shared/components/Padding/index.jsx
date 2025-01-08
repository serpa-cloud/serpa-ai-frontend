// @flow
import { memo } from "react";

import type { LayoutSize } from "../Flexbox";

export type PaddingProps = {
  top?: LayoutSize | "auto",
  bottom?: LayoutSize | "auto",
  left?: LayoutSize | "auto",
  right?: LayoutSize | "auto",
  vertical?: LayoutSize,
  horizontal?: LayoutSize,

  topM?: ?(LayoutSize | "auto"),
  bottomM?: ?(LayoutSize | "auto"),
  leftM?: ?(LayoutSize | "auto"),
  rightM?: ?(LayoutSize | "auto"),
  verticalM?: ?LayoutSize,
  horizontalM?: ?LayoutSize,

  children: React$Node,
  className?: string,
};

export default function Padding({
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  vertical = 0,
  horizontal = 0,

  topM = null,
  rightM = null,
  bottomM = null,
  leftM = null,
  verticalM = null,
  horizontalM = null,

  className = "",
  children,
}: PaddingProps): React$Node {
  return (
    <div
      className={className ?? ""}
      style={{
        paddingTop: vertical || top,
        paddingRight: horizontal || right,
        paddingBottom: vertical || bottom,
        paddingLeft: horizontal || left,
      }}
    >
      {children}
    </div>
  );
}
