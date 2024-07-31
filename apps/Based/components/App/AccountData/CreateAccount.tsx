import { useCallback, useState } from "react";
import styled from "styled-components";
import Image from "next/legacy/image";

import { useCollateralToken } from "@symmio/frontend-sdk/constants/tokens";
import { truncateAddress } from "@symmio/frontend-sdk/utils/address";
import { useGetTokenWithFallbackChainId } from "@symmio/frontend-sdk/utils/token";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";

import { useAddAccountToContract } from "@symmio/frontend-sdk/callbacks/useMultiAccount";
import {
  useIsTermsAccepted,
  useUserWhitelist,
} from "@symmio/frontend-sdk/state/user/hooks";

import Column from "components/Column";
import { Row, RowCenter, RowEnd, RowStart } from "components/Row";
import {
  Client,
  Wallet,
  Close as CloseIcon,
  DotFlashing,
} from "components/Icons";
import { WEB_SETTING } from "@symmio/frontend-sdk/config";
import TermsAndServices from "components/TermsAndServices";

const Wrapper = styled.div<{ modal?: boolean }>`
  border: none;
  width: 100%;
  min-height: 379px;
  background: ${({ theme }) => theme.bg0};
  ${({ theme }) => theme.mediaWidth.upToLarge`
    width: 100%;
  `};
`;

const Title = styled(RowStart)`
  padding: 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.text0};
`;

const ContentWrapper = styled(Column)`
  padding: 12px;
  position: relative;
`;

export const DepositButtonWrapper = styled.div`
  padding: 1px;
  height: 40px;
  margin-top: 10px;
  width: unset;
  background: ${({ theme }) => theme.border1};
`;

export const DepositButton = styled(RowCenter)<{ disabled?: boolean }>`
  flex-wrap: nowrap;
  height: 100%;
  background: ${({ theme }) => theme.gradLight};

  &:focus,
  &:hover,
  &:active {
    cursor: ${({ disabled }) => !disabled && "pointer"};
    background: ${({ theme }) => theme.hoverGradLight};
  }
`;

export const DepositButtonLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.text0};
`;

const AccountWrapper = styled(Row)`
  height: 40px;
  background: ${({ theme }) => theme.bg4};
  border: 1px solid ${({ theme }) => theme.border1};
  margin-bottom: 16px;
  padding: 10px 12px;
  font-weight: 500;
  font-size: 12px;

  color: ${({ theme }) => theme.text2};
`;

const AccountNameWrapper = styled(AccountWrapper)`
  background: ${({ theme }) => theme.bg4};
  border: 1px solid ${({ theme }) => theme.border1};
  color: ${({ theme }) => theme.text2};
`;

const Input = styled.input<{
  [x: string]: any;
}>`
  height: fit-content;
  width: 90%;
  border: none;
  background: transparent;
  font-size: 12px;
  padding-left: 2px;

  &::placeholder {
    color: ${({ theme }) => theme.text3};
  }

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.text0};
    outline: none;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      font-size: 0.6rem;
    `}
`;

const ImageWrapper = styled(RowCenter)`
  margin-top: 15px;
  margin-bottom: 34px;
`;

const Close = styled.div`
  width: 24px;
  height: 24px;
  padding: 3px 6px;
  cursor: pointer;
  margin: 2px 12px 1px 0px;
  background: ${({ theme }) => theme.bg6};
`;

const DescriptionText = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 16px;

  color: ${({ theme }) => theme.text4};
`;

export default function CreateAccount({ onClose }: { onClose?: () => void }) {
  const { account, chainId } = useActiveWagmi();
  const [name, setName] = useState("");
  const [, setTxHash] = useState("");
  const userWhitelisted = useUserWhitelist();
  const isTermsAccepted = useIsTermsAccepted();
  const [showTerms, setShowTerms] = useState(false);

  const COLLATERAL_TOKEN = useCollateralToken();

  const collateralCurrency = useGetTokenWithFallbackChainId(
    COLLATERAL_TOKEN,
    chainId
  );
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const { callback: addAccountToContractCallback } =
    useAddAccountToContract(name);

  const onAddAccount = useCallback(async () => {
    if (!addAccountToContractCallback) return;
    try {
      setAwaitingConfirmation(true);
      const txHash = await addAccountToContractCallback();
      setAwaitingConfirmation(false);
      if (txHash) setTxHash(txHash.hash);
      onClose && onClose();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
      } else {
        console.debug(e);
      }
    }
    setAwaitingConfirmation(false);
  }, [addAccountToContractCallback, onClose]);

  function getActionButton() {
    if (awaitingConfirmation) {
      return (
        <DepositButtonWrapper>
          <DepositButton>
            <DepositButtonLabel>Awaiting Confirmation</DepositButtonLabel>
            <DotFlashing />
          </DepositButton>
        </DepositButtonWrapper>
      );
    }

    if (WEB_SETTING.showSignModal && !isTermsAccepted) {
      return (
        <DepositButtonWrapper>
          <DepositButton onClick={() => setShowTerms(true)}>
            <DepositButtonLabel>Accept Terms of Service</DepositButtonLabel>
          </DepositButton>
        </DepositButtonWrapper>
      );
    }

    if (userWhitelisted === false) {
      return (
        <DepositButtonWrapper>
          <DepositButton>
            <DepositButtonLabel>You are not whitelisted</DepositButtonLabel>
            <DotFlashing />
          </DepositButton>
        </DepositButtonWrapper>
      );
    }

    return (
      <DepositButtonWrapper>
        <DepositButton onClick={() => onAddAccount()}>
          <DepositButtonLabel>
            {name === "" ? "Enter account name" : "Create Account"}
          </DepositButtonLabel>
        </DepositButton>
      </DepositButtonWrapper>
    );
  }

  return (
    <Wrapper modal={onClose ? true : false}>
      <Row>
        <Title>Create Account</Title>
        <RowEnd>
          {onClose && (
            <Close>
              {" "}
              <CloseIcon
                size={12}
                onClick={onClose}
                style={{ marginRight: "12px" }}
              />
            </Close>
          )}
        </RowEnd>
      </Row>
      <ContentWrapper>
        <ImageWrapper>
          <Image
            src={"/static/images/etc/BasedTableau.svg"}
            alt="based-tableau"
            width={332}
            height={76}
          />
        </ImageWrapper>
        <AccountWrapper>
          {account && truncateAddress(account)}
          <RowEnd>
            <Wallet />
          </RowEnd>
        </AccountWrapper>
        <AccountNameWrapper>
          <Input
            autoFocus
            type="text"
            placeholder={"Account Name (it will be saved on chain)"}
            spellCheck="false"
            onBlur={() => null}
            value={name}
            minLength={1}
            maxLength={20}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <RowEnd width={"10%"}>
            <Client />
          </RowEnd>
        </AccountNameWrapper>

        {getActionButton()}
        {onClose && (
          <DescriptionText>{`Create Account > Deposit ${collateralCurrency?.symbol} > Enjoy Trading`}</DescriptionText>
        )}
      </ContentWrapper>
      {showTerms && <TermsAndServices onDismiss={() => setShowTerms(false)} />}
    </Wrapper>
  );
}
