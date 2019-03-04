import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import ErrorMessage from './ErrorMessage';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 0.7rem;
`;

const JobText = styled.div`
  display: flex;
  width: 100%;
  color: ${oc.gray[6]};
  font-size: 0.9rem;
  letter-spacing: -1px;
  margin-bottom: 0.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const JobButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.selected !== undefined ?` ${oc.indigo[7]}` : `${oc.gray[5]}`};
  width: 48%;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  &:active{
    transform: translateY(2px);
    background: ${oc.indigo[7]}
  }
  &:hover{
    filter: brightness(120%);
    div{
      color:white;
    }
  }
`;

const ButtonText = styled.div`
  color: ${oc.teal[0]};
  font-weight: 400;
  letter-spacing: 0px;
  font-family: 'Bungee Inline', cursive;
`;

const JobSection = ({ error, selected, jobClick }) => (
  <Wrapper>
    <JobText>이용목적을 선택해주세요</JobText>
    <ButtonWrapper>
      <JobButton selected={ selected === 'client' ? `{selected}` : undefined } onClick={jobClick} value='client'><ButtonText value='client'>Client</ButtonText></JobButton>
      <JobButton selected={ selected === 'merchant' ? `{selected}` : undefined } onClick={jobClick} value='merchant'><ButtonText value='merchant'>Merchant</ButtonText></JobButton>
    </ButtonWrapper>
    {
      error !== '' && error !== undefined ? <ErrorMessage message={error}/> : ''
    }
  </Wrapper>
);

export default JobSection;