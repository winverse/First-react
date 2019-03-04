import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { shadow } from 'styles/styleUtils';

const Wrapper = styled.div`
  width: 30%;
  height: 31.4rem;
  padding-top: 1rem;
  margin: 0rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 100%;
  background: white;
  height: 20rem;
  border: 2px solid ${oc.indigo[7]};
  ${shadow(1)};
`;

const ContentTop = styled.div`
  height: 20%;
  background: ${oc.gray[1]};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`;

const TopText = styled.div`
  margin-left: 2rem;
  color: ${oc.violet[6]};
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -2px;
`;

const ContentMiddle = styled.div`
  display: flex;
  align-items: center;
  height: 35%;
`;

const InputBox = styled.div`
  border: 1px solid ${oc.blue[3]};
  width: 200px;
  height: 2rem;
  margin-left: 2rem;
  display: flex;
  flex-flow: row nowrap;
  ${shadow(0)};
`;

const PriceInput = styled.input`
  width: 80%;
  height: 100%;
  outline: none;
  border: none;
  margin-left: 1rem;
`;

const Won = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19%;
  height: 100%;
  color: ${oc.indigo[6]};
  font-weight: 600;
  font-size: 1.15rem;
  user-select: none;
`;

const Button = styled.div`
  height: 2.5rem;
  width: 100px;
  margin-right: 2rem;
  margin-left: auto;
  background: ${oc.violet[5]};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  letter-spacing: 0px;
  ${shadow(0)};

  cursor: pointer;
  user-select: none;
  &:active{
    transition: all .05s ease;
    transform: translateY(2px);
    ${shadow(1)};
  }
`;

const ContentBottom = styled.div`
  height: 45%;
`;

const BottomText = styled.div`
  margin: 0rem auto;
  width: 90%;
  border-top: 1px solid ${oc.gray[3]};
  height: calc(100% - 2rem);
`;

const BottomH1 = styled.div`
  margin-top: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const BottomH6 = styled.div`
  color: ${oc.gray[7]};
  font-size: 0.8rem;
`;

const VoucherBody = ({ value, onInputChange, onModal }) => {
  return(
    <Wrapper>
      <ContentBox>
        <ContentTop>
          <TopText>포인트 결제</TopText>
        </ContentTop>
        <ContentMiddle>
          <InputBox>
            <PriceInput value={value} type='text' onChange={onInputChange}/>
            <Won>￦</Won>
          </InputBox>
          <Button onClick={onModal}>결제하기</Button>
        </ContentMiddle>
        <ContentBottom>
          <BottomText>
            <BottomH1>결제 안내</BottomH1>
            <BottomH6>- 文대통령, 김정은과 회담장 '동시입장'… 금강산 앞에서 악수 </BottomH6>
            <BottomH6>- 경찰, 김경수 의원 보좌관 계좌추적…드루킹측과 거래 성격 규명 </BottomH6>
            <BottomH6>- 檢성추행조사단 '서지현 인사보복' 안태근 불구속기소 </BottomH6>
            <BottomH6>- 'GM 2인자' 댄 암만 사장 전격 방한…내일 국회 면담 </BottomH6>
          </BottomText>
        </ContentBottom>
      </ContentBox>
    </Wrapper>
  );
};

export default VoucherBody;