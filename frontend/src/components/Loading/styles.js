import styled, { keyframes } from 'styled-components';
import { FaCircleNotch } from 'react-icons/fa';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 100px;
`;

export const LoadingIcon = styled(FaCircleNotch).attrs({
  size: 50,
  color: '#999',
})`
  animation: ${rotate} linear 1s infinite;
`;
