import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Banner = styled.Image`
  height: 150px;
  background-color: #666;
  width: 100%;
  border-radius: 4px;
`;

export const Wrapper = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

export const Information = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

export const InformationText = styled.Text`
  font-size: 13px;
  color: #999;
`;

export const CustomIcon = styled(Icon).attrs({
  size: 15,
  color: '#999',
})`
  margin-right: 5px;
`;

export const SubscriptionButton = styled(Button)`
  margin-top: 10px;
  background: #f94d6a;
`;
