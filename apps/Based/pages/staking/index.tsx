import styled, { css } from "styled-components";

import LPStake from "components/App/Staking/LPStake";
import SingleStake from "components/App/Staking/SingleStake";

import DepositModal from "components/ReviewModal/DepositModal";
import { useModalOpen } from "@symmio/frontend-sdk/state/application/hooks";
import { ApplicationModal } from "@symmio/frontend-sdk/state/application/reducer";
import { PageLayout } from "components/styles/layout";
import Rewards from "components/App/Staking/Rewards";

const Layout = styled(PageLayout)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 405px 240px;
  justify-content: center;
  gap: 16px;

  ${({ theme }) =>
    theme.mediaWidth.upToMedium`${css`
      grid-template-columns: 1fr;
      grid-template-rows: auto 405px 280px;
    `}`}
`;

export default function StakingPage() {
  const showDepositModal = useModalOpen(ApplicationModal.DEPOSIT);

  return (
    <Layout>
      <SingleStake />
      <Rewards />
      <LPStake />
      {showDepositModal && <DepositModal />}
    </Layout>
  );
}
