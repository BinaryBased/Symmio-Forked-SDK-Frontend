import { MAX_PENDINGS_POSITIONS_NUMBER } from "../constants";

export enum ErrorState {
  VALID,
  INSUFFICIENT_BALANCE,
  INVALID_PRICE,
  INVALID_QUANTITY,
  OUT_OF_RANGE_PRICE,
  CAP_REACHED,
  REMAINING_AMOUNT_UNDER_10,
  PARTIAL_CLOSE_WITH_SLIPPAGE,
  MAX_PENDING_POSITIONS_REACHED,
  LESS_THAN_MIN_ACCEPTABLE_QUOTE_VALUE,
  HIGHER_THAN_MAX_NOTIONAL_VALUE,
}

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

export enum CloseQuote {
  CANCEL_CLOSE_REQUEST,
  CANCEL_QUOTE,
  CLOSE_POSITION,
  FORCE_CANCEL,
  FORCE_CANCEL_CLOSE,
}

export const CloseQuoteMessages: { [closeQuoteType: number]: string } = {
  [CloseQuote.CANCEL_CLOSE_REQUEST]: "Cancel Close Position",
  [CloseQuote.CANCEL_QUOTE]: "Cancel Order",
  [CloseQuote.CLOSE_POSITION]: "Close Position",
  [CloseQuote.FORCE_CANCEL]: "Force Cancel Order",
  [CloseQuote.FORCE_CANCEL_CLOSE]: "Force Cancel Close Order",
};

export enum CloseGuides {
  ZERO,
  ONE,
  TWO,
  THREE,
}

export enum InputField {
  PRICE,
  QUANTITY,
}

export enum PositionType {
  LONG = "LONG",
  SHORT = "SHORT",
}

export enum OrderType {
  MARKET = "Market",
  LIMIT = "Limit",
}

export enum TradeState {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}
