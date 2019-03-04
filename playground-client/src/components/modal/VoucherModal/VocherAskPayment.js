import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import ExitIcon from 'react-icons/lib/md/clear';
import InfoIcon from 'react-icons/lib/md/info-outline';
import DotIcon from 'react-icons/lib/md/lens';

import ModalWrapper from './VoucherModalWrapper';

const PaymentHead = styled.div`
  width: 100%;
  height: 55px;
  background: ${oc.blue[7]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaymentTitle = styled.span`
  margin-left: 2rem;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  user-select: none;
`;

const PaymentExit = styled(ExitIcon)`
  margin-right: 2rem;
  margin-left: auto;
  color: white;
  font-size: 1.5rem;
  user-select: none;
  cursor: pointer;
  font-weight: 800;
`;

const PaymentContents = styled.div`
  background: ${oc.gray[1]};
  padding: 1rem;
  width: 100%;
  min-height: 500px;
`;

const PaymentDescBox = styled.div`
   width: 100%;
   padding: 1rem;
   border: 2px solid ${oc.indigo[8]};
   box-sizing: border-box;
   background: #fff;
`;

const DescTop = styled.div`
  color: ${oc.blue[7]};
  font-size: 1.2rem;
  font-weight: 600;
`;

const Desc = styled.div`
  color: ${oc.gray[6]};
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const Price = styled.div`
  text-align: right;
  color: ${oc.blue[7]};
  font-weight: 600;
  font-size: 1.25rem;
`;

const Info = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: ${oc.gray[8]};
  text-align: center;
  font-size: 0.9rem;

  svg{
    font-weight: 600;
    font-size: 1.1rem;
    margin-right: 0.5rem;
    color: ${oc.red[8]};
  }
`;

const PaymentTotal = styled.div`
  padding: 1rem;
  width: calc(100% - 2rem);
  background: #fff;
  display: flex;
  justify-content: space-between;
`;

const TotalText = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
`;

const TotalPrice = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
  color: ${oc.blue[7]};
`;

const PaymentMethod = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  width: calc(100% - 2rem);
  background: #fff;
`;

const MethodText = styled.div`
  font-size: 1.15rem;
  font-weight: 600;
`;

const OptionWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-flow: row wrap;
`;

const MehtodButton = styled.span`
  padding: 0.35rem 0.5rem;
  width: calc((100% - 2rem) / 3  - 1rem);
  display: flex;
  justify-content: center;
  border: 1px solid ${oc.gray[5]};
  background: ${props => props.checked ? `${oc.indigo[6]}` : `${oc.gray[1]};`};
  color: ${props => props.checked ? `white` : `${oc.gray[5]};`}; 
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
  &:active{
    transform: translateY(2px);

  }
  &:nth-child(1) {
    margin-left: 0rem;
  }
`;

const ContentBottom = styled.div`
  width: calc(100% - 2rem);
  padding: 1rem;
`;

const BottomText = styled.div`
  color: ${oc.gray[5]};
  font-size: 0.9rem;

  svg {
    font-size: 0.6rem;
    color: ${oc.gray[4]};
    margin-right: 0.5rem;
  }
`;

const NextButton = styled.div`
  width: 100%;
  background: ${oc.blue[6]};
  color: white;
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 2px;
  user-select: none;
  cursor: pointer;
  &:hover{
    filter: brightness(110%);
  }
  &:active{
    transform: translateY(2px);
  }
`;

const VoucherAskPayment = ({ checked, visible, onCancel, amount, onMethod, onNext }) => {
  const parsedPirce = amount.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  return(
    <ModalWrapper visible={visible}>
      <PaymentHead>
        <PaymentTitle>
          결제
        </PaymentTitle>
        <PaymentExit onClick={onCancel}/>
      </PaymentHead>
      <PaymentContents>
        <PaymentDescBox>
          <DescTop>포인트 결제</DescTop>
          <Desc>많은 상품들을 포인트 결제와 함께 즐겨보세요!</Desc>
          <Price>￦ {parsedPirce}원</Price>
        </PaymentDescBox>
        <Info><InfoIcon/>상품권으로 결제하실 수 없습니다!</Info>
        <PaymentTotal>
          <TotalText>총 결제금액</TotalText>
          <TotalPrice>{parsedPirce}원</TotalPrice>
        </PaymentTotal>
        <PaymentMethod>
          <MethodText>결제 수단 선택</MethodText>
          <OptionWrapper>
            <MehtodButton checked={checked === 'card' ? true : false} method='card' onClick={onMethod}>신용/체크카드</MehtodButton>
            <MehtodButton checked={checked === 'trans' ? true : false} method='trans' onClick={onMethod}>실시간 계좌이체</MehtodButton>
          </OptionWrapper>
        </PaymentMethod>
        <ContentBottom>
          <BottomText><DotIcon/>산업부, WTO서 "미·EU 경쟁적 보호무역 조치 철회해야"</BottomText>
          <BottomText><DotIcon/>[정상회담 D-1] '한반도의 봄' 이끈 남북 인사들, '담판'에 총출동</BottomText>
          <BottomText><DotIcon/>임종석 "北수행단에 軍·외교…비핵화 담으면 성공적"</BottomText>
          <BottomText><DotIcon/>창끼리 맞붙자 '레알 방패'가 이기더라</BottomText>
        </ContentBottom>
        <NextButton onClick={onNext}>다음</NextButton>
      </PaymentContents>
    </ModalWrapper>
  );
};

export default VoucherAskPayment;