import React from "react";

export const Wallet = ({
  size = 20,
  ...rest
}: {
  size?: number;
  [x: string]: any;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect
        x="1"
        y="1"
        width="18"
        height="18"
        rx="1"
        stroke="#0A2357"
        strokeWidth="2"
        strokeMiterlimit="16"
      />
      <rect
        opacity="0.7"
        x="13"
        y="7"
        width="6"
        height="6"
        stroke="#0A2357"
        strokeWidth="2"
        strokeMiterlimit="16"
      />
    </svg>
  );
};
