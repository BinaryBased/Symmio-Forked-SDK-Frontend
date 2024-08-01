import { SupportedChainId } from "@symmio/frontend-sdk/constants";
import { useSingleContractMultipleMethods } from "@symmio/frontend-sdk/lib/hooks/multicall";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import useDebounce from "@symmio/frontend-sdk/lib/hooks/useDebounce";
import { useSupportedChainId } from "@symmio/frontend-sdk/lib/hooks/useSupportedChainId";
import { useUSDCAddress } from "@symmio/frontend-sdk/state/chains";
import { getSingleWagmiResult } from "@symmio/frontend-sdk/utils/multicall";
import { fromWei } from "@symmio/frontend-sdk/utils/numbers";
import { QUOTER_V2_ABI, STAKING_ABI } from "constants/abi";
import { FALLBACK_CHAIN_ID } from "constants/chains/chains";
import {
  QUOTER_V2_ADDRESS,
  STAKING_ADDRESS,
  USDBC_ADDRESS,
} from "constants/tokens";

export function useStakingData(): {
  stakedAmount: string;
  reward_usdc: string;
  reward_usdbc: string;
} {
  const { account, chainId } = useActiveWagmi();
  const isSupportedChainId = useSupportedChainId();

  const USDC_ADDRESS = useUSDCAddress();

  const stakingDataCall = isSupportedChainId
    ? !account
      ? []
      : [
          {
            functionName: "balanceOf",
            callInputs: [account],
          },

          {
            functionName: "earned",
            callInputs: [account, USDBC_ADDRESS[SupportedChainId.BASE]],
          },
          {
            functionName: "earned",
            callInputs: [account, USDC_ADDRESS[SupportedChainId.BASE]],
          },
        ]
    : [];

  const { data } = useSingleContractMultipleMethods(
    chainId ? STAKING_ADDRESS[chainId] : "",
    STAKING_ABI,
    stakingDataCall
  );

  return {
    stakedAmount: fromWei(getSingleWagmiResult(data)),
    reward_usdbc: fromWei(getSingleWagmiResult(data, 1), 6),
    reward_usdc: fromWei(getSingleWagmiResult(data, 2), 6),
  };
}

export function useStakingValue(): {
  totalSupply: string;
  rewardRate_usdc: string;
  rewardRate_usdbc: string;
} {
  const USDC_ADDRESS = useUSDCAddress();

  const contractDataCall = [
    {
      functionName: "totalSupply",
      callInputs: [],
    },
    {
      functionName: "rewardData",
      callInputs: [USDBC_ADDRESS[SupportedChainId.BASE]],
    },
    {
      functionName: "rewardData",
      callInputs: [USDC_ADDRESS[SupportedChainId.BASE]],
    },
  ];

  const { data } = useSingleContractMultipleMethods(
    STAKING_ADDRESS[FALLBACK_CHAIN_ID],
    STAKING_ABI,
    contractDataCall
  );

  const bn_rewardData_usdc = getSingleWagmiResult(data, 1) || [];
  const bn_rewardData_usdbc = getSingleWagmiResult(data, 2) || [];

  return {
    totalSupply: fromWei(getSingleWagmiResult(data)),
    rewardRate_usdc: fromWei(bn_rewardData_usdc[2], 6),
    rewardRate_usdbc: fromWei(bn_rewardData_usdbc[2], 6),
  };
}

export function useBasedPrice() {
  const contractDataCall = [
    {
      functionName: "quoteExactInput",
      callInputs: [
        "0xba5e6fa2f33f3955f0cef50c63dcc84861eab663000bb842000000000000000000000000000000000000060001f4d9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
        "1000000000000000000",
      ],
    },
  ];

  const { data, isLoading } = useSingleContractMultipleMethods(
    QUOTER_V2_ADDRESS[FALLBACK_CHAIN_ID],
    QUOTER_V2_ABI,
    contractDataCall
  );
  const loading = useDebounce(data ? isLoading : true, 1000);
  const res = getSingleWagmiResult(data) || ["0"];

  return { basedPrice: fromWei(res[0], 6), loading };
}
