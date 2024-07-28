import Image from "next/image";
import styled, { css, useTheme } from "styled-components";

import LPStakeTitle from "/public/static/images/staking/LPStake.svg";
import BasedTokensFalling from "/public/static/images/staking/BasedTokensFalling.svg";

import useCurrencyLogo from "lib/hooks/useCurrencyLogo";

import Column from "components/Column";
import { RowStart, Row, RowEnd, RowBetween } from "components/Row";
import External from "components/Icons/External";

import { ExternalLink } from "components/Link";
import { AerodromeLogo, VelocimeterLogo } from "components/Icons";

const Container = styled(Column)`
  position: relative;
  padding: 16px 24px 0;
  justify-content: space-between;
  background: ${({ theme }) => theme.blueGradientBg};
  border: 1px solid ${({ theme }) => theme.border1};

  grid-column: 1 / -1;
  ${({ theme }) => theme.mediaWidth.upToMedium`
      grid-column: auto;
  `}
`;

const FallingTokensWrapper = styled.div<{ flipped?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ flipped }) => (flipped ? "left: 24px;" : "right: 24px;")}
  transform: translateY(-50%) ${({ flipped }) => flipped && "scale(-1, 1)"};
`;

const HeaderWrapper = styled(Column)`
  color: ${({ theme }) => theme.text2};
  font-size: 14px;

  align-items: center;
  gap: 16px;

  z-index: 1;
`;

const TableWrapper = styled(Column)`
  width: 780px;
  margin: auto;
  color: ${({ theme }) => theme.text7};
  border-bottom: 1px solid ${({ theme }) => theme.border1};
  font-size: 12px;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `}
`;

const RowWrapper = styled(Row)`
  background-color: ${({ theme }) => theme.bg4 + "88"};
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.border1};
  border-bottom: none;
  gap: 8px;
`;

const Col = styled.div<{ flex?: string }>`
  flex: ${({ flex }) => flex || "1"};
`;

const RowContent = styled(RowStart)`
  & > * {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      ${css`
        &:nth-child(3) {
          display: none;
        }
      `}
    `}

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      ${css`
        &:nth-child(2) {
          display: none;
        }
      `}
    `}
  }
`;

const Tokens = styled(Row)`
  width: auto;
  & > * {
    :not(:first-child) {
      margin-left: -8px !important;
    }
    :nth-child(n) {
      min-width: 24px;
    }
  }
`;

const Name = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.text0};
`;

const RowText = styled.span<{ isBlue?: boolean }>`
  font-weight: 600;
  color: ${({ theme, isBlue }) => (isBlue ? theme.primaryBlue1 : theme.green7)};
`;

const FarmButton = styled.button<{ isBlue?: boolean }>`
  width: 164px;
  font-size: 10px;
  font-weight: 600;
  box-sizing: border-box;
  color: ${({ isBlue, theme }) => (isBlue ? theme.blue4 : theme.green5)};
  background: ${({ isBlue, theme }) => (isBlue ? theme.blue5 : theme.green6)};
  border: 1px solid
    ${({ isBlue, theme }) => (isBlue ? theme.blue4 : theme.green5)};
  padding: ${({ isBlue }) => `8px ${isBlue ? "12px" : "8px"} 8px 8px`};
`;

const FarmTitle = styled.span`
  margin-right: 6px;
`;

export default function LPStake() {
  return (
    <Container>
      <FallingTokens />
      <FallingTokens flipped />
      <Header />
      <TableWrapper>
        <LPRow name="vAMM-WETH/BASED" type="aerodrome" />
        <LPRow name="vAMM-WETH/BASED" type="velocimeter" />
      </TableWrapper>
    </Container>
  );
}

function FallingTokens({ flipped }: { flipped?: boolean }) {
  return (
    <FallingTokensWrapper flipped={flipped}>
      <Image src={BasedTokensFalling} alt={"Based tokens falling"} />
    </FallingTokensWrapper>
  );
}

function Header() {
  return (
    <HeaderWrapper>
      <Image src={LPStakeTitle} alt={"LP Stake"} />
      <span>Add Liquidity to these WETH/BASED pools to earn.</span>
    </HeaderWrapper>
  );
}

function LPRow({
  name,
  apr,
  votingBribe,
  type,
}: {
  name: string;
  type: "aerodrome" | "velocimeter";
  apr?: string;
  votingBribe?: string;
}) {
  const theme = useTheme();
  const ethLogo = useCurrencyLogo("ETH");
  const basedLogo = useCurrencyLogo("BASED");
  const link =
    type === "aerodrome"
      ? "https://aerodrome.finance"
      : "https://www.velocimeter.xyz";

  return (
    <RowWrapper>
      <Col flex="2">
        <RowContent gap="24px">
          <RowStart gap="8px" width="auto">
            <Tokens>
              <Image
                src={basedLogo}
                alt={"based logo"}
                width={"32"}
                height={"32"}
              />
              <Image src={ethLogo} alt="eth logo" width={"32"} height={"32"} />
            </Tokens>
            <Name>{name}</Name>
          </RowStart>
          {apr && <RowText isBlue={type === "aerodrome"}>APR: {apr}%</RowText>}
          {votingBribe && (
            <RowText isBlue={type === "aerodrome"}>
              Voting Bribe: {votingBribe}% Trading Fees
            </RowText>
          )}
        </RowContent>
      </Col>
      <Col>
        <RowEnd gap="12px">
          <ExternalLink href={link}>
            <FarmButton isBlue={type === "aerodrome"}>
              <RowBetween>
                <div>
                  <FarmTitle>
                    Farm on {`${type.at(0)?.toUpperCase()}${type.slice(1)}`}{" "}
                  </FarmTitle>
                  <External
                    color={type === "aerodrome" ? theme.blue4 : theme.green5}
                  />
                </div>
                {type === "aerodrome" ? <AerodromeLogo /> : <VelocimeterLogo />}
              </RowBetween>
            </FarmButton>
          </ExternalLink>
        </RowEnd>
      </Col>
    </RowWrapper>
  );
}
