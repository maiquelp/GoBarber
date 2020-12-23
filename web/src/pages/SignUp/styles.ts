import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackground from '../../assets/sign-up-background.png';

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  font-size: 16px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  } to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 24px;
      margin-bottom: 24px;
    }

    a {
      color: #F4EDE8;
      margin-top: 24px;
      transition: color 0.2s;

      &:hover {
      color: ${shade(0.2, '#F4EDE8')}
      }
    }
  }

  a {
    color: #FF9000;
    display: flex;
    margin-top: 24px;
    align-items: center;
    transition: color 0.2s;

    svg {
      margin-right: 8px;
    }

    &:hover {
      color: ${shade(0.2, '#FF9000')};
    }
  }
`;
