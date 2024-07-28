import React from "react";

export default function Client({
  width = 18,
  height = 20,
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
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="9" cy="5" r="4" stroke="#0A2357" strokeWidth="2" />
      <rect y="13" width="18" height="7" fill="#0A2357" />
    </svg>
  );
}
