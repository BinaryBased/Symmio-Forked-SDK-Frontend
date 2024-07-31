import { createApolloClient } from "@symmio/frontend-sdk/apollo/client";
import { SupportedChainId } from "@symmio/frontend-sdk/constants";

// DIBS SUBGRAPH
const apolloClients = {
  [SupportedChainId.BASE]: createApolloClient(
    "https://api.studio.thegraph.com/query/62835/basedt2e/version/latest"
  ),
};

export function useDibsClient() {
  // Return the existing or new client
  return apolloClients[SupportedChainId.BASE];
}
