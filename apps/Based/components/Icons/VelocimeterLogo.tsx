export default function VelocimeterLogo({
  width = 19,
  height = 16,
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
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        id="Subtract"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 0H15.9509L9.56223 6.03544L2.94542 0H0L9.56223 16L19 0ZM4.68777 3.48354L9.56223 11.7063L14.4159 3.48354L9.56223 6.27848L4.68777 3.48354Z"
        fill="#345F59"
      />
    </svg>
  );
}
