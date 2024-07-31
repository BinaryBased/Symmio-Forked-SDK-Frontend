import { useCallback, useMemo } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { Abi, Address, encodeFunctionData } from "viem";

import { DIBS_ABI } from "constants/abi";
import { DIBS_REWARDER_ADDRESS } from "constants/tokens";

import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { useWagmiConfig } from "@symmio/frontend-sdk/state/chains";
import { useExpertMode } from "@symmio/frontend-sdk/state/user/hooks";
import { MuonVerificationData } from "types/dibs";
import { ConstructCallReturnType } from "@symmio/frontend-sdk/types/web3";
import {
  createTransactionCallback,
  TransactionCallbackState,
} from "@symmio/frontend-sdk/utils/web3";
import { useTransactionAdder } from "@symmio/frontend-sdk/state/transactions/hooks";
import { useSupportedChainId } from "@symmio/frontend-sdk/lib/hooks/useSupportedChainId";
import { TransactionInfo } from "@symmio/frontend-sdk/state/transactions/types";

export default function useDibsClaim(): {
  state: TransactionCallbackState;
  callback: null | ((verification: MuonVerificationData) => Promise<any>);
  error: string | null;
} {
  const { account, chainId } = useActiveWagmi();
  const wagmiConfig = useWagmiConfig();
  const isSupportedChainId = useSupportedChainId();
  const addRecentTransaction = useAddRecentTransaction();
  const addTransaction = useTransactionAdder();
  const userExpertMode = useExpertMode();

  const functionName = "claim";

  const constructCall = useCallback(
    async (
      muonVerificationData: MuonVerificationData
    ): ConstructCallReturnType => {
      try {
        console.log("muonVerificationData2", muonVerificationData);
        if (!isSupportedChainId || !muonVerificationData || !chainId) {
          throw new Error("Missing dependencies.");
        }

        const args = [
          BigInt(muonVerificationData.result.data.result.day),
          BigInt(muonVerificationData.result.data.result.userVolume),
          BigInt(muonVerificationData.result.data.result.totalVolume),
          BigInt(muonVerificationData.result.data.timestamp),
          muonVerificationData.result.reqId as Address,
          {
            signature: muonVerificationData.result.signatures[0]
              .signature as Address,
            owner: muonVerificationData.result.signatures[0].owner as Address,
            nonce: muonVerificationData.result.data.init
              .nonceAddress as Address,
          },
          muonVerificationData.result.shieldSignature as Address,
        ];

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
    },
    [account, chainId, isSupportedChainId]
  );

  return useMemo(() => {
    if (!account) {
      return {
        state: TransactionCallbackState.INVALID,
        callback: null,
        error: "Missing dependencies",
      };
    }

    const txInfo = {} as TransactionInfo;
    const summary = "Claimed rewards";

    return {
      state: TransactionCallbackState.VALID,
      error: null,
      callback: (verification: MuonVerificationData) =>
        createTransactionCallback(
          functionName,
          () => constructCall(verification),
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
    addTransaction,
    addRecentTransaction,
    wagmiConfig,
    userExpertMode,
    constructCall,
  ]);
}
