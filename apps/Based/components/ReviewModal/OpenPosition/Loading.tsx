import Image from "next/image";
import styled from "styled-components";

import Column from "components/Column";
import { RowCenter } from "components/Row";
import ActionButton from "./ActionButton";

const SummaryWrap = styled(RowCenter)`
  font-size: 14px;
  color: ${({ theme }) => theme.text0};
  text-align: center;
  font-style: normal;
  font-weight: 400;
`;

const ButtonWrap = styled.div`
  margin-top: 100px;
`;

export default function Loading({ summary }: { summary: React.ReactNode }) {
  return (
    <Column>
      <Image
        src={"/static/images/etc/SimpleLogo.svg"}
        alt="Asset"
        width={72}
        height={78}
      />

      <SummaryWrap>{summary}</SummaryWrap>
      <ButtonWrap>
        <ActionButton />
      </ButtonWrap>
    </Column>
  );
}
