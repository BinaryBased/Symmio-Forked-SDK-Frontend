import { useCallback, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import Image from "next/image";

import Vector from "/public/static/images/staking/Vector.svg";
import SingleStakeTitle from "/public/static/images/staking/SingleStake.svg";
import Cash from "/public/static/images/staking/Cash.svg";
import Lovely from "/public/static/images/staking/Lovely.svg";
import RectangleFading from "/public/static/images/staking/RectangleFading.svg";

import { tryParseAmount } from "utils/parse";
import useCurrencyLogo from "lib/hooks/useCurrencyLogo";

import { Tab } from "components/Tab";
import Column from "components/Column";
import { InputBox } from "components/InputBox";
import { DotFlashing } from "components/Icons";
import MainButton from "components/Button/MainButton";
import { SupportedChainId } from "@symmio/frontend-sdk/constants";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { useStakeToken } from "../../../callbacks/useStakeToken";
import { useApproveCallback } from "@symmio/frontend-sdk/lib/hooks/useApproveCallback";
import { ApprovalState } from "@symmio/frontend-sdk/lib/hooks/useApproval";
import { formatAmount, toBN } from "@symmio/frontend-sdk/utils/numbers";
import { useCurrencyBalance } from "@symmio/frontend-sdk/lib/hooks/useCurrencyBalance";
import {
  useBasedPrice,
  useStakingData,
  useStakingValue,
} from "lib/hooks/useStakingData";
import { BASED_TOKEN, STAKING_ADDRESS } from "constants/tokens";

const Container = styled.div`
  padding: 16px;
  position: relative;
  background: ${({ theme }) => theme.primaryGradientBg};
  border: 1px solid ${({ theme }) => theme.border1};
`;

const PlainWrapper = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const HeaderTitle = styled(Column)`
  position: relative;
  align-items: center;
  gap: 8px;

  color: ${({ theme }) => theme.text2};
  font-size: 14px;
  margin-bottom: 35px;
  z-index: 9;
`;

const APRWrapper = styled.div`
  position: relative;
  height: 60px;
  text-align: center;
`;

const APRText = styled.div<{ fading?: boolean }>`
  position: absolute;
  bottom: ${({ fading }) => (fading ? "43px" : "8px")};
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme, fading }) =>
    fading ? theme.lightPink : theme.primaryPink};
  font-size: ${({ fading }) => (fading ? "20px" : "24px")};
`;

const LovelySkeleton = styled.div`
  position: absolute;
  left: 30px;
  top: 99px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    top: 114px;
  `}
`;

const CashSkeleton = styled.div`
  position: absolute;
  right: 20px;
  top: 96px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    top: 111px;
  `}
`;

