import { MAX_PENDINGS_POSITIONS_NUMBER } from "@symmio/frontend-sdk/constants";
import { ErrorState } from "@symmio/frontend-sdk/types/trade";

export const ErrorStateMessages: { [ErrorState: number]: string } = {
  [ErrorState.INSUFFICIENT_BALANCE]: "Insufficient Balance",
  [ErrorState.LESS_THAN_MIN_ACCEPTABLE_QUOTE_VALUE]: "Amount is too low",
  [ErrorState.OUT_OF_RANGE_PRICE]: "Price is out of range",
  [ErrorState.REMAINING_AMOUNT_UNDER_10]: "Amount is too high",
  [ErrorState.PARTIAL_CLOSE_WITH_SLIPPAGE]: "Liquidation after close!",
  [ErrorState.INVALID_PRICE]: "Price is out of range",
  [ErrorState.INVALID_QUANTITY]: "INVALID_QUANTITY",
  [ErrorState.CAP_REACHED]: "Liquidity fully utilized",
  [ErrorState.MAX_PENDING_POSITIONS_REACHED]: `Max pending positions reached (${MAX_PENDINGS_POSITIONS_NUMBER})`,
  [ErrorState.HIGHER_THAN_MAX_NOTIONAL_VALUE]: "Higher than max notional value",
};
