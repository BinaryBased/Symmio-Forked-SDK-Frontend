import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import RankMedal1 from "/public/static/images/dibs/ranks/rankMedal1.svg";
import RankMedal2 from "/public/static/images/dibs/ranks/rankMedal2.svg";
import RankMedal3 from "/public/static/images/dibs/ranks/rankMedal3.svg";
import DefaultRankMedal from "/public/static/images/dibs/ranks/rankMedal.svg";
import Shadow1 from "/public/static/images/dibs/ranks/shadow1.svg";
import Shadow2 from "/public/static/images/dibs/ranks/shadow2.svg";
import ShadowMe from "/public/static/images/dibs/ranks/shadow-me.svg";
import SuperSkullDefault from "/public/static/images/dibs/SuperSkullDefault.svg";
import Sniper from "/public/static/images/badges/sniper.svg";
import Charger from "/public/static/images/badges/charger.svg";
import Medalist from "/public/static/images/badges/medalist.svg";
import Archer from "/public/static/images/badges/hunter.svg";

import { Row } from "components/Row";
import Column from "components/Column";
import ShimmerAnimation from "components/ShimmerAnimation";
import { truncateAddress } from "@symmio/frontend-sdk/utils/address";
import {
  formatAmount,
  formatDollarAmount,
} from "@symmio/frontend-sdk/utils/numbers";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";

import CardPagination from "components/CardPagination";
import Copy from "components/Copy";
import useLeaderBoardData from "lib/hooks/Dibs/useLeaderBoardData";

interface IRowData {
  topBorder?: boolean;
  myRank: string;
  rank: string;
  accountName: string;
  badges?: string[];
  accountAddress: string;
  tradeVolume: string;
  potentialReward: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.8fr 1fr 1fr 1fr;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
      grid-template-columns: 0.2fr 0.2fr 1fr 1fr 1fr; 
  }`};
`;

const HeaderWrapper = styled(Container)`
  padding: 16px 16px 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  grid-template-columns: 0.3fr 1fr 1fr 1fr; 
  & > * {
    &:nth-child(2) {
      display: none; 
    }
  }
}`};
`;

const HeaderText = styled.div`
  font-size: 12px;
`;

const DotsWrapper = styled(Column)`
  align-items: center;
  margin: 6px 0;
  gap: 6px;
`;

const Dot = styled.div`
  background-color: ${({ theme }) => theme.primaryDark};
  width: 4px;
  height: 4px;
`;

const RowWrapper = styled(Container)<{
  topBorder?: boolean;
  currentAccount?: boolean;
}>`
  background: ${({ theme, currentAccount }) =>
    currentAccount ? theme.bgPink1 : theme.bg0};
  border-bottom: 1px solid ${({ theme }) => theme.border1};
  ${({ topBorder, theme }) =>
    topBorder && `border-top: 1px solid ${theme.border1};`}
  padding: 12px 12px 12px 16px;
`;

const RowText = styled.div`
  font-size: 14px;
`;

const Rank = styled.div`
  display: inline-block;
  position: relative;
`;

const RankShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const RankNumber = styled.div<{ isCurrentAccount: boolean; isTop: boolean }>`
  color: ${({ isCurrentAccount, isTop, theme }) =>
    isCurrentAccount ? theme.primaryPink : isTop ? "#2761a6" : "#8A99AF"};
  font-size: 14px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -70%);
`;

const NftWrapper = styled.div`
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;  
  }`};
`;

const AccountName = styled.span`
  color: ${({ theme }) => theme.text0};
  font-size: 14px;
  font-weight: 600;
  margin-right: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;  
}`};
`;

const Badges = styled(Row)`
  width: initial;
  gap: 6px;
`;

const PaginationWrapper = styled.div`
  padding: 12px 0;
