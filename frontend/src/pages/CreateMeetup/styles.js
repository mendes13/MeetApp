import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto 0;
  padding: 0 30px;

  form {
    display: flex;
    flex-direction: column;

    input,
    textarea {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      margin-bottom: 10px;
      font-size: 18px;
      color: #bbb;
      border-radius: 4px;
      width: 100%;

      &::placeholder {
        color: #666;
      }
    }

    input {
      height: 50px;
      padding: 0 20px;
    }

    textarea {
      height: 200px;
      padding: 20px;
      resize: none;
    }

    span {
      color: #923242;
      margin-bottom: 10px;
      align-self: flex-start;
      font-weight: bold;
    }

    > button {
      margin-top: 10px;
      align-self: flex-end;
      display: flex;
      align-items: center;
      background-color: #f94d6a;
      border: 0;
      border-radius: 4px;
      padding: 0 20px;
      height: 44px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;

      svg {
        margin-right: 15px;
      }
    }
  }
`;
