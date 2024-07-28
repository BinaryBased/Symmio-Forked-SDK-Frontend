import { Token, WETH9 } from "@uniswap/sdk-core";
import { duplicateTokenByAddressMap } from "../utils/token";
import { SupportedChainId } from "./chains";
import {
  useCollateralAddress,
  useCollateralSymbol,
  useCollateralDecimal,
  useUSDCAddress,
  useV3Ids,
} from "../state/chains/hooks";
import { ChainInfo } from "./chainInfo";
import { AddressMap } from "../utils/address";

/* =====================================
                    STAKING & DIBS ADDRESSES
===================================== */

export const DIBS_REWARDER_ADDRESS: AddressMap = {
  [SupportedChainId.BASE]: "0x21baa217e34a5a819A6D3afc4Bdb7DED57ca225b",
};

export const QUOTER_V2_ADDRESS: AddressMap = {
  [SupportedChainId.BASE]: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a",
};

export const STAKING_ADDRESS: AddressMap = {
  [SupportedChainId.BASE]: "0xF39Acf265eD73d8Eb9359cE068a20036cAf3cec8",
};

export const BASED_ADDRESS: AddressMap = {
  [SupportedChainId.BASE]: "0xBa5E6fa2f33f3955f0cef50c63dCC84861eAb663",
};

/* =====================================
                             TOKENS
===================================== */

export const BASED_TOKEN = new Token(
  SupportedChainId.BASE,
  BASED_ADDRESS[SupportedChainId.BASE],
  18,
  "BASED",
  "BASED"
);

export const USDBC_ADDRESS: AddressMap = {
  [SupportedChainId.BASE]: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
};

export function useUSDCToken() {
  const USDC_ADDRESS = useUSDCAddress();
  return duplicateTokenByAddressMap(USDC_ADDRESS, 6, "USDC", "USDC");
}

export function useCollateralToken() {
  const COLLATERAL_ADDRESS = useCollateralAddress();
  const COLLATERAL_SYMBOL = useCollateralSymbol();
  const COLLATERAL_DECIMALS = useCollateralDecimal();
  return duplicateTokenByAddressMap(
    COLLATERAL_ADDRESS,
    6,
    COLLATERAL_SYMBOL,
    COLLATERAL_SYMBOL,
    COLLATERAL_DECIMALS
  );
}

export function useTokenShorthand() {
  const USDC_TOKEN = useUSDCToken();
  const v3_ids = useV3Ids();
  const tmpStruct = v3_ids?.reduce((acc, id) => {
    acc[id] = USDC_TOKEN[id]?.address;
    return acc;
  }, {});
  return {
    USDC: tmpStruct,
  };
}

/* =====================================
                             WRAPPED TOKENS
===================================== */
export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } =
  {
    ...(WETH9 as Record<SupportedChainId, Token>),

    [SupportedChainId.ARBITRUM]: new Token(
      SupportedChainId.ARBITRUM,
      ChainInfo[SupportedChainId.ARBITRUM].WRAPPED_NATIVE_ADDRESS,
      18,
      "WETH",
      "Wrapped Ether"
    ),
    [SupportedChainId.BASE]: new Token(
      SupportedChainId.BASE,
      ChainInfo[SupportedChainId.BASE].WRAPPED_NATIVE_ADDRESS,
      18,
      "WETH",
      "Wrapped Ether"
    ),
    [SupportedChainId.POLYGON]: new Token(
      SupportedChainId.POLYGON,
      ChainInfo[SupportedChainId.POLYGON].WRAPPED_NATIVE_ADDRESS,
      18,
      "WMATIC",
      "Wrapped MATIC"
    ),
    [SupportedChainId.FANTOM]: new Token(
      SupportedChainId.FANTOM,
      ChainInfo[SupportedChainId.FANTOM].WRAPPED_NATIVE_ADDRESS,
      18,
      "WFTM",
      "Wrapped Fantom"
    ),
    [SupportedChainId.BSC]: new Token(
      SupportedChainId.BSC,
      ChainInfo[SupportedChainId.BSC].WRAPPED_NATIVE_ADDRESS,
      18,
      "WBNB",
      "Wrapped BNB"
    ),
    [SupportedChainId.BSC_TESTNET]: new Token(
      SupportedChainId.BSC_TESTNET,
      ChainInfo[SupportedChainId.BSC_TESTNET].WRAPPED_NATIVE_ADDRESS,
      18,
      "tBNB",
      "test BNB"
    ),

    [SupportedChainId.MANTLE]: new Token(
      SupportedChainId.MANTLE,
      ChainInfo[SupportedChainId.MANTLE].WRAPPED_NATIVE_ADDRESS,
      18,
      "WMANTLE",
      "Wrapped MANTLE"
    ),
    [SupportedChainId.BLAST]: new Token(
      SupportedChainId.BLAST,
      ChainInfo[SupportedChainId.BLAST].WRAPPED_NATIVE_ADDRESS,
      18,
      "WETH",
      "Wrapped Ether"
    ),
  };