`;

interface RowData {
  rank: string;
  accountAddress: string;
  tradeVolume: string;
  potentialReward: string;
  accountName: string;
}

function Header() {
  return (
    <HeaderWrapper>
      <HeaderText>Rank</HeaderText>
      <HeaderText>Trader</HeaderText>
      <HeaderText>Account Address</HeaderText>
      <HeaderText>Trade Volume</HeaderText>
      <HeaderText>Potential Reward</HeaderText>
    </HeaderWrapper>
  );
}

function ThreeDots() {
  return (
    <DotsWrapper>
      <Dot />
      <Dot />
      <Dot />
    </DotsWrapper>
  );
}

function TableRow({ topBorder, myRank, ...data }: IRowData) {
  const {
    rank,
    accountName,
    badges,
    accountAddress,
    tradeVolume,
    potentialReward,
  } = data as IRowData;

  const isTop = Number(rank) < 4 ? true : false;
  const isCurrentAccount = rank === myRank;

  const getRankImage = (rank: string) => {
    switch (rank) {
      case "1":
        return RankMedal1;
      case "2":
        return RankMedal2;
      case "3":
        return RankMedal3;
      default:
        return DefaultRankMedal;
    }
  };
  const getRankShadowImage = (isCurrentAccount: boolean, isTop: boolean) => {
    if (isCurrentAccount) return ShadowMe;
    if (isTop) return Shadow1;
    return Shadow2;
  };

  const getBadge = (badgeText: string) => {
    switch (badgeText) {
      case "sniper":
        return Sniper;
      case "charger":
        return Charger;
      case "medalist":
        return Medalist;
      case "archer":
        return Archer;
      default:
        return "";
    }
  };

  return (
    <RowWrapper topBorder={topBorder} currentAccount={isCurrentAccount}>
      <div>
        <Rank>
          <RankShadow>
            <Image
              src={getRankShadowImage(isCurrentAccount, isTop)}
              alt={"rank medal"}
            />
          </RankShadow>
          <div>
            <Image src={getRankImage(rank)} alt={"rank medal"} />
          </div>
          <RankNumber isCurrentAccount={isCurrentAccount} isTop={isTop}>
            #{rank}
          </RankNumber>
        </Rank>
      </div>
      <Row>
        <NftWrapper>
          <Image src={SuperSkullDefault} alt={"super skull - default"} />
        </NftWrapper>
        <AccountName>{accountName}</AccountName>
        <Badges>
          {badges &&
            badges.map((badgeText, index) => (
              <span key={index}>
                <Image src={getBadge(badgeText)} alt={badgeText} />
              </span>
            ))}
        </Badges>
      </Row>
      <Row width={"unset"}>
        {accountAddress && (
          <React.Fragment>
            {truncateAddress(accountAddress)}
            <Copy toCopy={accountAddress} text={""} />
          </React.Fragment>
        )}
      </Row>
      <RowText>{tradeVolume ? formatDollarAmount(tradeVolume) : "-"}</RowText>
      <RowText>{potentialReward ? `${potentialReward} BASED` : "-"}</RowText>
    </RowWrapper>
  );
}

function Body({
  leaderData,
  myRank,
  page,
  setPage,
}: {
  leaderData: RowData[];
  myRank: string;
  page: number;
  setPage: (arg0: number) => void;
}) {
  const rowsPerPage = 5;
  const startRowRank = (page - 1) * rowsPerPage;
  const endRowRank = startRowRank + rowsPerPage - 1;

  const myData = leaderData.find((data) => data.rank === myRank);
  const pageCount = Math.ceil(leaderData.length / rowsPerPage);

  const onPageChange = (newPage: number) => {
    let localNewPage;
    if (newPage > pageCount) localNewPage = pageCount;
    else if (newPage < 1) localNewPage = 1;
    else localNewPage = newPage;
    setPage(localNewPage);
  };
  return (
    <>
      {Number(myRank) < startRowRank && myData && (
        <>
          <TableRow topBorder key={myRank} myRank={myRank} {...myData} />
          <ThreeDots />
        </>
      )}
      <div>
        {leaderData.slice(startRowRank, endRowRank + 1).map((data, index) => (
          <TableRow
            key={index}
            topBorder={index === 0}
            myRank={myRank}
            {...data}
          />
        ))}

        {Number(myRank) > endRowRank + 1 && myData && (
          <>
            <ThreeDots />
            <TableRow topBorder key={myRank} myRank={myRank} {...myData} />
          </>
        )}
      </div>
      <PaginationWrapper>
        <CardPagination
          pageCount={pageCount}
          itemsQuantity={leaderData.length}
          currentPage={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
        />
      </PaginationWrapper>
    </>
  );
}

export default function LeaderboardTable({ activeDay }: { activeDay: number }) {
  const { account } = useActiveWagmi();
  const { epochLeaderBoard: currentData, loading } =
    useLeaderBoardData(activeDay);

  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [activeDay]);

  const resultData = currentData.map((item, index) => {
    return {
      rank: (index + 1).toString(),
      accountAddress: item.user,
      accountName: item.name,
      tradeVolume: formatAmount(item.volume),
      potentialReward: formatAmount(item.reward),
    };
  });

  let myRank = (
    resultData.findIndex(
      (inputData) => inputData.accountAddress === account?.toLowerCase()
    ) + 1
  ).toString();

  if (resultData.length > 0 && myRank === "0") {
    resultData.push({
      rank: (resultData.length + 1).toString(),
      accountAddress: account ?? "",
      accountName: "Your Account",
      tradeVolume: "",
      potentialReward: "-",
    });
    myRank = resultData.length.toString();
  } else {
    const rankTarget = parseInt(myRank) - 1;
    resultData[rankTarget] = {
      ...resultData[rankTarget],
      accountName: "Your Account",
    };
  }

  return (
    <div>
      <Header />
      {loading ? (
        <div style={{ margin: "20px 20px 22px 15px" }}>
          <ShimmerAnimation width="auto" height="40px" />
        </div>
      ) : (
        <Body
          leaderData={resultData}
          myRank={myRank}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}
