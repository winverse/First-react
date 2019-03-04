import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
	width: 100%;
	height: 8rem;
	padding-top: 2rem;
	background: ${oc.indigo[7]};
`;

const Text = styled.div`
	margin-left: 20rem;
	font-size: 3rem;
	font-weight: 600;
	color: white;
`;

const VoucherInfo = () => {
	return (
		<Wrapper>
			<Text>Loyid 포인트 결제</Text>
		</Wrapper>
	);
};

export default VoucherInfo;
