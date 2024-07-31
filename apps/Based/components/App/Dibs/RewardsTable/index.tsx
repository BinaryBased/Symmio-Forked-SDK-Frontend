import { useState } from "react";
import styled from "styled-components";
import { BigNumber } from "@ethersproject/bignumber";

import { getFormattedDate } from "utils/date";

import ClaimModal from "../Rewards/ClaimModal";
import CardPagination from "components/CardPagination";
import ShimmerAnimation from "components/ShimmerAnimation";
import {
  BN_ZERO,
  formatAmount,
  formatDollarAmount,
} from "@symmio/frontend-sdk/utils/numbers";
import useDibsRewards from "lib/hooks/Dibs/useDibsRewards";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 228px;
  column-gap: 4px;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1.2fr 1fr 1fr 1fr;
  `}
`;
const HeaderWrapper = styled(Container)`
  padding: 12px 16px 8px;
`;

const HeaderText = styled.div`
  font-size: 12px;
`;

const HeaderAction = styled.div`
  justify-self: end;
`;

const RowWrapper = styled(Container)<{ topBorder?: boolean }>`
  background-color: ${({ theme }) => theme.bg0};
  border-bottom: 1px solid ${({ theme }) => theme.border1};
  ${({ topBorder, theme }) =>
    topBorder && `border-top: 1px solid ${theme.border1};`}
  padding: 12px 12px 12px 16px;
`;

const RowText = styled.div`
  font-size: 14px;
`;

const RowButton = styled.button<{ claimed?: boolean }>`
  justify-self: end;
  width: 100%;
  padding: 12px 0;
  background-color: ${({ theme, claimed }) =>
    claimed ? "#DDE7FB" : theme.bgPink1};
  color: ${({ theme, claimed }) =>
    claimed ? theme.disableColor : theme.primaryPink};
  border: 1px solid
    ${({ theme, claimed }) =>
      claimed ? theme.disableColor : theme.primaryPink};
  text-align: center;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    cursor: ${({ claimed }) => (claimed ? "auto" : "pointer")};
  }
`;

const PaginationWrapper = styled.div`
  padding: 12px 0;
`;

export interface RewardData {
  date: string;
  dateDay: string;
  tradeVolume: string;
  myReward: string;
  claimed: boolean;
  originalDate: Date;
  fillReward: boolean;
}

function Header() {
  return (
    <HeaderWrapper>
      <HeaderText>Date</HeaderText>
      <HeaderText>My Trade Volume</HeaderText>
      <HeaderText>My Reward</HeaderText>
      <HeaderAction />
    </HeaderWrapper>
  );
}

function getClaimButtonName({
  isCurrent,
  fillReward,
  claimed,
  claimSubmitted,
}: {
  isCurrent: boolean;
  fillReward: boolean;
  claimed: boolean;
  claimSubmitted?: boolean;
}) {
  if (isCurrent) return "CLAIM (AFTER EPOCH)";
  if (fillReward) return "FILL REWARDER";
  if (claimed) return "CLAIMED";
  if (claimSubmitted) return "CLAIMING...";
  return "CLAIM";
}

function TableRow({
  topBorder,
  rowClick,
  claimSubmitted,
  fillReward,
  ...data
}: {
  topBorder?: boolean;
  date: string;
  rowClick: () => void;
  claimSubmitted?: boolean;
  tradeVolume?: string;
  myReward?: string;
  claimed: boolean;
  fillReward: boolean;
  originalDate: Date;
}) {
  const { date, tradeVolume, myReward, claimed, originalDate } = data;
  const currentDate = new Date();
  const isCurrent =
    (currentDate.getTime() - originalDate.getTime()) / 86400000 < 1;
  return (
    <RowWrapper topBorder={topBorder}>
      <RowText>{date}</RowText>
      <RowText>{tradeVolume ? formatDollarAmount(tradeVolume) : "-"}</RowText>
      <RowText>{myReward ? `${myReward} BASED` : "-"}</RowText>
      <RowButton
        claimed={claimed || claimSubmitted || isCurrent}
        disabled={claimed || isCurrent || claimSubmitted || fillReward}
        onClick={() => rowClick()}
      >
        {getClaimButtonName({ claimed, isCurrent, claimSubmitted, fillReward })}
      </RowButton>
    </RowWrapper>
  );
}

function Body({ rewardData }: { rewardData: RewardData[] }) {
  const [page, setPage] = useState(1);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimsSubmitted, setClaimsSubmitted] = useState<any[]>([]);
  const [selectedReward, setSelectedReward] = useState({
    date: "",
    dateDay: "0",
    tradeVolume: "0",
    myReward: "0",
    originalDate: new Date(),
    claimed: false,
    fillReward: false,
  });
  const rowsPerPage = 5;
  const pageCount = Math.ceil(rewardData.length / rowsPerPage);
  const onPageChange = (newPage: number) => {
    let localNewPage;
    if (newPage > pageCount) localNewPage = pageCount;
    else if (newPage < 1) localNewPage = 1;
    else localNewPage = newPage;
    setPage(localNewPage);
  };
  function rowClick(data: RewardData) {
    setSelectedReward(data);
    setClaimModalOpen(true);
  }
  return (
    <>
      <div>
        {rewardData
          .slice(
            (page - 1) * rowsPerPage,
            Math.min(page * rowsPerPage, rewardData.length)
          )
          .map((data, index) => (
            <TableRow
              key={index}
              topBorder={index === 0}
              rowClick={() => rowClick(data)}
              claimSubmitted={claimsSubmitted.includes(data.date)}
              {...data}
            />
          ))}
      </div>
      <ClaimModal
        isOpen={claimModalOpen}
        onDismiss={(isSubmitted) => {
          console.log("isSubmitted", selectedReward.date);
          if (isSubmitted) {
            setClaimsSubmitted([...claimsSubmitted, selectedReward.date]);
          }
          setClaimModalOpen((prev) => !prev);
        }}
        data={selectedReward}
      />
      <PaginationWrapper>
        <CardPagination
          pageCount={pageCount}
          itemsQuantity={rewardData.length}
          currentPage={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
        />
      </PaginationWrapper>
    </>
  );
}

export default function RewardsTable({
  selectedDay,
  customDayActive,
  getCustomDate,
}: {
  selectedDay: number;
  customDayActive: boolean;
  getCustomDate: (arg0: number) => Date;
}) {
  const { rewards, loading } = useDibsRewards(selectedDay, customDayActive);

  const objReward =
    rewards?.map((reward) => {
      const originalDate = getCustomDate(parseInt(reward.day));
      return {
        date: getFormattedDate(originalDate),
        originalDate,
        dateDay: reward.day,
        tradeVolume: formatAmount(reward.volume),
        myReward: formatAmount(reward.reward),
        claimed: reward.unclaimedReward.eq(BigNumber.from(0)),
        fillReward: reward.reward.eq(BN_ZERO) && !reward.volume.eq(BN_ZERO),
      };
    }) || [];

  return (
    <div>
      <Header />
      {loading ? (
        <div style={{ margin: "20px 20px 22px 15px" }}>
          <ShimmerAnimation width="auto" height="40px" />
        </div>
      ) : (
        <Body rewardData={objReward} />
      )}
    </div>
  );
}
