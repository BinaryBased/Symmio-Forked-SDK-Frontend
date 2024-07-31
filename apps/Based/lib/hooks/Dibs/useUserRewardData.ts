import { BigNumber } from "@ethersproject/bignumber";

import { DIBS_ABI } from "constants/abi";
import { DIBS_REWARDER_ADDRESS } from "constants/tokens";
import { RewardGetData } from "types/dibs";
import { fromWeiBN } from "utils/number";

import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { useSingleContractMultipleMethods } from "@symmio/frontend-sdk/lib/hooks/multicall";

export const useUserRewardData = (
  { days, totalVolumesBN, result, user }: RewardGetData,
  dataLoading: boolean
) => {
  const { chainId } = useActiveWagmi();
  const totalRewardsCall = days.map((day) => ({
    functionName: "totalReward",
    callInputs: [day.toString()],
  }));

  const claimsCall = days.map((day) => ({
    functionName: "claimed",
    callInputs: [user, day.toString()],
  }));

  const allCalls = totalRewardsCall.concat(claimsCall);
  const { data: multiCallResult, isLoading } = useSingleContractMultipleMethods(
    chainId ? DIBS_REWARDER_ADDRESS[chainId] : "",
    DIBS_ABI,
    allCalls
  );

  if (isLoading || dataLoading) {
    return { loading: true, rewards: null };
  }

  const multiCallRefile = multiCallResult
    ? multiCallResult.map((semiData) =>
        semiData && semiData.status === "success"
          ? (semiData.result as BigNumber)
          : BigNumber.from(0)
      )
    : [];

  const totalRewards: BigNumber[] = multiCallRefile.slice(
    0,
    totalRewardsCall.length
  );
  const claimed: BigNumber[] = multiCallRefile.slice(
    totalRewardsCall.length,
    allCalls.length
  );
  const rewards = result.map((ele, i) => {
    const rewardRaw = BigNumber.from(ele.amountAsUser)
      .mul(totalRewards[i])
      .div(totalVolumesBN[i]);
    return {
      ...ele,
      volume: fromWeiBN(ele.amountAsUser),
      rewardRaw,
      reward: fromWeiBN(rewardRaw.toString()),
      claimedReward: claimed[i],
      unclaimedReward: rewardRaw.sub(claimed[i]),
    };
  });
  return { loading: false, rewards };
};
