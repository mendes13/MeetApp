import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 0 30px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 32px;
      color: #fff;
    }

    a {
      display: flex;
      align-items: center;
      border-radius: 4px;
      background: #f94d6a;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      padding: 0 20px;
      height: 44px;

      svg {
        margin-right: 15px;
      }
    }
  }
`;

export const MeetupList = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

export const Meetup = styled(Link)`
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-radius: 4px;

  strong {
    color: #fff;
    font-size: 18px;
  }

  span {
    color: #999;
    display: flex;
    align-items: center;

    svg {
      margin-left: 30px;
    }
  }
`;
