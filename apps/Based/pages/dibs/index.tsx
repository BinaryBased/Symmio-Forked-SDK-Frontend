import { useState } from "react";
import styled from "styled-components";

import { Row } from "components/Row";
import Header from "components/App/Dibs/header";
import Rewards from "components/App/Dibs/Rewards";
import Leaderboard from "components/App/Dibs/Leaderboard";

import DepositModal from "components/ReviewModal/DepositModal";
import { PageLayout } from "components/styles/layout";
import { useModalOpen } from "@symmio/frontend-sdk/state/application/hooks";
import { ApplicationModal } from "@symmio/frontend-sdk/state/application/reducer";

const TabsWrapper = styled(Row)`
  padding: 16px 0;
`;

const Tab = styled.button<{ active?: boolean }>`
  width: 50%;
  height: 40px;
  background-color: ${({ theme, active }) => (active ? theme.bg4 : theme.bg1)};
  border: 1px solid ${({ theme }) => theme.border1};
  text-align: center;
  font-weight: 500;

  &:hover {
    cursor: ${({ active }) => (active ? "auto" : "pointer")};
  }
`;

export default function Dibs() {
  const showDepositModal = useModalOpen(ApplicationModal.DEPOSIT);
  const [isInMyRewardsPage, setIsInMyRewardsPage] = useState(false);

  return (
    <PageLayout>
      <Header />
      <TabsWrapper>
        <Tab
          active={isInMyRewardsPage}
          onClick={() => {
            !isInMyRewardsPage && setIsInMyRewardsPage(true);
          }}
        >
          My Rewards
        </Tab>
        <Tab
          active={!isInMyRewardsPage}
          onClick={() => {
            isInMyRewardsPage && setIsInMyRewardsPage(false);
          }}
        >
          Leaderboard
        </Tab>
      </TabsWrapper>
      {isInMyRewardsPage ? <Rewards /> : <Leaderboard />}
      {showDepositModal && <DepositModal />}
    </PageLayout>
  );
}
