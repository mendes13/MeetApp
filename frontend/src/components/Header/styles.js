import styled from 'styled-components';

export const Container = styled.header`
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  padding: 30px;

  img {
    width: 30px;
    height: 30px;
  }

  aside {
    display: flex;

    button {
      height: 44px;
      margin-left: 30px;
      padding: 0 22px;
      background: #d44059;
      border: none;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: right;

  strong {
    color: #fff;
    font-size: 14px;
  }

  a {
    color: #999;
    font-size: 14px;
  }
`;
