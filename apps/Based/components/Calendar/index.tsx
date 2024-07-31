import { Card } from "components/Card";
import styled, { css } from "styled-components";
import { Z_INDEX } from "theme";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const InlineModal = styled(Card)<{ isOpen: boolean; x?: string; y?: string }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: absolute;
  padding: unset;
  padding-top: unset;

  transform: ${({ x, y }) => css`
    translateX(${x ?? 0}) translateY(${y ?? 0})
  `};
  z-index: ${Z_INDEX.dropdown};
  margin-top: 10px;
`;

const CustomCalendar = styled(Calendar)`
  .react-calendar__navigation__label,
  .react-calendar__navigation__arrow {
    text-align: center;
    /* Add more styles as needed */
  }
`;

export default function BasedCalender({
  isOpen,
  xPosition = "0",
  yPosition = "0",
  setIsOpen,
  setNewTime,
  setCustomDayActivate,
  currentDate,
}: {
  isOpen: boolean;
  xPosition?: string;
  yPosition?: string;
  setIsOpen: (value: boolean) => void;
  setNewTime: (value: Date) => void;
  setCustomDayActivate?: (value: boolean) => void;
  currentDate: Date | undefined;
}) {
  return (
    <InlineModal isOpen={isOpen} x={xPosition} y={yPosition}>
      <CustomCalendar
        onChange={(data) => {
          if (data) {
            setNewTime(new Date(data.toString()));
            setCustomDayActivate?.(true);
          }
          setIsOpen(false);
        }}
        value={currentDate}
      />
    </InlineModal>
  );
}
