import BigNumber from "bignumber.js";
import { useCallback, useMemo, useState } from "react";

import { STAKING_ABI } from "constants/abi";
import { Abi, Address, encodeFunctionData } from "viem";
import { BASED_TOKEN, STAKING_ADDRESS } from "constants/tokens";

import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import {
  createTransactionCallback,
  TransactionCallbackState,
} from "@symmio/frontend-sdk/utils/web3";
import { useSupportedChainId } from "@symmio/frontend-sdk/lib/hooks/useSupportedChainId";
import { useTransactionAdder } from "@symmio/frontend-sdk/state/transactions/hooks";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useExpertMode } from "@symmio/frontend-sdk/state/user/hooks";
import { useWagmiConfig } from "@symmio/frontend-sdk/state/chains";
import { ConstructCallReturnType } from "@symmio/frontend-sdk/types/web3";
import { TransactionInfo } from "@symmio/frontend-sdk/state/transactions/types";

export enum StakeState {
  STAKE = "Stake",
  UNSTAKE = "Unstake",
}

export function useStakeToken(
  amount: string,
  activeTab: StakeState
): {
  state: TransactionCallbackState;
  callback: null | (() => Promise<any>);
  error: string | null;
} {
  const { account, chainId } = useActiveWagmi();
  const isSupportedChainId = useSupportedChainId();
  const addTransaction = useTransactionAdder();
  const addRecentTransaction = useAddRecentTransaction();
  const userExpertMode = useExpertMode();
  const wagmiConfig = useWagmiConfig();

  const functionName = activeTab === StakeState.STAKE ? "deposit" : "withdraw";

  const constructCall = useCallback(async (): ConstructCallReturnType => {
    try {
      if (!account || !chainId || !functionName || !isSupportedChainId) {
        throw new Error("Missing dependencies.");
      }
      const value = new BigNumber(amount)
        .shiftedBy(BASED_TOKEN.decimals)
        .toFixed();
      const args = [value, account];

      console.log(args);

      return {
        args,
        functionName,
        config: {
          account,
          to: STAKING_ADDRESS[chainId] as Address,
          data: encodeFunctionData({
            abi: STAKING_ABI as Abi,
            functionName,
            args,
          }),
          value: BigInt(0),
        },
      };
    } catch (error) {
      if (error && typeof error === "string") throw new Error(error);
      throw new Error("error3");
    }
  }, [account, chainId, functionName, isSupportedChainId, amount]);

  return useMemo(() => {
    if (!account || !chainId || !functionName) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: "Missing dependencies",
      };
    }

    const txInfo = {} as TransactionInfo;
    const summary = `${
      activeTab === StakeState.STAKE ? StakeState.STAKE : StakeState.UNSTAKE
    } $BASED`;

    return {
      state: TransactionCallbackState.VALID,
      error: null,
      callback: () =>
        createTransactionCallback(
          functionName,
          constructCall,
          addTransaction,
          addRecentTransaction,
          txInfo,
          wagmiConfig,
          summary,
          userExpertMode
        ),
    };
  }, [
    account,
    chainId,
    functionName,
    activeTab,
    constructCall,
    addTransaction,
    addRecentTransaction,
    wagmiConfig,
    userExpertMode,
  ]);
}

export function useClaimReward() {
  const { account, chainId } = useActiveWagmi();
  const isSupportedChainId = useSupportedChainId();
  const addTransaction = useTransactionAdder();
  const addRecentTransaction = useAddRecentTransaction();
  const userExpertMode = useExpertMode();
  const wagmiConfig = useWagmiConfig();

  const functionName = "getReward";

  const [txStatus, setTxStatus] = useState<TransactionCallbackState>(
    TransactionCallbackState.VALID
  );

  const constructCall = useCallback(async (): ConstructCallReturnType => {
    try {
      if (!account || !chainId || !functionName || !isSupportedChainId) {
        throw new Error("Missing dependencies.");
      }

      return {
        args: [],
        functionName,
        config: {
          account: account as Address,
          to: STAKING_ADDRESS[chainId] as Address,
          data: encodeFunctionData({
            abi: STAKING_ABI as Abi,
            functionName,
            args: [],
          }),
          value: BigInt(0),
        },
      };
    } catch (error) {
      if (error && typeof error === "string") throw new Error(error);
      throw new Error("error3");
    }
  }, [account, chainId, isSupportedChainId]);

  return useMemo(() => {
    if (!account || !chainId || !functionName) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: "Missing dependencies",
      };
    }

    const txInfo = {} as TransactionInfo;
    const summary = "Claimed rewards";

    return {
      state: txStatus,
      error: null,
      callback: () => {
        console.log("Transaction pending");
        setTxStatus(TransactionCallbackState.PENDING);

        return createTransactionCallback(
          functionName,
          constructCall,
          addTransaction,
          addRecentTransaction,
          txInfo,
          wagmiConfig,
          summary,
          userExpertMode
        );
      },
    };
  }, [
    account,
    chainId,
    txStatus,
    constructCall,
    addTransaction,
    addRecentTransaction,
    wagmiConfig,
    userExpertMode,
  ]);
}
