import { useRef, useState } from "react";
import styled from "styled-components";

import { getFormattedDay, getFormattedMonth } from "utils/date";

import useOnOutsideClick from "lib/hooks/useOnOutsideClick";

import Copy from "components/Copy";
import RewardsTable from "../RewardsTable";
import Calender from "components/Calendar";
import { Row, RowBetween } from "components/Row";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { truncateAddress } from "@symmio/frontend-sdk/utils/address";
import { useDibs } from "lib/hooks/Dibs/useDibs";

const Container = styled.div`
  padding-top: 12px;
  background: ${({ theme }) => theme.primaryGradientBg};
  border: 1px solid ${({ theme }) => theme.border1};
`;

const LeftWrapper = styled(RowBetween)`
  width: unset;
`;

const AccountAddress = styled(Row)`
  color: #697a9c;
  width: unset;
`;

const Date = styled(RowBetween)`
  width: 160px;
  background-color: ${({ theme }) => theme.bg9};
  border: 1px solid ${({ theme }) => theme.border1};
  padding: 4px 8px 4px 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.border1};

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

export default function Rewards() {
  const { account } = useActiveWagmi();
  const [showCalender, setShowCalender] = useState(false);
  const [customDay, setCustomDay] = useState(false);
  const { activeDay, setCustomActiveDay, getActiveDate, getCustomDate } =
    useDibs();
  const ref_calender = useRef(null);
  useOnOutsideClick(ref_calender, () => setShowCalender(false));

  return (
    <Container>
      <RowBetween padding={"0 16px"}>
        <LeftWrapper>
          {account && (
            <AccountAddress>
              {truncateAddress(account)}
              <Copy toCopy={account} text={""} />
            </AccountAddress>
          )}
        </LeftWrapper>
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
            <Calender
              xPosition="-343px"
              yPosition="150px"
              isOpen={showCalender}
              setIsOpen={setShowCalender}
              setNewTime={setCustomActiveDay}
              setCustomDayActivate={setCustomDay}
              currentDate={customDay ? getActiveDate() : undefined}
            />
          </ContainerCalender>
        </Date>
      </RowBetween>
      <RewardsTable
        selectedDay={activeDay}
        customDayActive={customDay}
        getCustomDate={getCustomDate}
      />
    </Container>
  );
}
