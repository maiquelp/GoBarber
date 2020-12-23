import { animated } from 'react-spring';
import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: 'info' | 'success' | 'error';
  hasdescription: boolean;
}

const toastTypes = {
  info: css`
  background: #ebf8ff;
  color: #3172b7;
`,
  success: css`
  background: #e6fffa;
  color: #2e656a;
`,
  error: css`
  background: #fddede;
  color: #c53030;
`,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgb(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${(props) => toastTypes[props.type || 'info']};

  > svg {
    margin: 0 12px 0 0;
    align-self: center;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size:14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.8;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) => !props.hasdescription && css`
    align-items: center;

    svg {
      margin-top: 0;
    }
  `}
`;
