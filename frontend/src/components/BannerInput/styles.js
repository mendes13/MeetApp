import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;

  label {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
    height: 300px;
    width: 100%;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      color: #444;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  input {
    display: none;
  }
`;
