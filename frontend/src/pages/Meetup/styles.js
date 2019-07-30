import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  padding: 0 30px 50px;
  margin: auto;

  header {
    margin: 50px 0;
    display: flex;
    justify-content: space-between;

    h1 {
      color: #fff;
    }
  }
`;

export const Actions = styled.div`
  display: flex;

  a,
  button {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    padding: 0 20px;
    height: 44px;

    svg {
      margin-right: 20px;
    }
  }
  a {
    background: #4dbaf9;
    margin-right: 15px;
  }
  button {
    background: #d44059;
    border: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  img {
    max-width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 4px;
  }

  > p {
    color: #ddd;
    font-size: 18px;
    line-height: 32px;
    margin-top: 25px;
  }
`;

export const Information = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;

  time {
    display: flex;
    font-size: 16px;
    color: #999;
    margin-right: 30px;

    svg {
      margin-right: 10px;
    }
  }

  strong {
    color: #999;
    font-size: 16px;
    font-weight: normal;

    svg {
      margin-right: 10px;
    }
  }
`;
