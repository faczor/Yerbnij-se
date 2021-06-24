import styled from 'styled-components';
import {
  Form,
  GoTo,
  Input
} from 'styles/Auth.css';

export const StyledForm = styled(Form)`
  > p:first-of-type {
    margin: 0;
  }

  > div {
    width: 100%;
  }

  @media (max-width: 768px) {
    > div {
      width: 100%;
    }
  }
`;

export const GoToLogin = styled(GoTo)`
  margin: 2vh 0;
`;

export const InputSmall = styled(Input)`
  width: 100%;

  input {
    color: ${({ theme }) => theme.input};
  }
`;

export const SmallInputsWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100px;
  grid-auto-rows: min-content;
  
  > div {
    width: 98%;
  }

  > div:nth-of-type(2),
  p:nth-of-type(2) {
    margin-left: 2%;
    grid-column: 2;
  }

  p {
    width: 98%;
    grid-row: 2;
  }

  @media (max-width: 768px) {
    grid-template-columns: 100%;

    > div:nth-of-type(2),
    p:nth-of-type(2) {
      margin-left: 0;
      grid-column: 1;
      grid-row: 3;
    }
    p:nth-of-type(2) {
      grid-row: 4;
    }
  }
`;
