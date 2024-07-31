import styled from "styled-components";
import { RowCenter, RowStart } from "components/Row";
import { lighten } from "polished";

export const TabWrapper = styled(RowCenter)<{ outerBorder?: boolean }>`
  gap: 1px;
  width: unset;
  font-size: 16px;
  font-weight: 400;
  overflow: hidden;
  color: ${({ theme }) => theme.text0};
  border-bottom: 1px solid ${({ theme }) => theme.border1};
  background: ${({ theme }) => theme.border1};

  ${({ outerBorder, theme }) =>
    outerBorder &&
    `
    border: 1px solid ${theme.border1};
  `}
`;

export const TabButton = styled(RowCenter)<{ active: boolean }>`
  width: 100%;
  height: 40px;
  position: relative;
  text-align: center;
  overflow: hidden;
  font-weight: ${({ active }) => (active ? 500 : 400)};
  color: ${({ active, theme }) => (active ? theme.text0 : theme.text4)};
  background: ${({ active, theme }) => (active ? theme.bg3 : theme.bg1)};

  &:hover {
    cursor: ${({ active }) => (active ? "default" : "pointer")};
    background: ${({ active, theme }) =>
      active ? theme.bg3 : lighten(0.02, theme.bg1)};
  }
`;

export const Option = styled.div<{ active?: boolean }>`
  width: fit-content;
  color: ${({ theme }) => theme.text1};
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  padding: 4px 0px 8px 0px;

  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.green1};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
  &:hover {
    cursor: pointer;
    color: ${({ theme, active }) => (active ? theme.gradLight : theme.text1)};
  }
`;

export function Tab({
  tabOptions,
  activeOption,
  outerBorder,
  onChange,
}: {
  tabOptions: string[];
  activeOption: string;
  outerBorder?: boolean;
  onChange: (tab: string) => void;
}): JSX.Element {
  return (
    <TabWrapper outerBorder={outerBorder}>
      {tabOptions.map((tab, i) => (
        <TabButton
          key={i}
          active={tab === activeOption}
          onClick={() => onChange(tab)}
        >
          {tab}
        </TabButton>
      ))}
    </TabWrapper>
  );
}

export function TabModal({
  tabOptions,
  activeOption,
  onChange,
  ...rest
}: {
  tabOptions: string[];
  activeOption: string;
  onChange: (tab: string) => void;
  [x: string]: any;
}): JSX.Element {
  return (
    <TabWrapper width={"100%"} justifyContent={"space-between"} {...rest}>
      {tabOptions.map((tab, i) => (
        <TabButton
          key={i}
          active={tab === activeOption}
          onClick={() => onChange(tab)}
        >
          <div>{tab}</div>
        </TabButton>
      ))}
    </TabWrapper>
  );
}

export function GradientTabs({
  tabOptions,
  activeOption,
  onChange,
}: {
  tabOptions: string[];
  activeOption: string;
  onChange: (tab: string) => void;
}) {
  return (
    <RowStart style={{ gap: "16px" }}>
      {tabOptions.map((option, index) => (
        <Option
          key={index}
          active={option === activeOption}
          onClick={() => onChange(option)}
        >
          {option}
        </Option>
      ))}
    </RowStart>
  );
}

export function TabModalJSX({
  tabOptions,
  activeOption,
  onChange,
  outerBorder,
  ...rest
}: {
  tabOptions: { label: string; content: string | JSX.Element }[];
  activeOption: string;
  onChange: (tab: string) => void;
  outerBorder?: boolean;
  [x: string]: any;
}): JSX.Element {
  return (
    <TabWrapper
      width={"100%"}
      justifyContent={"space-between"}
      outerBorder={outerBorder}
      {...rest}
    >
      {tabOptions.map((tab, i) => (
        <TabButton
          key={i}
          active={tab.label === activeOption}
          onClick={() => onChange(tab.label)}
        >
          <div>{tab.content}</div>
        </TabButton>
      ))}
    </TabWrapper>
  );
}
