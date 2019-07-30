import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #22202c 0%, #402845 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  img {
    height: 40px;
    width: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    input {
      border: none;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.1);
      height: 50px;
      padding: 0 15px;
      color: #bbb;
      font-size: 18px;
      margin-bottom: 10px;
    }

    input::placeholder {
      color: #999;
    }

    span {
      color: #fa1b41;
      margin-bottom: 10px;
      align-self: flex-start;
      font-weight: bold;
    }

    button {
      margin-top: 5px;
      background: #f94d6a;
      border: 0;
      border-radius: 4px;
      font-weight: bold;
      font-size: 18px;
      color: #fff;
      height: 50px;
    }

    a {
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      color: #bbb;
    }
  }
`;
