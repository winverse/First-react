import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';
import PriceIcon from 'react-icons/lib/io/pricetag';


const Wrapper = styled.div`
  width: 50%;
  margin: -0.5rem auto 1rem;
  background: ${oc.gray[1]};
  ${shadow(0)};
  display: flex;
  justify-content: center;
`;

const PriceBox = styled.div`
  width: 90%;
  background: white;
  height: 3rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${oc.gray[3]};
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const PriceText = styled.div`
  margin-left: 2rem;
  color: ${oc.gray[8]};
  font-size: 0.9rem;
  font-weight: 600;
`;

const PriceInputBox = styled.div`
  border: 2px solid ${oc.cyan[2]};
  width: 200px;
  height: 50%;
  margin-right: 2rem;
  display: flex;
  border-radius: 5px;
  flex-flow: row nowrap;
`;

const PriceInput = styled.input`
  width: 80%;
  outline: none;
  border: none;
  margin-left: 1rem;
`;

const PriceIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  color: ${oc.indigo[6]};
  font-weight: 600;
  font-size: 1.15rem;
`;

const EditorFooter = ({ onPriceChange, value }) => {
  return(
    <Wrapper>
      <PriceBox>
        <PriceText>원하는 가격을 적어주세요</PriceText>
        <PriceInputBox>
          <PriceInput onChange={onPriceChange} value={value}/>
          <PriceIconBox>₩</PriceIconBox>
        </PriceInputBox>
      </PriceBox>
    </Wrapper>
  );
};

export default EditorFooter;