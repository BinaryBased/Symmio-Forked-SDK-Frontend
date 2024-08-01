import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { ChainInfo } from "@symmio/frontend-sdk/constants/chainInfo";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";

import { NavButton } from "components/Button";
import { ChevronDown } from "components/Icons";
import ImageWithFallback from "components/ImageWithFallback";
import { isMobile } from "react-device-detect";
import { NetworksModal } from "./NetworksModal";
import useOnOutsideClick from "lib/hooks/useOnOutsideClick";
import { getChainLogo } from "utils/chainLogo";
import {
  useAllMultiAccountAddresses,
  useV3Ids,
} from "@symmio/frontend-sdk/state/chains/hooks";
import { useSetFEName } from "@symmio/frontend-sdk/state/user/hooks";
import { FALLBACK_CHAIN_ID } from "constants/chains/chains";

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  height: 100%;
`;

const Button = styled(NavButton)`
  gap: 4px;
  width: ${({ width }) => (width ? width : "40px")};
  font-size: 12px;
  padding: 0px 3px;
  cursor: default;

  /* ${({ theme }) => theme.mediaWidth.upToMedium`
    & > * {
      &:nth-child(2) {
        display: none;
      }
    }
  `}; */
`;

const Chevron = styled(ChevronDown)<{ open: boolean }>`
  transform: rotateX(${({ open }) => (open ? "180deg" : "0deg")});
  transition: 0.5s;
`;

export default function Web3Network() {
  const ref = useRef(null);
  const v3_ids = useV3Ids();
  const MULTI_ACCOUNT_ADDRESS = useAllMultiAccountAddresses();
  const { account, chainId } = useActiveWagmi();
  const setFrontEndName = useSetFEName();
  const [networksModal, toggleNetworksModal] = useState(false);
  useOnOutsideClick(ref, () => toggleNetworksModal(false));

  const isMultiChain = useMemo(() => {
    if (
      chainId &&
      MULTI_ACCOUNT_ADDRESS &&
      Object.keys(MULTI_ACCOUNT_ADDRESS).length > 0
    ) {
      return (
        MULTI_ACCOUNT_ADDRESS[chainId] &&
        Object.keys(MULTI_ACCOUNT_ADDRESS[chainId]).length > 1
      );
    }
    return false;
  }, [MULTI_ACCOUNT_ADDRESS, chainId]);

  useEffect(() => {
    const customChainId = chainId ?? FALLBACK_CHAIN_ID;
    if (
      MULTI_ACCOUNT_ADDRESS[customChainId] &&
      Object.keys(MULTI_ACCOUNT_ADDRESS[customChainId]).length === 1
    ) {
      setFrontEndName(Object.keys(MULTI_ACCOUNT_ADDRESS[customChainId])[0]);
    }
  }, [MULTI_ACCOUNT_ADDRESS, chainId, setFrontEndName]);

  const onClickButton = () => {
    if (isMultiChain) toggleNetworksModal(!networksModal);
  };

  const Chain = useMemo(() => {
    return chainId && chainId in ChainInfo ? ChainInfo[chainId] : null;
  }, [chainId]);

  if (!account || !chainId || !Chain || !v3_ids.includes(chainId)) {
    return null;
  }

  return isMobile ? (
    <>
      <Button onClick={onClickButton}>
        <ImageWithFallback
          src={getChainLogo(chainId)}
          alt={Chain.label}
          width={25}
          height={25}
        />
        {isMultiChain && <Chevron open={networksModal} />}
      </Button>
      <NetworksModal
        isModal
        isOpen={networksModal}
        onDismiss={() => toggleNetworksModal(false)}
      />
    </>
  ) : (
    <Container ref={ref}>
      {networksModal && (
        <div>
          <NetworksModal
            isOpen={networksModal}
            onDismiss={() => toggleNetworksModal(false)}
          />
        </div>
      )}

      <Button onClick={onClickButton} width={isMultiChain ? "52px" : undefined}>
        <ImageWithFallback
          src={getChainLogo(chainId)}
          alt={Chain.label}
          width={28}
          height={28}
        />
        {isMultiChain && <Chevron open={networksModal} />}
      </Button>
    </Container>
  );
}
