import { BigNumber } from "@ethersproject/bignumber";
import BigNumberJS from "bignumber.js";

export type MuonVerificationData = {
  success: boolean;
  result: {
    app: string;
    appId: string;
    confirmed: boolean;
    confirmedAt: number;
    data: {
      init: {
        nonceAddress: string;
      };
      params: {
        projectId: string;
        day: string;
        pair: string;
        user: string;
      };
      result: {
        projectId: string;
        user: string;
        pair: string;
        day: string;
        userVolume: string;
        totalVolume: string;
      };
      signParams: {
        name?: string;
        type: string;
        value: string | number;
      }[];
      timestamp: number;
      uid: string;
    };
    gwAddress: string;
    method: string;
    nSign: number;
    nodeSignature: string;
    reqId: string;
    shieldAddress: string;
    shieldSignature: string;
    signatures: {
      owner: string;
      ownerPubKey: { x: string; yParity: string };
      signature: string;
      timestamp: number;
    }[];
    startedAt: number;
  };
};

export interface UserDailyGeneratedVolumesRecord {
  amountAsUser: string;
  day: string;
  user: string;
}

export interface RewardRecord extends UserDailyGeneratedVolumesRecord {
  volume: BigNumberJS;
  reward: BigNumberJS;
  rewardRaw: BigNumber;
  claimedReward: BigNumber;
  unclaimedReward: BigNumber;
}

export interface RewardGetData {
  days: Array<number>;
  user: string;
  totalVolumesBN: BigNumber[];
  result: UserDailyGeneratedVolumesRecord[];
}
