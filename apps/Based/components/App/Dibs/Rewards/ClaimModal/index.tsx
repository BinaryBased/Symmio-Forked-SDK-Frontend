import React from "react";
import styled from "styled-components";

import { Modal } from "components/Modal";
import ClaimComponent from "./ClaimComponent";
import { RewardData } from "../../RewardsTable";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 100%;
`;

export default function ClaimModal({
  isOpen,
  onDismiss,
  data,
}: {
  isOpen: boolean;
  onDismiss: (isSubmitted?: boolean) => void;
  data: RewardData;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={() => onDismiss()}
      onEscapeKeydown={() => onDismiss()}
    >
      <Wrapper>
        <ClaimComponent onClose={onDismiss} data={data} />
      </Wrapper>
    </Modal>
  );
}
