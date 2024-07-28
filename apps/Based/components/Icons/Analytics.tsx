import React from "react";

export default function Analytics({
  width = 28,
  height = 18,
  ...rest
}: {
  width?: number;
  height?: number;
  [x: string]: any;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect
        x="1"
        y="9"
        width="6"
        height="8"
        fill="#123378"
        stroke="#123378"
        strokeWidth="2"
      />
      <rect
        x="11"
        y="4"
        width="6"
        height="13"
        fill="#123378"
        stroke="#123378"
        strokeWidth="2"
      />
      <rect
        x="21"
        y="1"
        width="6"
        height="16"
        fill="#6092F2"
        stroke="#123378"
        strokeWidth="2"
      />
    </svg>
  );
}
