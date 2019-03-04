import styled, { keyframes } from 'styled-components';

export const bounceIn = keyframes`
  0% {
    margin-left: -10%;
    opacity: 0.7;
  }
  50% {
    margin-left: 2%;
    opacity: 0.8;
  }
  100% {
    opacity: 1;
    margin-left: 0%;
  }
`;

export const bounceOut = keyframes`
  0% {
    margin-left: 0%;
    opacity: 1;
  }
  50% {
    margin-left: 2%;
    opacity: 0.8;
  }
  70% {
    opacity: 0.7;
    margin-left: -30%;
  }
  100% {
    opacity: 0.4;
    margin-left: -100%;
  }
`;

// register modal Character
export const roundOut = keyframes` 
  0%{
    border: none;
    padding: 0rem;
  }

  100%{
    border: 0.15rem solid white;
    padding: 0.7rem;
  }
`;

export const TextShake = keyframes`
  0%{
    margin-left: 30px;
  }

  50%{
    margin-right: 30px;
  }
`;

export const registerModal = keyframes`
  0%{
    margin-top: 200px;
  }
`;

export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; } 
`;

export const paymentUp = keyframes`
  0% { transform: translateY(50vh); width: 992px; }
  100% { transform: translateY(0); }
`;

export const paymentDown = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(50vh); }
`;