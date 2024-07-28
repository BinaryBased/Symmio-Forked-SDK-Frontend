import { SupportedChainId } from "@symmio/frontend-sdk/constants/chains";
import { ChainType } from "@symmio/frontend-sdk/state/chains/reducer";

export enum FrontEndsName {
  ALPHA = "Alpha",
  INTENT_X = "IntentX",
  CORE = "Core",
  MORPHEX = "Morphex",
  BASED = "Based",
  CLOVERFIELD = "Cloverfield",
  NEW_CLOVERFIELD = "New Cloverfield",
  BEFI = "Befi",
  VIBE = "Vibe",
  PEAR = "Pear",
}

const BaseChainBasedFE: ChainType = {
  COLLATERAL_SYMBOL: "USDC",
  COLLATERAL_DECIMALS: 6,
  COLLATERAL_ADDRESS: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",

  DIAMOND_ADDRESS: "0x91Cf2D8Ed503EC52768999aA6D8DBeA6e52dbe43",
  MULTI_ACCOUNT_ADDRESS: "0x1c03B6480a4efC2d4123ba90d7857f0e1878B780",
  PARTY_B_WHITELIST: "0x9206D9d8F7F1B212A4183827D20De32AF3A23c59",
  SIGNATURE_STORE_ADDRESS: "0xC19e66D08350Eb88A41377b16C8Ab93EE0FB4996",
  TP_SL_WALLET_ADDRESS: "0x1De09355907249e18eeD89557a2c7fBd58bdCC63",

  MULTICALL3_ADDRESS: "0x66EC85c6d1971Ea15472754F733fA3F956a0Ec30",
  USDC_ADDRESS: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  WRAPPED_NATIVE_ADDRESS: "0x4200000000000000000000000000000000000006",
  ANALYTICS_SUBGRAPH_ADDRESS:
    "https://api.studio.thegraph.com/query/62454/analytics_base_8_2/version/latest",
  ORDER_HISTORY_SUBGRAPH_ADDRESS:
    "https://api.studio.thegraph.com/query/62454/main_base_8_2/version/latest",
  FUNDING_RATE_SUBGRAPH_ADDRESS:
    "https://api.studio.thegraph.com/query/62454/fundingrate_base_8_2/version/latest",
};

export const contractInfo: {
  [chainId: number]: { [name: string]: ChainType };
} = {
  [SupportedChainId.BASE]: {
    [FrontEndsName.BASED]: BaseChainBasedFE,
  },
};
// STAKING_ADDRESS: "0xf39acf265ed73d8eb9359ce068a20036caf3cec8",
//
