import Image from "next/image";
import { Z_INDEX } from "theme";
import { useCallback, useState } from "react";
import styled, { useTheme } from "styled-components";

import { RowCenter } from "components/Row";
import { ToolTipLeft } from "components/ToolTip";
import { ExclamationMark, LongArrow, ShortArrow } from "components/Icons";

import { usePositionType } from "@symmio/frontend-sdk/state/trade/hooks";
import { PositionType } from "@symmio/frontend-sdk/types/trade";
import { titleCase } from "@symmio/frontend-sdk/utils/string";

const Main = styled(RowCenter)`
  width: 100%;
  height: 48px;
  cursor: pointer;
  position: relative;
`;

const TopWrap = styled(RowCenter)<{
  clicked: boolean;
  textColor?: string;
  bgColor: string;
  borderColor?: string;
  longOrShort: boolean;
  disabled?: boolean;
}>`
  font-size: 14px;
  font-weight: 700;
  height: 100%;
  position: relative;
  z-index: ${Z_INDEX.deprecated_content};
  border: 2px solid
    ${({ theme, borderColor, longOrShort }) =>
      borderColor ?? (longOrShort ? theme.darkPink : theme.border1)};
  color: ${({ theme, textColor }) => textColor ?? theme.text0};
  background: ${({ bgColor }) => bgColor};

  transition: width, transform 0ms ease-in-out;

  ${({ clicked, disabled }) =>
    clicked &&
    !disabled &&
    `
    width: calc(100% - 12px);
    transform: translateY(2px);
  `}

  ${({ theme, disabled }) =>
    disabled &&
    `
      background: ${theme.bg2};
      border-color: ${theme.disableColor};
      color: ${theme.disableColor};
  `}
`;

const SubWrap = styled.div<{ longOrShort: boolean; disabled?: boolean }>`
  height: 52px;
  margin-top: 4px;
  position: absolute;
  width: calc(100% - 8px);
  background: ${({ theme, longOrShort }) =>
    longOrShort ? theme.darkPink : theme.border1};

  ${({ theme, disabled }) =>
    disabled &&
    `
      background: ${theme.disableColor};
  `}
`;

const IconWrap = styled.div<{ top: string }>`
  position: absolute;
  right: 16px;
  top: ${({ top }) => top ?? "14px"};
`;

export default function MainButton({
  onClick,
  ticker,
  textColor,
  bgColor,
  borderColor,
  tooltip,
  exclamationMark,
  customText,
  icon,
  disabled,
  simpleMode,
  children,
}: {
  onClick?: () => void;
  ticker?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  tooltip?: string;
  customText?: string;
  exclamationMark?: boolean;
  icon?: string | null;
  disabled?: boolean;
  simpleMode?: boolean;
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  const positionType = usePositionType();
  const [isClicked, setIsClicked] = useState(false);
  const longOrShort = positionType === PositionType.SHORT;

  const handleOnMouseDown = useCallback(() => {
    setIsClicked((prev) => !prev);
  }, []);

  const handleOnMouseUp = useCallback(() => {
    setIsClicked((prev) => !prev);
    setTimeout(() => {
      if (!disabled && onClick) onClick();
    }, 150);
  }, [disabled, onClick]);

  return (
    <Main onMouseDown={handleOnMouseDown} onMouseUp={handleOnMouseUp}>
      <TopWrap
        clicked={isClicked}
        textColor={textColor}
        bgColor={bgColor ?? (longOrShort ? theme.hoverShort : theme.hoverLong)}
        borderColor={borderColor}
        longOrShort={longOrShort}
        disabled={disabled}
      >
        {ticker && `${titleCase(positionType)} ${ticker}`}
        {customText && customText}
        {children}

        {!disabled && !simpleMode ? (
          <IconWrap top={icon ? "10px" : "14px"}>
            {icon ? (
              <Image src={icon} alt={"icon"} />
            ) : positionType === PositionType.LONG ? (
              <LongArrow
                width={19}
                height={11}
                color={"#1A70FD"}
                style={{ marginLeft: "8px" }}
              />
            ) : (
              <ShortArrow
                width={19}
                height={11}
                color={"#E75A0B"}
                style={{ marginLeft: "8px" }}
              />
            )}
          </IconWrap>
        ) : (
          <IconWrap top={"14px"}>
            {tooltip && (
              <a data-tip data-for={"tooltip"}>
                <ExclamationMark />
                <ToolTipLeft id={"tooltip"} aria-haspopup="true">
                  {customText}
                </ToolTipLeft>
              </a>
            )}
            {!tooltip && exclamationMark && <ExclamationMark />}
          </IconWrap>
        )}
      </TopWrap>
      <SubWrap longOrShort={longOrShort} disabled={disabled} />
    </Main>
  );
}
