import styled from "styled-components";

import { RowCenter, RowStart } from "components/Row";
import { darken } from "polished";

export enum StateTabs {
  POSITIONS = "Positions",
  OPEN_ORDERS = "Open Orders",
  INSTANT_OPEN_ORDERS = "Instant Open Orders",
  ORDER_HISTORY = "Order History",
}

const TabWrapper = styled(RowStart)`
  margin-bottom: 8px;
`;
const TabButton = styled(RowCenter)<{ active: boolean }>`
  font-size: 16px;
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  padding: 16px;
  color: ${({ active, theme }) => (active ? theme.text0 : theme.text4)};

  &:hover {
    cursor: pointer;
    color: ${({ theme, active }) =>
      active ? theme.text0 : darken(0.3, theme.text0)};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 12px;
  `}

  ${({ theme, active }) => theme.mediaWidth.upToMedium`
    flex: 1;
    background: ${active ? theme.bg3 : theme.bg1};
  `};
`;

export default function OrdersTab({
  activeTab,
  setActiveTab,
  positionsCount,
  openOrdersCount,
  instantOpenOrdersCount,
}: {
  activeTab: StateTabs;
  setActiveTab(s: StateTabs): void;
  positionsCount: number;
  openOrdersCount: number;
  instantOpenOrdersCount: number;
}): JSX.Element | null {
  return (
    <TabWrapper>
      <TabButton
        active={activeTab === StateTabs.POSITIONS}
        onClick={() => setActiveTab(StateTabs.POSITIONS)}
      >
        {StateTabs.POSITIONS}{" "}
        {positionsCount > 0 ? `(${positionsCount})` : null}
      </TabButton>

      <TabButton
        active={activeTab === StateTabs.OPEN_ORDERS}
        onClick={() => setActiveTab(StateTabs.OPEN_ORDERS)}
      >
        {StateTabs.OPEN_ORDERS}{" "}
        {openOrdersCount > 0 ? `(${openOrdersCount})` : null}
      </TabButton>
      <TabButton
        active={activeTab === StateTabs.INSTANT_OPEN_ORDERS}
        onClick={() => setActiveTab(StateTabs.INSTANT_OPEN_ORDERS)}
      >
        {StateTabs.INSTANT_OPEN_ORDERS}{" "}
        {instantOpenOrdersCount > 0 ? `(${instantOpenOrdersCount})` : null}
      </TabButton>
      <TabButton
        active={activeTab === StateTabs.ORDER_HISTORY}
        onClick={() => setActiveTab(StateTabs.ORDER_HISTORY)}
      >
        {StateTabs.ORDER_HISTORY}
      </TabButton>
    </TabWrapper>
  );
}
