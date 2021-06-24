import Bg from '../assets/bigger_logo.png';
import styled from 'styled-components';
import { Button } from 'm-web-components';
import { InputMui } from '../components/atoms/Input';

export const Wrapper = styled.div`
  max-width: ${({ maxWidth }) => maxWidth};
  background: url(${Bg}) no-repeat;
  background-position: right top;
  min-height: 100vh;
  width: 100vw;

  @media (max-width: 1366px) {
    background-size: auto 50%;
  }

  @media (max-width: 768px) {
    background-size: auto 10%;
  }
`;

export const FieldsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 100%;
  }

  div {
    width: 100%;
    margin-top: 10px;
  }

  div:before {
    border: none;
  }
`;

export const Form = styled.form`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 10px;

  @media (max-width: 1366px) {
    width: 100%;
  }
`;

export const FormWrap = styled.div`
  max-width: 480px;
  display: flex;
  position: fixed;
  top: 35%;
  flex-direction: column;
  background-color: rgba(68, 74, 77, 0.7);
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 3px;
  a {
    color: ${({ theme }) => theme.input};
  }

  @media (max-width: 1366px) {
    top: 0;
  }
`;

export const SubmitButton = styled(Button)`
  background: ${({ theme }) => theme.primaryButtonBackground};
  margin: 3vh 0;
  height: 42px;
  width: 100%;
  border: none;
  color: ${({ theme }) => theme.primaryButtonContent};
  font-weight: 600;
`;

export const GoTo = styled.div`
  color: ${({ theme }) => theme.fieldLabel};
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  margin: 5vh 0;
`;

export const Title = styled.h1`
  font-size: 32px;
  line-height: 40px;
  min-height: 32px;
  margin: 2vh 0;
  color: ${({ theme }) => theme.headers};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.fieldLabel};
  margin-bottom: 50px;
  font-size: 17px;
`;

export const Input = styled(InputMui)`
  width: 100%;
  
  label {
    font-size: 15px;
    transform: none;
    color: ${({ theme }) => theme.fieldLabel};
    position: relative;
    font-weight: 600;
    grid-auto-rows: min-content;
  }

  input {
    border: 1px solid ${({ theme }) => theme.fieldBorder};
    height: 48px;
    padding: 0 5px;
    width: 100%;
    color: ${({ theme }) => theme.input};
  }

  div:before {
    border: none;
  }
`;
