// @flow
import React, { memo } from "react";

export type LayoutSize =
  | 0
  | 4
  | 8
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64
  | 72
  | 80
  | 88
  | 96
  | 104
  | 112
  | 120
  | 128
  | 136
  | 144
  | 152
  | 160
  | 168
  | 176
  | 184
  | 192
  | 200
  | 208
  | 216
  | 224
  | 232
  | 240
  | 248
  | 256
  | 264
  | 272
  | 280
  | 320;

type alignContentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "stretch"
  | "normal"
  | "";

type justifyContentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "normal"
  | "";

type alignItemsType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline"
  | "normal"
  | "";

type flexDirectionType =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse"
  | "";

type flexWrapType = "nowrap" | "wrap" | "wrap-reverse" | "";

type Props = {
  children?: ?React$Node,

  alignContent?: alignContentType,
  justifyContent?: justifyContentType,
  alignItems?: alignItemsType,
  flexDirection?: flexDirectionType,
  flexWrap?: flexWrapType,
  columnGap?: LayoutSize,
  rowGap?: LayoutSize,

  className?: string,
};

export default function Flexbox({
  children = null,
  className = "",
  flexWrap = "nowrap",
  flexDirection = "row",
  alignItems = "normal",
  alignContent = "normal",
  justifyContent = "normal",
  columnGap = 0,
  rowGap = 0,
}: Props): React$Node {
  const inlineStyles = {
    display: "flex",
    flexWrap,
    flexDirection,
    alignItems,
    alignContent,
    justifyContent,
    columnGap: `${columnGap}px`,
    rowGap: `${rowGap}px`,
  };

  return (
    <div className={className} style={inlineStyles}>
      {children}
    </div>
  );
}
