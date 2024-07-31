import React, { useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import STAKING_ICON from "/public/static/images/staking/Icon.svg";
import TRADE2EARN_ICON from "/public/static/images/pages/Trade2Earn.svg";

import { Z_INDEX } from "theme";
import useOnOutsideClick from "lib/hooks/useOnOutsideClick";

import {
  Analytics,
  Client,
  MarketPair,
  NavToggle,
  Trade,
  Link as ExternalLinkIcon,
} from "components/Icons";
import { Card } from "components/Card";
import { RowBetween, RowEnd } from "components/Row";
import { NavButton } from "components/Button";
import { ExternalLink } from "components/Link";
import Image from "next/image";

const Container = styled(RowEnd)`
  overflow: hidden;
  flex-flow: row nowrap;
  width: unset;
  height: 40px;
`;

const InlineModal = styled(Card)<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: absolute;
  width: 216px;
  height: 305px;
  transform: translateX(-215px) translateY(20px);
  z-index: ${Z_INDEX.modal};
  gap: 8px;
  padding: 0px;
  margin-top: 10px;
  border: 2px solid ${({ theme }) => theme.text0};
  background: ${({ theme }) => theme.bg2};

  & > * {
    &:first-child {
      margin-top: 8px;
    }
  }
`;

const Row = styled(RowBetween)<{ active?: boolean }>`
  width: unset;
  height: 40px;
  padding: 0px 11px;
  color: ${({ theme }) => theme.text0};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.text1};
  }

  ${({ active, theme }) =>
    active &&
    ` background: ${theme.bg1};
      pointer-events: none;
  `};
`;

const Button = styled(NavButton)`
  padding: 0px 8px;
`;

export default function Menu() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggle = () => setIsOpen((prev) => !prev);
  useOnOutsideClick(ref, () => setIsOpen(false));

  return (
    <Container ref={ref}>
      <Button onClick={() => toggle()}>
        <NavToggle width={24} height={10} />
      </Button>
      {/* <Image src={BURGER_ICON} alt="burger-icon" onClick={() => toggle()} /> */}
      <div>
        <InlineModal isOpen={isOpen} onClick={() => toggle()}>
          <Link href="/trade" passHref>
            <Row active={router.route.includes("/trade")}>
              <div>Trade</div>
              <Trade size={20} />
            </Row>
          </Link>
          <ExternalLink href="https://analytics.based.markets/home">
            <Row>
              <div>
                Analytics
                <ExternalLinkIcon style={{ transform: "translateX(8px)" }} />
              </div>
              <Analytics />
            </Row>
          </ExternalLink>

          <Link href="/staking" passHref>
            <Row active={router.route.includes("/staking")}>
              <div>Staking</div>
              <Image
                src={STAKING_ICON}
                width={22}
                height={20}
                alt={"staking icon"}
              />
            </Row>
          </Link>

          <Link href="/dibs" passHref>
            <Row active={router.route.includes("/dibs")}>
              <div>Trade2Earn</div>
              <Image
                src={TRADE2EARN_ICON}
                width={39}
                height={20}
                alt={"trade2earn icon"}
              />
            </Row>
          </Link>

          <Link href="/my-account" passHref>
            <Row active={router.route.includes("/my-account")}>
              <div>My Account</div>
              <Client />
            </Row>
          </Link>
          <Link href="/markets" passHref>
            <Row active={router.route.includes("/markets")}>
              <div>Markets</div>
              <MarketPair />
            </Row>
          </Link>
        </InlineModal>
      </div>
    </Container>
  );
}
