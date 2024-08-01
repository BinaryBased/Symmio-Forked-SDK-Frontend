import { useCallback, useEffect, useState } from "react";
import { FetchPolicy, DocumentNode } from "@apollo/client";
import { BigNumber } from "@ethersproject/bignumber";

import {
  TotalVolumeForDaysData,
  UserRewardData,
  UserRewardDataCustomDay,
} from "apollo/queries";
import { useDibsClient } from "apollo/client/dibs";
import { BASED_ABI } from "constants/abi";

import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { BASED_ADDRESS, DIBS_REWARDER_ADDRESS } from "constants/tokens";
import { RewardGetData, UserDailyGeneratedVolumesRecord } from "types/dibs";
import { useUserRewardData } from "./useUserRewardData";
import { useSingleContractMultipleMethods } from "@symmio/frontend-sdk/lib/hooks/multicall";
import { getSingleWagmiResult } from "@symmio/frontend-sdk/utils/multicall";

const useDibsRewards = (selectedDay: number, customDayActive: boolean) => {
  const { account, chainId } = useActiveWagmi();
  const DibsContract = chainId && DIBS_REWARDER_ADDRESS[chainId];
  const dibsClient = useDibsClient();

  const [getData, setGetData] = useState<RewardGetData>({
    days: [],
    totalVolumesBN: [],
    result: [],
    user: "",
  });
  const [getDataLoading, setGetDataLoading] = useState(false);
  const getDailyLeaderboardData = useCallback(
    async (user: string) => {
      if (!DibsContract || !dibsClient) return [];

      let offset = 0;
      const result: UserDailyGeneratedVolumesRecord[] = [];
      let chunkResult: UserDailyGeneratedVolumesRecord[] = [];
      setGetDataLoading(true);
      do {
        const queryParam: {
          query: DocumentNode;
          variables: { user: string; skip: number; day?: number };
          fetchPolicy: FetchPolicy;
        } = customDayActive
          ? {
              query: UserRewardDataCustomDay,
              variables: { user, skip: offset, day: selectedDay },
              fetchPolicy: "cache-first",
            }
          : {
              query: UserRewardData,
              variables: { user, skip: offset },
              fetchPolicy: "cache-first",
            };
        chunkResult = (await dibsClient.query(queryParam)).data
          .dailyGeneratedVolumes;
        result.push(...chunkResult);
        offset += chunkResult.length;
      } while (chunkResult.length);

      const days = result.map((res) => Number(res.day));
      let totalVolumesBN: BigNumber[] = [];

      let volumeOffset = 0;
      const volumeChunkSize = 100;

      do {
        const slicedDays = days.slice(
          volumeOffset,
          volumeOffset + volumeChunkSize
        );

        const { data } = await dibsClient.query({
          query: TotalVolumeForDaysData,
          variables: { days: slicedDays },
          fetchPolicy: "cache-first",
        });

        const volumes = data.dailyGeneratedVolumes.map(
          (ele: UserDailyGeneratedVolumesRecord) =>
            BigNumber.from(ele.amountAsUser)
        );

        totalVolumesBN = [...totalVolumesBN, ...volumes];

        volumeOffset += volumeChunkSize;
      } while (volumeOffset < days.length);

      setGetDataLoading(false);
      setGetData({ days, totalVolumesBN, result, user });
    },
    [DibsContract, customDayActive, dibsClient, selectedDay]
  );

  useEffect(() => {
    const fetchInfo = async () => {
      if (!account) return;
      try {
        await getDailyLeaderboardData(account);
      } catch (error) {
        console.log("leaderboard get error :>> ", error);
      }
    };
    fetchInfo();
  }, [account, getDailyLeaderboardData, selectedDay]);

  return useUserRewardData(getData, getDataLoading);
};

export function useIsRewardMinted(day: number | null) {
  const { chainId } = useActiveWagmi();
  const contractDataCall = day
    ? [
        {
          functionName: "isRewardMinted",
          callInputs: [day],
        },
      ]
    : [];

  const { data } = useSingleContractMultipleMethods(
    chainId ? BASED_ADDRESS[chainId] : "",
    BASED_ABI,
    contractDataCall
  );
  return getSingleWagmiResult(data, 0);
}

export default useDibsRewards;
