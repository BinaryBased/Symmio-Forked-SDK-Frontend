import BigNumber from "bignumber.js";
import { BN_TEN, BN_ZERO, toBN } from "@symmio/frontend-sdk/utils/numbers";

export function fromWeiBN(
  amount: BigNumber.Value | null,
  decimals = 18,
  defaultOutput?: BigNumber
): BigNumber {
  if (amount === undefined || amount === null || amount === "") return BN_ZERO;
  if (typeof amount === "string" && isNaN(Number(amount))) {
    return defaultOutput ?? BN_ZERO;
  }

  return toBN(amount).div(BN_TEN.pow(decimals));
}
