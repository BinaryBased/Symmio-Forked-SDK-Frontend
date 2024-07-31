import styled from "styled-components";

import { BaseButton } from "components/Button";
import { useCallback } from "react";
import { lighten } from "polished";

export const GradientButtonWrapper = styled(BaseButton)`
  padding: 1px;
  height: 40px;
  background: ${({ theme }) => theme.primaryPink};

  ${({ disabled }) =>
    disabled &&
    `
      cursor: default;
      opacity: 50%;

  `}
`;

export const GradientColorButton = styled(BaseButton)`
  height: 100%;
  background: ${({ theme }) => theme.bgPink1};

  &:focus,
  &:hover,
  &:active {
    background: ${({ theme }) => lighten(0.03, theme.bgPink1)};
    cursor: ${({ disabled }) => !disabled && "pointer"};
  }

  ${({ disabled }) =>
    disabled &&
    `
      cursor: default;

  `}
`;

export const GradientButtonLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.primaryPink};
`;

export default function GradientButton({
  label,
  onClick,
  children,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}): JSX.Element {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) onClick();
  }, [disabled, onClick]);

  return (
    <GradientButtonWrapper disabled={disabled}>
      <GradientColorButton onClick={handleClick} disabled={disabled}>
        <GradientButtonLabel>{label}</GradientButtonLabel>
        <div>{children}</div>
      </GradientColorButton>
    </GradientButtonWrapper>
  );
}
