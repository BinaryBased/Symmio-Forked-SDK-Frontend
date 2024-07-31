import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import axios from "axios";

import { MuonVerificationData } from "types/dibs";
import { useDibsInfo } from "lib/hooks/Dibs/useDibs";
import useDibsClaim from "callbacks/useDibsClaim";

import Column from "components/Column";
import { Row, RowCenter, RowEnd, RowStart } from "components/Row";
import { Close as CloseIcon, RewardLogo } from "components/Icons";
import MainButton from "components/Button/MainButton";
import { DotFlashing } from "components/Icons";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { RewardData } from "components/App/Dibs/RewardsTable";

const Wrapper = styled.div<{ modal?: boolean }>`
  border: none;
  width: 100%;
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

const DateText = styled(RowStart)`
  font-weight: 500;
  font-size: 12px;
  line-height: 19px;
  color: ${({ theme }) => theme.text0};
`;

const ContentWrapper = styled(Column)`
  padding: 12px;
  position: relative;
`;

const AccountWrapper = styled(Row)`
  height: 40px;
  margin-bottom: 36px;
  padding: 10px 12px;
  font-weight: 500;
  font-size: 12px;

  background: ${({ theme }) => theme.bg4};
  border: 1px solid ${({ theme }) => theme.border1};
  color: ${({ theme }) => theme.text2};
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

const RewardText = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.primaryPink};
  margin-right: 10px;
`;

export default function ClaimComponent({
  onClose,
  data,
}: {
  onClose?: (isSubmitted?: boolean) => void;
  data: RewardData;
}) {
  const { account } = useActiveWagmi();
  const { projectId } = useDibsInfo();

  const mounted = useRef(false);
  const [loading, setLoading] = useState(false);

  const { callback: claimAllCallback } = useDibsClaim();

  const claim = useCallback(async () => {
    if (loading) return;
    if (!projectId) return;
    setLoading(true);
    try {
      const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_REACT_APP_MUON_API_URL,
      });
      const verificationData = await axiosInstance.get<MuonVerificationData>(
        `/v1/?app=dibsGlobal&method=userVolume&params[projectId]=${projectId}&params[day]=${data.dateDay}&params[pair]=0x0000000000000000000000000000000000000000&params[user]=${account}`
      );
      console.log("verificationData", verificationData);
      await claimAllCallback?.(verificationData.data);
    } catch (e) {
      console.log("claim failed");
      console.log(e);
    }
    if (mounted.current) {
      setLoading(false);
    }
    if (onClose) {
      onClose(true);
    }
  }, [account, claimAllCallback, data.dateDay, loading, onClose, projectId]);

  function getActionButton() {
    if (loading) {
      return (
        <MainButton simpleMode onClick={() => claim()} disabled>
          {"Requesting data from Muon..."}
          <DotFlashing />
        </MainButton>
      );
    }
    return (
      <MainButton
        customText={"Claim Reward"}
        simpleMode
        onClick={() => claim()}
      />
    );
  }

  return (
    <Wrapper modal={onClose ? true : false}>
      <Row>
        <Title>Claim Reward</Title>
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
            src={"/static/images/etc/BasedClaimReward.svg"}
            alt="based-tableau"
            width={380}
            height={86}
          />
        </ImageWrapper>
        <AccountWrapper>
          <DateText>{data?.date}</DateText>
          <RowEnd>
            <RewardText>{data?.myReward} BASED</RewardText>
            <RewardLogo size={24} />
          </RowEnd>
        </AccountWrapper>

        {getActionButton()}
      </ContentWrapper>
    </Wrapper>
  );
}
