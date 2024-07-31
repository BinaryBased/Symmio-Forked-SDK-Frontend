import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { useSupportedChainId } from "@symmio/frontend-sdk/lib/hooks/useSupportedChainId";
import { useWagmiConfig } from "@symmio/frontend-sdk/state/chains";
import { useTransactionAdder } from "@symmio/frontend-sdk/state/transactions/hooks";
import {
  SignMessageTransactionInfo,
  TransactionType,
} from "@symmio/frontend-sdk/state/transactions/types";
import { useExpertMode } from "@symmio/frontend-sdk/state/user/hooks";
import { ConstructCallReturnType } from "@symmio/frontend-sdk/types/web3";
import {
  createTransactionCallback,
  TransactionCallbackState,
} from "@symmio/frontend-sdk/utils/web3";
import { DIBS_ABI } from "constants/abi";
import { DIBS_REWARDER_ADDRESS } from "constants/tokens";
import { useCallback, useMemo } from "react";
import { Abi, Address, encodeFunctionData } from "viem";

export function useFillDibsRewarder(day?: number): {
  state: TransactionCallbackState;
  callback: null | (() => Promise<any>);
  error: string | null;
} {
  const { account, chainId } = useActiveWagmi();
  const addTransaction = useTransactionAdder();
  const userExpertMode = useExpertMode();
  const isSupportedChainId = useSupportedChainId();
  const addRecentTransaction = useAddRecentTransaction();
  const wagmiConfig = useWagmiConfig();

  const functionName = "fillDibsRewarder";

  const constructCall = useCallback(async (): ConstructCallReturnType => {
    try {
      if (!day || !chainId || !isSupportedChainId) {
        throw new Error("Missing dependencies.");
      }

      const args = [day];

      return {
        args,
        functionName,
        config: {
          account: account as Address,
          to: DIBS_REWARDER_ADDRESS[chainId] as Address,
          data: encodeFunctionData({
            abi: DIBS_ABI as Abi,
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
  }, [account, chainId, day, isSupportedChainId]);

  return useMemo(() => {
    if (!account || !chainId) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: "Missing dependencies",
      };
    }

    const txInfo = {
      type: TransactionType.SIGN_MESSAGE,
      text: "Dibs Rewarder Filled",
    } as SignMessageTransactionInfo;

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
    constructCall,
    addTransaction,
    addRecentTransaction,
    wagmiConfig,
    userExpertMode,
  ]);
}
