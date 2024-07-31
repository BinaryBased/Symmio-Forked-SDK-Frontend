import gql from "graphql-tag";

export const TotalTradingFee = gql`
  query TotalTradingFee($account: String!) {
    totalHistories(where: { accountSource: $account }) {
      platformFee
    }
  }
`;

export const TotalVolumeForDaysData = gql`
  query DailyDataForPairQuery($days: [BigInt!]) {
    dailyGeneratedVolumes(
      first: 100
      where: {
        user: "0x0000000000000000000000000000000000000000"
        pair: "0x0000000000000000000000000000000000000000"
        day_in: $days
      }
      orderBy: day
      orderDirection: desc
    ) {
      user
      day
      amountAsUser
    }
  }
`;

export const UserRewardData = gql`
  query DailyDataForPairQuery($skip: Int!, $user: Bytes!) {
    dailyGeneratedVolumes(
      first: 100
      skip: $skip
      where: {
        user: $user
        day_gte: 0
        amountAsUser_gt: 0
        pair: "0x0000000000000000000000000000000000000000"
      }
      orderBy: day
      orderDirection: desc
    ) {
      user
      day
      amountAsUser
    }
  }
`;

export const UserRewardDataCustomDay = gql`
  query DailyDataForPairQuery($user: Bytes!, $skip: Int!, $day: BigInt!) {
    dailyGeneratedVolumes(
      first: 100
      skip: $skip
      where: {
        user: $user
        day: $day
        amountAsUser_gt: 0
        pair: "0x0000000000000000000000000000000000000000"
      }
      orderBy: day
      orderDirection: desc
    ) {
      user
      day
      amountAsUser
    }
  }
`;

export const DailyData = gql`
  query DailyDataForPairQuery($skip: Int!, $day: BigInt!) {
    dailyGeneratedVolumes(
      first: 100
      skip: $skip
      where: {
        day: $day
        amountAsUser_gt: 0
        pair: "0x0000000000000000000000000000000000000000"
      }
      orderBy: amountAsUser
      orderDirection: desc
    ) {
      user
      amountAsUser
    }
  }
`;
