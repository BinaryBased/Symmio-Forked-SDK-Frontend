import { Token } from "@uniswap/sdk-core";
import { SupportedChainId } from "@symmio/frontend-sdk/constants";
import { AddressMap } from "@symmio/frontend-sdk/utils/address";

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
