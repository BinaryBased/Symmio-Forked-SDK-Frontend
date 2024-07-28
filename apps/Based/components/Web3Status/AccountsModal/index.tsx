import styled from "styled-components";
import { lighten } from "polished";

import { Account as AccountType } from "@symmio/frontend-sdk/types/user";

import { useAppDispatch } from "@symmio/frontend-sdk/state";
import { updateAccount } from "@symmio/frontend-sdk/state/user/actions";
import { useActiveAccountAddress } from "@symmio/frontend-sdk/state/user/hooks";

import { RowCenter } from "components/Row";
import CreateAccountModal from "components/ReviewModal/CreateAccountModal";
import Account from "./Account";
import {
  useCreateAccountModalToggle,
  useDepositModalToggle,
  useModalOpen,
} from "@symmio/frontend-sdk/state/application/hooks";
import { ApplicationModal } from "@symmio/frontend-sdk/state/application/reducer";
import { useBalanceInfos } from "@symmio/frontend-sdk/hooks/useAccounts";
import {
  DepositButton,
  DepositButtonLabel,
  DepositButtonWrapper,
} from "components/App/AccountData/CreateAccount";
import { useCollateralToken } from "@symmio/frontend-sdk/constants";
import { useGetTokenWithFallbackChainId } from "@symmio/frontend-sdk/utils/token";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";

const HoverWrapper = styled.div`
  padding: 0px 8px 12px 8px;
  width: clamp(200px, 360px, 99%);
  max-height: 330px;
  position: absolute;
  top: 48px;
  right: 0;
  background: ${({ theme }) => theme.bg1};
  border: 1px solid ${({ theme }) => theme.border3};
  overflow: scroll;
`;

const GradientButtonWrapper = styled.div`
  padding: 1px;
  height: 40px;
  margin-top: 10px;
  width: unset;
  background: ${({ theme }) => theme.primaryPink};
`;

const GradientColorButton = styled(RowCenter)<{ disabled?: boolean }>`
  flex-wrap: nowrap;
  height: 100%;
  background: ${({ theme }) => theme.bgPink1};

  &:focus,
  &:hover,
  &:active {
    cursor: ${({ disabled }) => !disabled && "pointer"};
    background: ${({ theme }) => lighten(0.03, theme.bgPink1)};
  }
`;

const GradientButtonLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.primaryPink};
`;

export default function AccountsModal({
  data,
  onDismiss,
}: {
  data: AccountType[];
  onDismiss: () => void;
}) {
  const { chainId } = useActiveWagmi();
  const activeAccountAddress = useActiveAccountAddress();
  const dispatch = useAppDispatch();
  const toggleDepositModal = useDepositModalToggle();
  const showCreateAccountModal = useModalOpen(ApplicationModal.CREATE_ACCOUNT);
  const toggleCreateAccountModal = useCreateAccountModalToggle();
  const { balanceInfo, balanceInfoStatus } = useBalanceInfos();

  const COLLATERAL_TOKEN = useCollateralToken();
  const collateralCurrency = useGetTokenWithFallbackChainId(
    COLLATERAL_TOKEN,
    chainId
  );

  const onClick = (account: AccountType) => {
    dispatch(updateAccount(account));
    onDismiss();
  };

  function getInnerContent() {
    return (
      <div>
        {data.map((account, index) => {
          return (
            <Account
              account={account}
              key={index}
              active={
                activeAccountAddress
                  ? activeAccountAddress === account.accountAddress
                  : false
              }
              balanceInfo={balanceInfo[index]}
              balanceInfoStatus={balanceInfoStatus}
              onClick={() => onClick(account)}
            />
          );
        })}
        <DepositButtonWrapper>
          <DepositButton onClick={() => toggleDepositModal()}>
            <DepositButtonLabel>
              Deposit {collateralCurrency?.symbol}
            </DepositButtonLabel>
          </DepositButton>
        </DepositButtonWrapper>
        <GradientButtonWrapper onClick={toggleCreateAccountModal}>
          <GradientColorButton>
            <GradientButtonLabel>Create New Account</GradientButtonLabel>
          </GradientColorButton>
        </GradientButtonWrapper>
      </div>
    );
  }

  return (
    <HoverWrapper>
      {getInnerContent()}
      {showCreateAccountModal && <CreateAccountModal />}
    </HoverWrapper>
  );
}
