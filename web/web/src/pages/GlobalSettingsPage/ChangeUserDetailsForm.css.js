import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  padding: 20px;
  align-items: start;
  justify-items: start;
  row-gap: 20px;
`;



export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  span {
    color: ${({ theme }) => theme.headers};
    font-size: 28px;
    font-weight: bold;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 5px;
`;

export const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  row-gap: 10px;
  align-items: center;

  label {
    color: ${({ theme }) => theme.fieldLabel};
    font-weight: bold;
    font-size: 17px;
  }

  input {
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 5px;
    padding: 10px;
    background: none;
    color: ${({ theme }) => theme.input};

    :read-only {
      border: none;
      color: ${({ theme }) => theme.fieldLabel};
      font-weight: 500;
    }
  }
`;

export const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 10px;
  background: none;
  color: ${({ theme }) => theme.input};

  :read-only {
    border: none;
    color: ${({ theme }) => theme.fieldLabel};
    font-weight: 500;
  }
`;