const TabWrapper = styled.div`
  margin: 14px 0 12px;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

export enum StakeState {
  STAKE = "Stake",
  UNSTAKE = "Unstake",
}

export default function SingleStake() {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState<StakeState>(StakeState.STAKE);
  const { stakedAmount } = useStakingData();

  const text = activeTab === StakeState.STAKE ? "Balance:" : "Staked Amount:";
  return (
    <Container>
      <Header />
      <TabWrapper>
        <Tab
          tabOptions={[StakeState.STAKE, StakeState.UNSTAKE]}
          activeOption={activeTab}
          onChange={(option: string) => {
            setActiveTab(option as StakeState);
          }}
          outerBorder
        />
      </TabWrapper>
      <InputWrapper>
        <InputBox
          title="Stake Amount"
          value={value}
          currency={BASED_TOKEN}
          symbolColor={theme.primaryPink}
          onChange={(newValue: string) => {
            setValue(newValue);
          }}
          max={true}
          autoFocus={true}
          balanceTitle={text}
          balance={activeTab === StakeState.UNSTAKE ? stakedAmount : undefined}
        />
      </InputWrapper>
      <StakeButton
        value={value}
        activeTab={activeTab}
        onSuccess={() => setValue("")}
      />
    </Container>
  );
}

function StakeButton({
  value,
  activeTab,
  onSuccess,
}: {
  value: string;
  activeTab: StakeState;
  onSuccess: () => void;
}) {
  const theme = useTheme();
  const { account } = useActiveWagmi();
  const BASED_LOGO = useCurrencyLogo("BASED");
  const { stakedAmount } = useStakingData();
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const borderColor = theme.text0;
  const bgColor = theme.hoverLong;
  const spender = STAKING_ADDRESS[SupportedChainId.BASE];

  const { callback: stakeCallback } = useStakeToken(value, activeTab);

  const basedBalance = useCurrencyBalance(account ?? undefined, BASED_TOKEN);

  const inputAmount = useMemo(() => {
    return tryParseAmount(value, BASED_TOKEN || undefined);
  }, [value]);

  const insufficientBalance = useMemo(() => {
    if (!inputAmount) return false;
    if (activeTab === StakeState.STAKE)
      return basedBalance?.lessThan(inputAmount);
    else return toBN(stakedAmount).isLessThan(value);
  }, [activeTab, basedBalance, inputAmount, stakedAmount, value]);

  const [approvalState, approveCallback] = useApproveCallback(
    BASED_TOKEN,
    value ?? "0",
    spender
  );
  const [showApprove, showApproveLoader] = useMemo(() => {
    const show =
      BASED_TOKEN &&
      approvalState !== ApprovalState.APPROVED &&
      !!value &&
      activeTab === StakeState.STAKE;
    return [show, show && approvalState === ApprovalState.PENDING];
  }, [activeTab, approvalState, value]);

  const handleAction = useCallback(async () => {
    if (!stakeCallback) {
      return;
    }

    try {
      setAwaitingConfirmation(true);
      await stakeCallback();
      setAwaitingConfirmation(false);
      onSuccess();
    } catch (e) {
      setAwaitingConfirmation(false);
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.error(e);
      }
    }
  }, [stakeCallback]);

  const handleApprove = async () => {
    try {
      setAwaitingConfirmation(true);
      const result = await approveCallback();
      console.log(result);

      // if (result) {
      //   const waitResult = await result.wait();
      //   if (waitResult.status === 1) {
      //     handleAction();
      //     return;
      //   }
      // }

      setAwaitingConfirmation(false);
    } catch (err) {
      console.error(err);
      setAwaitingConfirmation(false);
    }
  };

  if (awaitingConfirmation) {
    return (
      <MainButton borderColor={borderColor} bgColor={bgColor} icon={BASED_LOGO}>
        Awaiting Confirmation <DotFlashing />
      </MainButton>
    );
  }

  if (insufficientBalance)
    return <MainButton disabled>Insufficient Balance</MainButton>;

  if (showApproveLoader) {
    return (
      <MainButton borderColor={borderColor} bgColor={bgColor} icon={BASED_LOGO}>
        Approving <DotFlashing />
      </MainButton>
    );
  }

  if (showApprove) {
    return (
      <MainButton
        onClick={handleApprove}
        borderColor={borderColor}
        bgColor={bgColor}
        customText="Approve and Stake BASED"
        icon={BASED_LOGO}
      />
    );
  }

  return (
    <MainButton
      onClick={handleAction}
      borderColor={borderColor}
      bgColor={bgColor}
      customText={
        activeTab === StakeState.STAKE ? "Stake BASED" : "Unstake BASED"
      }
      icon={BASED_LOGO}
    />
  );
}

function Header() {
  return (
    <div>
      <Plain />
      <HeaderTitle>
        <Image src={SingleStakeTitle} alt={"Single Stake"} />
        <span>Stake BASED to earn based.markets trading fees in USDbC!</span>
      </HeaderTitle>
      <LovelySkeleton>
        <Image src={Lovely} alt={"Skeleton with heart in eyes"} />
      </LovelySkeleton>
      <CashSkeleton>
        <Image src={Cash} alt={"Skeleton with Dollar in eyes"} />
      </CashSkeleton>
      <APR />
    </div>
  );
}

function Plain() {
  return (
    <PlainWrapper>
      <Image src={Vector} alt="background vector" layout="responsive" />
    </PlainWrapper>
  );
}

function APR() {
  const { basedPrice } = useBasedPrice();
  const { rewardRate_usdbc, rewardRate_usdc, totalSupply } = useStakingValue();
  const aprValue_usdbc = toBN(rewardRate_usdbc)
    .times(31536000)
    .div(toBN(totalSupply).times(basedPrice))
    .times(100);
  const aprValue_usdc = toBN(rewardRate_usdc)
    .times(31536000)
    .div(toBN(totalSupply).times(basedPrice))
    .times(100);
  const aprValue = aprValue_usdbc.plus(aprValue_usdc);

  return (
    <APRWrapper>
      <Image src={RectangleFading} alt={"fading rectangle"} />
      <APRText fading>
        APR: {!aprValue.isNaN() ? `${formatAmount(aprValue, 4, true)}%` : "0"}
      </APRText>
      <APRText>
        APR: {!aprValue.isNaN() ? `${formatAmount(aprValue, 4, true)}%` : "0"}
      </APRText>
    </APRWrapper>
  );
}
