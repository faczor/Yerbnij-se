import { InputMui } from 'components/atoms/Input';
import styled from 'styled-components';
import { device } from 'styles/devices';
import { SaveButton } from 'components/atoms/Buttons';

export const BookmarkWrapper = styled.div`
  min-height: 77vh;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  justify-content: start;

  padding: 30px;
  background-color: ${({ theme }) => theme.secondaryWrapper};
  border: 1px solid ${({ theme }) => theme.border};

  @media ${device.desktop} {
    padding: 60px;
  }
`;

// Create account
export const UserInput = styled(InputMui)`
  width: 100%;
  
  label {
    font-size: 15px;
    transform: none;
    color: ${({ theme }) => theme.fieldLabel};
    position: relative;
    font-weight: 600;
  }

  input {
    border: 1px solid ${({ theme }) => theme.border};
    height: 48px;
    padding: 0 5px;
    width: 100%;
    color: ${({ theme }) => theme.input};
  }

  div:before {
    border: none;
  }
`;

export const UserInputSmall = styled(UserInput)`
  width: 100%;

  :nth-of-type(2) {
    justify-self: flex-end;
  }
`;

export const SmallInputsWrapper = styled.div`
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

    > div {
      width: 100%;
    }

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

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;

  background-color: ${({ theme }) => theme.thirdWrapper};
  padding: 20px;
  border-radius: 10px;

  > p {
    margin: 0px auto 0px 0px;
  }

  > div {
    width: 100%;
  }

  div {
    border-radius: 0;
  }

  @media ${device.desktop} {
    width: 50%;
  }
`;

export const FormModal = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;

  background-color: ${({ theme }) => theme.primaryWrapper};
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;

  > p {
    margin: 5px auto 0px 0px;
    font-size: 16px;
    span {
      font-weight: 700;
    }
  }

  > div {
    width: 100%;
  }

  div {
    border-radius: 0;
  }

  @media ${device.desktop} {
    width: 50%;
  }
`;

export const CreateAccountButton = styled(SaveButton)`
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;
