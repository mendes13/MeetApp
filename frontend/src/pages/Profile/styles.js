import styled from 'styled-components';

export const Container = styled.div`
  form {
    max-width: 1000px;
    margin: 50px auto 0;
    padding: 0 30px 0;
    display: flex;
    flex-direction: column;

    input {
      background-color: rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 4px;
      height: 50px;
      margin-bottom: 10px;
      font-size: 18px;
      padding: 0 20px;
      color: #fff;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #fa1b41;
      margin-bottom: 10px;
      align-self: flex-start;
      font-weight: bold;
    }

    hr {
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      margin: 10px 0 20px;
    }

    button {
      margin-top: 10px;
      border: 0;
      background: #f94d6a;
      align-self: flex-end;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border-radius: 4px;

      svg {
        margin-right: 15px;
      }
    }
  }
`;
