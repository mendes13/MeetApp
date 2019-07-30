import styled from 'styled-components/native';

export const Container = styled.View`
  height: 50px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0 15px;
  flex-direction: row;
  align-items: center;
`;

export const DefaultInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.3)',
})`
  flex: 1;
  font-size: 18px;
  color: #fff;
`;
