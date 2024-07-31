import Image from "next/image";
import styled from "styled-components";

import PlaidVector from "/public/static/images/dibs/plaid.svg";
import LaserSkeleton from "/public/static/images/dibs/laser-skeleton.svg";
import HeaderTitle from "/public/static/images/dibs/dibs-header-title.svg";
import PinkSun from "/public/static/images/dibs/pink-sun.svg";
import useEpochTimer from "lib/hooks/useEpochTimer";

const Container = styled.div`
  height: 138px;
  background: ${({ theme }) => theme.primaryGradientBg};
  border: 1px solid ${({ theme }) => theme.border1};
  overflow: hidden;
  position: relative;
`;

const Plaid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Skeleton = styled.div`
  position: absolute;
  left: 0;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Sun = styled.div`
  position: absolute;
  right: 0;
`;

const TimerWrapper = styled.div`
  width: 232px;
  padding: 12px 27px;
  background-color: ${({ theme }) => theme.bg0};
  color: ${({ theme }) => theme.primaryPink};
  font-weight: 600;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

function Timer() {
  const { hours, minutes, seconds } = useEpochTimer();
  return (
    <TimerWrapper>
      Epoch Flip in: {hours}:{minutes}:{seconds}
    </TimerWrapper>
  );
}

export default function Header() {
  return (
    <Container>
      <Sun>
        <Image src={PinkSun} alt={"Pink Sun"} />
      </Sun>
      <Plaid>
        <Image src={PlaidVector} alt={"plaid"} />
      </Plaid>
      <Skeleton>
        <Image src={LaserSkeleton} alt={"skeleton emitting laser"} />
      </Skeleton>
      <Title>
        <Image src={HeaderTitle} alt={"Based X Dibs"} />
      </Title>
      <Timer />
    </Container>
  );
}
