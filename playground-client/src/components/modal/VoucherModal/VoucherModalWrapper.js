import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles/styleUtils';
import { fadeIn, fadeOut, paymentUp, paymentDown } from 'styles/keyFrames';

const Wrapper = styled.div`
  background: rgba(100, 100, 100, 0.5);
  ${props => props.enter && `background: red;`};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;

  ${props => props.animation === 'enter' ? `animation: ${fadeIn} 0.3s ease-in-out;` : ``};
  ${props => props.animation === 'leave' ? `animation: ${fadeOut} 0.3s ease-in;` : ``};
`;

const ModalWrapper = styled.div`
  z-index: 30;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
`;

const Modal = styled.div`
  width: 500px;
  height: 600px;
  ${shadow(0)};
  background: white;
  display: flex;
  flex-flow: row wrap;

  ${props => props.animation === 'enter' ? `animation: ${paymentUp} 0.3s ease-in-out;` : ``};
  ${props => props.animation === 'leave' ? `animation: ${paymentDown} 0.3s ease-in;` : ``};
`;

class VoucherModalWrapper extends Component {

  state = {
    animate: false
  }

  startAnimation = () => {
    this.setState({
      animate: true
    });

    setTimeout(() => {
      this.setState({
        animate: false
      });
    }, 300);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.visible !== this.props.visible) {
      this.startAnimation();
    }
  }
  render() {
    const { children, visible } = this.props;
    const { animate } = this.state;

    if(!visible && !animate) return null;

    const animation = animate && (visible ? 'enter' : 'leave');
    return (
      <Wrapper animation={animation}>
        <ModalWrapper>
          <Modal animation={animation}>
            { children }
          </Modal>
        </ModalWrapper>
      </Wrapper>
    );
  }
}

export default VoucherModalWrapper;