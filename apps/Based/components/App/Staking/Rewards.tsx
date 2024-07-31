import Image from "next/image";
import { useCallback, useState } from "react";
import styled, { useTheme } from "styled-components";

import useCurrencyLogo from "lib/hooks/useCurrencyLogo";
import { ApiState } from "@symmio/frontend-sdk/types/api";
import {
  formatAmount,
  formatDollarAmount,
} from "@symmio/frontend-sdk/utils/numbers";

import Column from "components/Column";
import { RowBetween } from "components/Row";
import { DotFlashing } from "components/Icons";
import { TransactionCallbackState } from "@symmio/frontend-sdk/utils/web3";
import MainButton from "components/Button/MainButton";
import { useClaimReward } from "../../../callbacks/useStakeToken";
import useTotalTradingFee from "lib/hooks/useTotalTradingFee";
import { useStakingData, useStakingValue } from "lib/hooks/useStakingData";

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.primaryPink};
`;

const FeeWrapper = styled(RowBetween)`
  height: 50px;
  font-size: 14px;
  padding: 16px 12px;
  background-color: ${({ theme }) => theme.bgPink1};
  color: ${({ theme }) => theme.primaryBlue1};
  border-bottom: 1px solid ${({ theme }) => theme.primaryPink};
`;

const MainWrapper = styled(Column)`
  height: calc(100% - 50px);
  padding: 16px 12px;
  background: ${({ theme }) => theme.pinkGradientBg};
  justify-content: space-between;
`;

const InfoWrapper = styled(Column)`
  gap: 16px;
`;

const InfoHeader = styled.span`
  color: ${({ theme }) => theme.primaryPink};
`;

const InfoRow = styled(RowBetween)`
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
  font-weight: 400;
`;

const InfoValue = styled.span<{ hasValue?: boolean }>`
  color: ${({ theme, hasValue }) => (hasValue ? theme.text0 : theme.text7)};
  font-weight: 500;
`;

const RewardWrapper = styled(Column)`
  gap: 16px;
`;

const Bar = styled(Column)`
  padding: 16px 12px;
  background-color: ${({ theme }) => theme.bgPink1};
  color: ${({ theme }) => theme.primaryPink};
  border: 1px solid ${({ theme }) => theme.primaryPink};
  gap: 8px;
`;

const BarRowWrapper = styled(RowBetween)`
  font-size: 12px;
`;

const BarValue = styled(RowBetween)`
  width: initial;
  font-size: 16px;
  font-weight: 600;
  gap: 12px;
`;

export default function Rewards() {
  return (
    <Container>
      <TradingFeeSection />
      <MainWrapper>
        <InfoSection />
        <RewardSection />
      </MainWrapper>
    </Container>
  );
}

function TradingFeeSection() {
  const { totalTradingFee, tradingFeeStatus } = useTotalTradingFee();

  return (
    <FeeWrapper>
      <span>Total Trading Fee Generated:</span>
      <span>
        {tradingFeeStatus === ApiState.LOADING ? (
          <DotFlashing />
        ) : tradingFeeStatus === ApiState.OK ? (
          `${formatAmount(totalTradingFee, 4, true)} USDbC`
        ) : (
          "- USDbC"
        )}
      </span>
    </FeeWrapper>
  );
}

function InfoSection() {
  const { totalSupply } = useStakingValue();
  const { stakedAmount } = useStakingData();

  return (
    <InfoWrapper>
      <InfoHeader>Staking Reward</InfoHeader>
      <InfoRow>
        <span>Total BASED Staked:</span>
        <InfoValue hasValue={Boolean(Number(totalSupply))}>
          {formatAmount(totalSupply, 6, true)} BASED
        </InfoValue>
      </InfoRow>
      <InfoRow>
        <span>My BASED Staked:</span>
        <InfoValue hasValue={Boolean(Number(stakedAmount))}>
          {formatAmount(stakedAmount, 6, true)} BASED
        </InfoValue>
      </InfoRow>
    </InfoWrapper>
  );
}

function RewardSection() {
  const icon = useCurrencyLogo("USDC");
  const { reward_usdbc, reward_usdc } = useStakingData();
  const flagShowUsdc = reward_usdc !== "0";
  const flagShowUsdbc = reward_usdbc !== "0";
  const flagShowRewardSection = flagShowUsdbc || flagShowUsdc;

  return (
    <RewardWrapper>
      {flagShowRewardSection && (
        <Bar>
          <BarRowWrapper>
            <span>Single Stake Reward</span>
            <Column style={{ gap: "10px" }}>
              {flagShowUsdbc && (
                <BarValue>
                  <span>{formatDollarAmount(reward_usdbc)} USDbC</span>
                  <Image
                    src={icon}
                    alt={"USDbC icon"}
                    width={"28"}
                    height={"28"}
                  />
                </BarValue>
              )}
              {flagShowUsdc && (
                <BarValue>
                  <span>{formatDollarAmount(reward_usdc)} USDC</span>

                  <Image
                    src={icon}
                    alt={"USDbC icon"}
                    width={"28"}
                    height={"28"}
                  />
                </BarValue>
              )}
            </Column>
          </BarRowWrapper>
        </Bar>
      )}
      <ClaimRewardButton
        reward_usdbc={reward_usdbc}
        reward_usdc={reward_usdc}
        disabled={!flagShowRewardSection}
      />
    </RewardWrapper>
  );
}

function ClaimRewardButton({
  reward_usdc,
  reward_usdbc,
  disabled,
}: {
  reward_usdc: string;
  reward_usdbc: string;
  disabled: boolean;
}) {
  const theme = useTheme();
  const bgColor = theme.primaryPink;
  const borderColor = theme.text0;
  const textColor = theme.bg;
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const { callback: claimCallback, state } = useClaimReward();

  const handleAction = useCallback(async () => {
    if (!claimCallback) {
      // toast.error(stakeError)
      return;
    }

    try {
      setAwaitingConfirmation(true);
      await claimCallback();
      setAwaitingConfirmation(false);
    } catch (e) {
      setAwaitingConfirmation(false);
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.error(e);
      }
    }
  }, [claimCallback]);

  if (awaitingConfirmation || state === TransactionCallbackState.PENDING) {
    return (
      <MainButton borderColor={borderColor} bgColor={bgColor} simpleMode>
        Awaiting Confirmation <DotFlashing />
      </MainButton>
    );
  }

  return (
    <MainButton
      simpleMode
      customText={`CLAIM ${
        Boolean(reward_usdbc) && reward_usdbc !== "0"
          ? formatDollarAmount(reward_usdbc) + " USDbC"
          : ""
      } ${
        Boolean(reward_usdc) && reward_usdc !== "0"
          ? formatDollarAmount(reward_usdc) + " USDC"
          : ""
      } `}
      bgColor={bgColor}
      borderColor={borderColor}
      textColor={textColor}
      onClick={handleAction}
      disabled={disabled}
    />
  );
}
