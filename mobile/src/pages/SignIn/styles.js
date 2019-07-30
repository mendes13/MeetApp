import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
  padding: 20px 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #f94d6a;
`;

export const Anchor = styled.TouchableOpacity``;

export const AnchorText = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  font-weight: bold;
  font-size: 16px;
`;
