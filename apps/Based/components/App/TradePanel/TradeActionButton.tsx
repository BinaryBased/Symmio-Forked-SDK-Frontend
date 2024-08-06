import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { ErrorStateMessages } from "types/trade";
import { calculateString } from "utils/calculationalString";

import { toBN } from "@symmio/frontend-sdk/utils/numbers";
import { TransactionStatus } from "@symmio/frontend-sdk/utils/web3";
import { useToggleOpenPositionModal } from "@symmio/frontend-sdk/state/application/hooks";
import { useWebSocketStatus } from "@symmio/frontend-sdk/state/hedger/hooks";
import {
  useSetLimitPrice,
  useActiveMarket,
  useSetTypedValue,
  useTpSlDelegate,
  useTradeTpSl,
  usePositionType,
} from "@symmio/frontend-sdk/state/trade/hooks";
import { useIsHavePendingTransaction } from "@symmio/frontend-sdk/state/transactions/hooks";
import useTradePage from "@symmio/frontend-sdk/hooks/useTradePage";
import { DEFAULT_PRECISION } from "@symmio/frontend-sdk/constants/misc";
import { InputField, PositionType } from "@symmio/frontend-sdk/types/trade";
import { ConnectionStatus } from "@symmio/frontend-sdk/types/api";
import {
  useUserWhitelist,
  useIsTermsAccepted,
  useAccountPartyAStat,
  useActiveAccountAddress,
} from "@symmio/frontend-sdk/state/user/hooks";
import { WEB_SETTING } from "@symmio/frontend-sdk/config";
import { useTpSlDelegateAccesses } from "@symmio/frontend-sdk/callbacks/useDelegateAccesses";

import { MainButton } from "components/Button";
import ErrorButton from "components/Button/ErrorButton";
import AnimatedButton from "components/Button/MainButton";
import { DotFlashing } from "components/Icons";
import {
  ContextError,
  InvalidContext,
  useInvalidContext,
} from "components/InvalidContext";

export default function TradeActionButtons(): JSX.Element | null {
  const validatedContext = useInvalidContext();
  const market = useActiveMarket();
  const connectionStatus = useWebSocketStatus();
  const account = useActiveAccountAddress();

  const toggleShowTradeInfoModal = useToggleOpenPositionModal();
  const isPendingTxs = useIsHavePendingTransaction();
  const positionType = usePositionType();
  const { tp, sl } = useTradeTpSl();
  const delegateStatus = useTpSlDelegate();
  const [delegateLoading, setDelegateLoading] = useState(false);
  const [calculationMode, setCalculationMode] = useState(false);
  const [calculationLoading, setCalculationLoading] = useState(false);

  const setLimitPrice = useSetLimitPrice();
  const setTypedValue = useSetTypedValue();
  const userWhitelisted = useUserWhitelist();
  const isAcceptTerms = useIsTermsAccepted();
  const { allocatedBalance } = useAccountPartyAStat(account);

  const { formattedAmounts, state, balance } = useTradePage();

  // const pricePrecision = useMemo(
  //   () => (market ? market.pricePrecision : DEFAULT_PRECISION),
  //   [market]
  // );

  const [outputTicker, pricePrecision] = useMemo(
    () =>
      market ? [market.symbol, market.pricePrecision] : ["", DEFAULT_PRECISION],
    [market]
  );
  const { setDelegateAccessCallBack, error } = useTpSlDelegateAccesses();

  const handleDelegateAccess = useCallback(async () => {
    if (error) console.debug({ error });
    if (!setDelegateAccessCallBack) return;

    setDelegateLoading(true);
    const { status, message } = await setDelegateAccessCallBack();
    if (status !== TransactionStatus.SUCCESS) {
      toast.error(message);
      setDelegateLoading(false);
    }
  }, [error, setDelegateAccessCallBack]);

  function onEnterPress() {
    setCalculationLoading(true);
    setCalculationMode(false);
    const result = calculateString(
      formattedAmounts[0],
      balance,
      pricePrecision,
      "1"
    );
    setTypedValue(result, InputField.PRICE);
    setCalculationLoading(false);
  }
  //reset amounts when user switches to another orderType or market
  useEffect(() => {
    setLimitPrice("");
    setTypedValue("", InputField.PRICE);
  }, [market]); // eslint-disable-line react-hooks/exhaustive-deps
  if (validatedContext !== ContextError.VALID) {
    return <InvalidContext />;
  }

  if (WEB_SETTING.showSignModal && !isAcceptTerms) {
    return (
      <AnimatedButton disabled={true} customText={"Accept Terms of Service"} />
    );
  }

  if (!delegateStatus && (tp || sl)) {
    return (
      <MainButton onClick={handleDelegateAccess} disabled={delegateLoading}>
        Allow to place TP/SL orders {delegateLoading && <DotFlashing />}
      </MainButton>
    );
  }

  if (market?.rfqAllowed === false) {
    return (
      <AnimatedButton
        disabled
        exclamationMark
        customText="RFQ is not allowed for this market"
      />
    );
  }

  if (calculationLoading) {
    return (
      <MainButton disabled>
        Waiting for Calculation
        <DotFlashing />
      </MainButton>
    );
  }
  if (isPendingTxs) {
    return (
      <MainButton disabled>
        Transacting <DotFlashing />
      </MainButton>
    );
  }

  if (calculationMode) {
    return <MainButton onClick={onEnterPress}>Calculate Amount</MainButton>;
  }

  if (toBN(allocatedBalance).lte(0)) {
    return (
      <MainButton disabled>
        Deposit to {positionType === PositionType.LONG ? "Long" : "Short"}{" "}
        {outputTicker}
      </MainButton>
    );
  }

  if (connectionStatus !== ConnectionStatus.OPEN) {
    return (
      <AnimatedButton
        disabled={true}
        exclamationMark={true}
        customText={"Hedger disconnected"}
      />
    );
  }

  if (state) {
    return (
      <AnimatedButton
        disabled={true}
        exclamationMark={true}
        customText={ErrorStateMessages[state]}
      />
    );
  }

  if (userWhitelisted === false) {
    return (
      <ErrorButton
        state={state}
        disabled={true}
        exclamationMark={true}
        customText={"You are not whitelisted"}
      />
    );
  }

  return (
    <AnimatedButton ticker={outputTicker} onClick={toggleShowTradeInfoModal} />
  );
}
