import { useCallback, useEffect, useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import BigNumberJS from "bignumber.js";

import { AddressZero } from "@symmio/frontend-sdk/constants";
import { useIsRewardMinted } from "./useDibsRewards";
import { useDibsInfo } from "./useDibs";
import { useDibsClient } from "apollo/client/dibs";
import { DailyData } from "apollo/queries";
import { fromWeiBN } from "utils/number";
import useRefresh from "lib/hooks/useRefresh";

export interface DailyGeneratedVolumesRecord {
  amountAsUser: string;
  user: string;
  name: string;
}

export interface LeaderBoardRecord extends DailyGeneratedVolumesRecord {
  volume: BigNumberJS;
  reward: BigNumberJS;
}

export interface AccountsNameData {
  id: string;
  user: string;
  name: string;
}
export interface LeaderBoardData {
  [day: number]: LeaderBoardRecord[];
}

const useLeaderBoardData = (selectedDay: number | null) => {
  const { fastRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);
  const [epochLeaderBoard, setEpochLeaderBoard] = useState<LeaderBoardData>({});
  const [totalReward, setTotalReward] = useState<BigNumber | null>(null);
  const { totalReward: reward } = useDibsInfo(selectedDay);
  const dibsClient = useDibsClient();

  const isMinted = useIsRewardMinted(selectedDay);
  useEffect(() => {
    if (reward) {
      setTotalReward(reward as BigNumber);
    }

    return () => setTotalReward(null);
  }, [reward, selectedDay]);

  const getDailyLeaderboardData = useCallback(
    async (epoch: number): Promise<LeaderBoardRecord[]> => {
      if (!totalReward || !dibsClient) return [];
      let offset = 0;
      const result: DailyGeneratedVolumesRecord[] = [];
      let chunkResult: DailyGeneratedVolumesRecord[] = [];
      do {
        chunkResult = (
          await dibsClient.query({
            query: DailyData,
            variables: { day: epoch, skip: offset },
            fetchPolicy: "cache-first",
          })
        ).data.dailyGeneratedVolumes;
        offset += chunkResult.length;
        result.push(...chunkResult);
      } while (chunkResult.length);
      const [totalVolumeObject] = result.filter(
        (ele) => ele.user === AddressZero.toLowerCase()
      );
      const totalVolumeBN = BigNumber.from(
        totalVolumeObject?.amountAsUser ?? 0
      );
      return result
        .filter((ele) => ele.user !== AddressZero.toLowerCase())
        .map((ele) => {
          return {
            ...ele,
            volume: fromWeiBN(ele.amountAsUser),
            reward: fromWeiBN(
              BigNumber.from(ele.amountAsUser)
                .mul(totalReward)
                .div(totalVolumeBN)
                .toString()
            ),
          };
        });
    },
    [dibsClient, totalReward]
  );

  useEffect(() => {
    const fetchInfo = async () => {
      if (selectedDay === null) return;
      try {
        setLoading(true);
        const leader_day = await getDailyLeaderboardData(selectedDay);
        setEpochLeaderBoard((prev) => ({ ...prev, [selectedDay]: leader_day }));
        setLoading(false);
      } catch (error) {
        console.log("leaderboard get error :>> ", error);
        setLoading(false);
      }
    };
    fetchInfo();
  }, [selectedDay, getDailyLeaderboardData, fastRefresh, isMinted]);

  return {
    epochLeaderBoard:
      selectedDay !== null && epochLeaderBoard[selectedDay]
        ? epochLeaderBoard[selectedDay]
        : [],
    totalReward,
    loading,
  };
};
export default useLeaderBoardData;
