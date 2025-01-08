/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from "react";
import styles from "./index.module.sass";

import Flexbox from "../Flexbox";

export type Component =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "div"
  | "span"
  | "p";

export type TextType =
  | "d2"
  | "d3"
  | "d4"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "bl"
  | "bd"
  | "bs"
  | "s3b"
  | "s3m"
  | "s3r"
  | "s2b"
  | "s2m"
  | "s2r"
  | "s1b"
  | "s1m"
  | "s1r"
  | "s0b"
  | "s0m"
  | "s0r";

type Props = {|
  +type: TextType,
  +color?: ?string,
  +children?: ?React$Node,
  +component?: ?Component,
  +textAlign?: ?"left" | "center" | "right",
  +gradient?: ?string,
  +ariaId?: ?string,
|};

const typeComponentMapping = {
  d2: "div",
  d3: "div",
  d4: "div",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

export default function Text({
  type,
  color = null,
  children = null,
  gradient = null,
  component = null,
  textAlign = "left",
  ariaId = "",
}: Props): React$Node {
  const content = children;

  if (
    type === "d2" ||
    type === "d3" ||
    type === "d4" ||
    type === "h2" ||
    type === "h3" ||
    type === "h4" ||
    type === "h5" ||
    type === "h6"
  ) {
    return (
      <Flexbox
        alignItems={
          textAlign === "left"
            ? "flex-start"
            : textAlign === "center"
              ? "center"
              : "flex-end"
        }
        flexDirection="column"
        className={`${styles.default} ${styles.headsContainer}`}
      >
        <Flexbox className={styles.headsContent} flexDirection="column">
          <div className={styles.titleInnerContent}>
            <span
              dir="auto"
              className={`${styles.innerContent} ${styles.titleContent} ${styles[type]}`}
            >
              <div>
                {/* $FlowExpectedError */}
                {React.createElement(
                  component || typeComponentMapping[type],
                  {
                    id: ariaId || "",
                    className: `${styles.headElement} ${gradient ? styles.gradientElement : ""}`,
                    style: {
                      textAlign,
                      backgroundImage: gradient ?? "none",
                      color: color ? `var(${color})` : "inherit",
                    },
                  },
                  content
                )}
              </div>
            </span>
          </div>
        </Flexbox>
      </Flexbox>
    );
  }

  if (type === "bl" || type === "bd" || type === "bs")
    return (
      <Flexbox flexDirection="column" className={styles.paragraph}>
        <div className={styles.paragraphContent}>
          <span className={`${styles.innerParagraphContent} ${styles[type]}`}>
            <div
              className={`${styles.paragraphElement} ${gradient ? styles.gradientElement : ""}`}
            >
              {/* $FlowExpectedError */}
              {React.createElement(
                component || "div",
                {
                  id: ariaId || "",
                  dir: "auto",
                  style: {
                    textAlign,
                    backgroundImage: gradient ?? "none",
                    color: color ? `var(${color})` : "inherit",
                  },
                },
                content
              )}
            </div>
          </span>
        </div>
      </Flexbox>
    );

  if (
    type === "s3b" ||
    type === "s3m" ||
    type === "s3r" ||
    type === "s2b" ||
    type === "s2m" ||
    type === "s2r" ||
    type === "s1b" ||
    type === "s1m" ||
    type === "s1r" ||
    type === "s0b" ||
    type === "s0m" ||
    type === "s0r"
  )
    return (
      <Flexbox
        flexWrap="nowrap"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className={`${styles.default} ${styles.textContainer}`}
      >
        <Flexbox className={styles.textContent} flexDirection="column">
          {/* $FlowExpectedError */}
          {React.createElement(
            component || "span",
            {
              id: ariaId || "",
              dir: "auto",
              className: `${styles.innerContent} ${styles[type]} ${
                gradient ? styles.gradientElement : ""
              }`,
              style: {
                textAlign,
                backgroundImage: gradient ?? "none",
                color: color ? `var(${color})` : "inherit",
              },
            },
            content
          )}
        </Flexbox>
      </Flexbox>
    );

  return null;
}
