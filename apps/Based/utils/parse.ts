import BigNumber from "bignumber.js";
import JSBI from "jsbi";
import { Currency, CurrencyAmount } from "@uniswap/sdk-core";

export function parseBalance(value: string, decimals = 18) {
  const valueBN = new BigNumber(value || "0");
  const factor = new BigNumber(10).pow(decimals);
  return valueBN.multipliedBy(factor);
}

// try to parse a user entered amount for a given token
export function tryParseAmount<T extends Currency>(
  value?: string,
  currency?: T
): CurrencyAmount<T> | null | undefined {
  if (!value || !currency) {
    return undefined;
  }
  try {
    const valueBN = new BigNumber(value);
    const factor = new BigNumber(10).pow(currency.decimals);
    const typedValueParsed = valueBN.multipliedBy(factor).toFixed(0); // Convert to string without decimals
    return CurrencyAmount.fromRawAmount(
      currency,
      JSBI.BigInt(typedValueParsed)
    );
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return undefined;
}
