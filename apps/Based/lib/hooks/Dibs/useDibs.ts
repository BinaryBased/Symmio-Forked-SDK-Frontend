import { useEffect, useMemo, useState } from "react";
import { BASED_ABI, DIBS_ABI } from "constants/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "viem";

import { BASED_ADDRESS, DIBS_REWARDER_ADDRESS } from "constants/tokens";

import { useSingleContractMultipleMethods } from "@symmio/frontend-sdk/lib/hooks/multicall";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { useSupportedChainId } from "@symmio/frontend-sdk/lib/hooks/useSupportedChainId";
import { getSingleWagmiResult } from "@symmio/frontend-sdk/utils/multicall";
import { FALLBACK_CHAIN_ID } from "constants/chains/chains";

export function useDibs() {
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [activeDay, setActiveDay] = useState<number>(0);
  const [projectId, setProjectId] = useState<string | null>(null);

  const timestamp = useBasedStartTimestamp();
  const { projectId: prjId } = useDibsInfo();

  useEffect(() => {
    if (timestamp) {
      setStartTimestamp(timestamp as number);
    }

    return () => setStartTimestamp(0);
  }, [timestamp]);

  useEffect(() => {
    if (prjId) {
      setProjectId(prjId as string);
    }

    return () => setProjectId("");
  }, [prjId]);

  useEffect(() => {
    const today = new Date();
    const tmpActiveDay = startTimestamp
      ? Math.floor((today.getTime() / 1000 - startTimestamp) / 86400)
      : 0;
    setActiveDay(tmpActiveDay);
  }, [startTimestamp]);

  function setCustomActiveDay(inputActiveDay: Date) {
    const inputActiveDayTimestamp = inputActiveDay.getTime();
    const tmpActiveDay = startTimestamp
      ? Math.ceil((inputActiveDayTimestamp / 1000 - startTimestamp) / 86400)
      : 0;
    setActiveDay(tmpActiveDay);
  }

  function getActiveDate() {
    return startTimestamp
      ? new Date((startTimestamp + activeDay * 86400) * 1000)
      : new Date();
  }

  function getCustomDate(customActiveDay: number): Date {
    return startTimestamp
      ? new Date((startTimestamp + customActiveDay * 86400) * 1000)
      : new Date();
  }
  return {
    startTimestamp,
    activeDay,
    projectId,
    setCustomActiveDay,
    getActiveDate,
    getCustomDate,
  };
}

export function useBasedStartTimestamp() {
  const { chainId } = useActiveWagmi();
  const isSupportedChainId = useSupportedChainId();

  const call = isSupportedChainId
    ? [
        {
          functionName: "startTimestamp",
          callInputs: [],
        },
      ]
    : [];

  const { data } = useSingleContractMultipleMethods(
    chainId ? BASED_ADDRESS[chainId] : "",
    BASED_ABI,
    call
  );

  const result = getSingleWagmiResult(data);
  const timestamp = result ? result : 1697932800;

  return useMemo(() => Number(timestamp), [timestamp]);
}

export function useDibsInfo(selectedDay?: number | null) {
  const call =
    selectedDay && selectedDay >= 0
      ? [
          {
            functionName: "PROJECT_ID",
            callInputs: [],
          },
          {
            functionName: "totalReward",
            callInputs: [selectedDay],
          },
        ]
      : [
          {
            functionName: "PROJECT_ID",
            callInputs: [],
          },
        ];
  const { data } = useSingleContractMultipleMethods(
    DIBS_REWARDER_ADDRESS[FALLBACK_CHAIN_ID],
    DIBS_ABI,
    call
  );

  const projectId = getSingleWagmiResult(data);
  const totalReward = getSingleWagmiResult(data, 1);

  return useMemo(() => {
    return {
      projectId: projectId as Address,
      totalReward: totalReward as BigNumber,
    };
  }, [projectId, totalReward]);
}
