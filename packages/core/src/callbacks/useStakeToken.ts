import { useCallback, useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import useActiveWagmi from "../lib/hooks/useActiveWagmi";
import {
  createTransactionCallback,
  TransactionCallbackState,
} from "../utils/web3";
import { useSupportedChainId } from "../lib/hooks/useSupportedChainId";
import { useTransactionAdder } from "../state/transactions/hooks";
import { useExpertMode } from "../state/user/hooks";
import { BASED_TOKEN, STAKING_ABI, STAKING_ADDRESS } from "../constants";
import {
  ClaimTransactionInfo,
  StakeTransactionInfo,
  TransactionType,
} from "../state/transactions/types";
import { Abi, Address, encodeFunctionData } from "viem";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useWagmiConfig } from "../state/chains";
import { ConstructCallReturnType } from "../types/web3";

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

  const constructCall = useCallback((): ConstructCallReturnType => {
    try {
      if (!account || !chainId || !functionName || !isSupportedChainId) {
        throw new Error("Missing dependencies.");
      }
      const value = new BigNumber(amount)
        .shiftedBy(BASED_TOKEN.decimals)
        .toFixed();
      const args = [BigInt(value), account as Address];

      console.log(args);

      return {
        args,
        functionName,
        config: {
          account: account as Address,
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

    const txInfo = {
      type: TransactionType.STAKE,
      action: activeTab,
      amount,
    } as StakeTransactionInfo;

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
          undefined,
          userExpertMode
        ),
    };
  }, [
    account,
    chainId,
    functionName,
    activeTab,
    amount,
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

  const constructCall = useCallback((): ConstructCallReturnType => {
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

    const txInfo = {
      type: TransactionType.CLAIM,
    } as ClaimTransactionInfo;

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
          undefined,
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
