import { useState, createContext, useContext } from "react";
import styled from "styled-components";

import { ChevronDown, IconWrapper } from "components/Icons";
import ArrowRightTriangle from "components/Icons/ArrowRightTriangle";
import { Card } from "components/Card";
import { RowBetween, RowEnd } from "components/Row";

const Container = styled(RowEnd)`
  height: 48px;
  padding: 0 24px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 0 12px;
  `}
  position: relative;
`;

const Center = styled.div`
  width: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Pagination = styled(RowBetween)`
  background-color: ${({ theme }) => theme.bg5};
  border: 1px solid ${({ theme }) => theme.border1};
  padding: 5px 8px;
  font-size: 14px;
`;

const RowPerPage = styled(Pagination)`
  width: 200px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.bg2};
  padding: 12px;
  font-size: 12px;
  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 64px;
  `}
`;
const RowPerPageText = styled.div`
  font-size: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `}
`;
const ArrowWrapper = styled.button<{ left?: boolean; active?: boolean }>`
  transform: rotate(${({ left }) => (left ? "180deg" : "0")});
  opacity: ${({ active }) => (active ? "1" : "0.5")};
  &:hover {
    cursor: ${({ active }) => (active ? "pointer" : "default")};
  }
`;

const ChevronWrapper = styled.div`
  width: 10%;
  height: 100%;
  text-align: center;
`;

const Chevron = styled(ChevronDown)<{ open: boolean }>`
  transform: rotateX(${({ open }) => (open ? "180deg" : "0deg")});
  transition: 0.5s;
`;

const HoverWrapper = styled(Card)`
  padding: 0px;
  width: 200px;
  position: absolute;
  transform: translateY(-4px);
  z-index: 1;
  background: ${({ theme }) => theme.bg2};
  border-top: 1px solid ${({ theme }) => theme.bg5};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 64px;
  `};
`;

const HoverItem = styled.div`
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.bg0};
  }
`;
const HoverItemContent = styled.div`
  padding: 12px;
  font-size: 14px;
  font-weight: 400;
`;

interface IPageInfo {
  currentPage: number;
  itemsQuantity: number;
  pageCount: number;
  onPageChange: (...args: any) => any;
  rowsPerPage: number;
  onRowsPerPageChange: ((...args: any) => any) | undefined;
}

const PaginationContext = createContext<IPageInfo>({
  currentPage: 1,
  itemsQuantity: 7,
  pageCount: 1,
  onPageChange: () => {
    return;
  },
  rowsPerPage: 7,
  onRowsPerPageChange: () => {
    return;
  },
});

function Arrow({ newPage, left }: { newPage: number; left?: boolean }) {
  const { currentPage, onPageChange, pageCount } =
    useContext(PaginationContext);
  const isActive = left ? currentPage > 1 : currentPage < pageCount;
  return (
    <ArrowWrapper
      active={isActive}
      left={left}
      onClick={() => isActive && onPageChange(newPage)}
    >
      <IconWrapper size={"40px"}>
        <ArrowRightTriangle width={10} height={18} />
      </IconWrapper>
    </ArrowWrapper>
  );
}

function PaginationNavigation() {
  const { itemsQuantity, currentPage, rowsPerPage } =
    useContext(PaginationContext);
  return (
    <Center>
      <Pagination width={"204px"} gap={"12px"}>
        <Arrow newPage={currentPage - 1} left />
        <div>
          <span>
            {(currentPage - 1) * rowsPerPage + 1}-
            {Math.min(currentPage * rowsPerPage, itemsQuantity)}
          </span>{" "}
          <span>of</span> <span>{itemsQuantity}</span>
        </div>
        <Arrow newPage={currentPage + 1} />
      </Pagination>
    </Center>
  );
}

function PaginationPerPageCard() {
  const { currentPage, rowsPerPage, onRowsPerPageChange } =
    useContext(PaginationContext);
  const [cardOpen, setCardOpen] = useState<boolean>(false);
  return (
    <div>
      <RowPerPage
        gap="4px"
        onClick={() => setCardOpen((prevCardOpen) => !prevCardOpen)}
      >
        <RowBetween>
          <RowPerPageText>Rows per page</RowPerPageText>
          <span>{rowsPerPage}</span>
        </RowBetween>
        <ChevronWrapper>
          <Chevron open={cardOpen} />
        </ChevronWrapper>
      </RowPerPage>
      {cardOpen && (
        <HoverWrapper onClick={() => setCardOpen(false)}>
          {[5, 10, 20].map((newRowsPerPage) => (
            <HoverItem
              key={newRowsPerPage}
              onClick={() =>
                onRowsPerPageChange &&
                onRowsPerPageChange(currentPage, rowsPerPage, newRowsPerPage)
              }
            >
              <HoverItemContent>{newRowsPerPage}</HoverItemContent>
            </HoverItem>
          ))}
        </HoverWrapper>
      )}
    </div>
  );
}

export default function CardPagination({
  pageCount,
  itemsQuantity,
  currentPage,
  onPageChange,
  hasCard,
  rowsPerPage,
  onRowsPerPageChange,
}: {
  pageCount: number;
  itemsQuantity: number;
  currentPage: number;
  onPageChange: (...args: any) => any;
  hasCard?: boolean;
  rowsPerPage: number;
  onRowsPerPageChange?: (...args: any) => any;
}) {
  if (hasCard) {
    if (!onRowsPerPageChange)
      throw new Error("Rows per page value or action is not entered");
  }
  const pageInfo: IPageInfo = {
    currentPage,
    itemsQuantity,
    pageCount,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
  };
  return (
    <Container>
      <PaginationContext.Provider value={pageInfo}>
        <PaginationNavigation />

        {hasCard && <PaginationPerPageCard />}
      </PaginationContext.Provider>
    </Container>
  );
}
