import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocus: boolean,
  isFilled: boolean,
  isErrored: boolean,
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  height: 56px;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 2px solid #232129;
  color: #666360;
  display: flex;
  align-items: center;

  & + div {
      margin-top: 8px;
  }

  ${(props) => props.isErrored && css`
    /* color: #c53030; */
    border-color: #c53030;
  `}

  ${(props) => props.isFocus && css`
    border-color: #FF9000;
    color: #FF9000;
  `}

  ${(props) => props.isFilled && css`
    color: #FF9000;
  `}

  input {
    color: #F4EDE8;
    flex: 1;
    border: 0;
    background: transparent;
    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }

`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
  }

  &::before {
    border-color: #c53030;
  }
`;
