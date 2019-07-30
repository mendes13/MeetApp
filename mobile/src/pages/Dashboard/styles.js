import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#fff',
})`
  margin-top: 40px;
`;

export const DatePicker = styled.View`
  margin: 30px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DatePickerText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin: 0 15px;
`;

export const MeetupList = styled.FlatList.attrs({})`
  padding: 0 20px 20px;
`;
