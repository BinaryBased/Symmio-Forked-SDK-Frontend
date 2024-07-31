import { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import useOnOutsideClick from "lib/hooks/useOnOutsideClick";

import Calendar from "components/Calendar";
import { RowBetween, RowEnd } from "components/Row";
import LeaderboardTable from "../LeaderboardTable";
import { RefreshContextProvider } from "context/RefreshContext";

import {
  getFormattedDay,
  getFormattedDayMonth,
  getFormattedMonth,
} from "utils/date";
import { useDibs } from "lib/hooks/Dibs/useDibs";
import { useIsRewardMinted } from "lib/hooks/Dibs/useDibsRewards";
import { useFillDibsRewarder } from "callbacks/useFillsDibsRewarder";

const Container = styled.div`
  padding-top: 12px;
  background: ${({ theme }) => theme.primaryGradientBg};
  border: 1px solid ${({ theme }) => theme.border1};
`;
const Date = styled(RowBetween)`
  width: 160px;
  background-color: ${({ theme }) => theme.bg9};
  border: 1px solid ${({ theme }) => theme.border1};
  padding: 4px 8px 4px 12px;
  font-size: 14px;
  height: 34px;
  color: ${({ theme }) => theme.border1};

  &:hover {
    cursor: pointer;
  }
`;
const FillRewardComponent = styled(Date)`
  width: 108px;
  background-color: ${({ theme }) => theme.bg9};
  border: 1px solid ${({ theme }) => theme.border1};
  padding: 4px 8px 4px 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.border1};
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const WrapperDate = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid ${({ theme }) => theme.border1};
  color: ${({ theme }) => theme.bg0};
`;

const WrapperMonth = styled.div`
  height: 10px;
  background-color: ${({ theme }) => theme.border1};
  color: ${({ theme }) => theme.white};
  text-align: center;
  padding-bottom: 1px;
  font-size: 7.5px;
`;

const WrapperDay = styled.div`
  color: ${({ theme }) => theme.border1};
  text-align: center;
  font-size: 10px;
`;

const ContainerCalender = styled.div`
  display: inline-flex;
  align-items: center;
  height: 100%;
`;

export default function Leaderboard() {
  const [showCalender, setShowCalender] = useState(false);
  const [customDay, setCustomDay] = useState(false);
  const { activeDay, setCustomActiveDay, getActiveDate } = useDibs();

  console.log({ activeDay, customDay, showCalender });

  const ref_calender = useRef(null);
  useOnOutsideClick(ref_calender, () => setShowCalender(false));

  return (
    <RefreshContextProvider>
      <Container>
        <RowBetween padding={"0 16px"}>
          <div>Leaderboard / {getFormattedDayMonth(getActiveDate())}</div>
          <RowEnd width="unset">
            <MintRewards day={activeDay} />
            <Date
              onClick={() => {
                if (!showCalender) setShowCalender(true);
              }}
            >
              <div>Filter by Date</div>{" "}
              <WrapperDate>
                <WrapperMonth>
                  {customDay ? getFormattedMonth(getActiveDate(), true) : ""}
                </WrapperMonth>{" "}
                <WrapperDay>
                  {customDay ? getFormattedDay(getActiveDate()) : " "}
                </WrapperDay>
              </WrapperDate>
              <ContainerCalender ref={ref_calender}>
                <Calendar
                  xPosition="-343px"
                  yPosition="150px"
                  isOpen={showCalender}
                  setIsOpen={setShowCalender}
                  setNewTime={setCustomActiveDay}
                  setCustomDayActivate={setCustomDay}
                  currentDate={getActiveDate()}
                />
              </ContainerCalender>
            </Date>
          </RowEnd>
        </RowBetween>
        <LeaderboardTable activeDay={activeDay} />
      </Container>
    </RefreshContextProvider>
  );
}

function MintRewards({ day }: { day: number }) {
  const isMinted = useIsRewardMinted(day);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const { callback: rewardCallback } = useFillDibsRewarder(day);

  const handleAction = useCallback(async () => {
    if (!rewardCallback || awaitingConfirmation) {
      return;
    }

    try {
      setAwaitingConfirmation(true);
      await rewardCallback();
      setAwaitingConfirmation(false);
    } catch (e) {
      setAwaitingConfirmation(false);
      if (e instanceof Error) {
        console.error(e);
      } else {
        console.error(e);
      }
    }
  }, [rewardCallback, awaitingConfirmation]);

  return isMinted === false ? (
    <FillRewardComponent onClick={handleAction} disabled={awaitingConfirmation}>
      Fill Rewarder
    </FillRewardComponent>
  ) : null;
}
