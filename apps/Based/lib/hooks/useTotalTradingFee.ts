import { useEffect, useState } from "react";

import { TotalTradingFee } from "apollo/queries";
import { FALLBACK_CHAIN_ID } from "constants/chains/chains";

import { ApiState } from "@symmio/frontend-sdk/types/api";
import { fromWei, toBN } from "@symmio/frontend-sdk/utils/numbers";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { useMultiAccountAddress } from "@symmio/frontend-sdk/state/chains";
import { useAnalyticsApolloClient } from "@symmio/frontend-sdk/apollo/client/balanceHistory";

export interface ITotalTradingFee {
  platformFee: string;
  __typename: string;
}

export default function useTotalTradingFee() {
  const { chainId } = useActiveWagmi();
  const MULTI_ACCOUNT_ADDRESS = useMultiAccountAddress();
  const multiAccountAddress =
    MULTI_ACCOUNT_ADDRESS[chainId ?? FALLBACK_CHAIN_ID];
  const client = useAnalyticsApolloClient(FALLBACK_CHAIN_ID);
  const [tradingFeeStatus, setTradingFeeStatus] = useState<ApiState>(
    ApiState.LOADING
  );

  const [totalTradingFee, setTotalTradingFee] = useState("-");
  const [retryCount, setRetryCount] = useState(0); // Add a state for retry count
  const MAX_RETRIES = 3; // Maximum number of retries
  const RETRY_DELAY = 3000; // Delay between retries in milliseconds (3 seconds)

  useEffect(() => {
    async function fetchTotalTradingFee() {
      try {
        if (!client) return;
        setTradingFeeStatus(ApiState.LOADING);
        const { data: totalHistories } = await client.query<{
          totalHistories: ITotalTradingFee[];
        }>({
          query: TotalTradingFee,
          variables: { account: multiAccountAddress },
          fetchPolicy: "cache-first",
        });

        const response = totalHistories.totalHistories[0] as ITotalTradingFee;

        const tempResponse = toBN(response.platformFee).plus(
          toBN("138809569267057680890500")
        ); // this number is total fee generated for previous subgraph

        setTotalTradingFee(fromWei(tempResponse));
        setTradingFeeStatus(ApiState.OK);
        setRetryCount(0); // Reset retry count on success
      } catch (error) {
        console.error(error);
        setTradingFeeStatus(ApiState.ERROR);

        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, RETRY_DELAY);
        }
      }
    }

    fetchTotalTradingFee();
  }, [client, multiAccountAddress, retryCount]);

  return { totalTradingFee, tradingFeeStatus };
}
