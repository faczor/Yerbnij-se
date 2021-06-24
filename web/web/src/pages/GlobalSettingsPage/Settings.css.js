import styled, { css } from 'styled-components';
import { device } from 'styles/devices';
import { Button } from 'm-web-components';
import { InputMui } from 'components/atoms/Input';

export const Wrapper = styled.div`

  padding: 30px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.secondaryWrapper};

  @media (max-width: 768px) {
    padding: 1%;
  }
`;

export const SectionWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 0.6fr));
  gap: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Section = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.thirdWrapper};
  padding: 20px;
  position: relative;
  margin-bottom: 50px;
  width: 100%;
`;

export const Title = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.headers};

  @media (max-width: 420px) {
    font-size: 16px;
  }
`;
// forms
export const AccountDetails = styled.table`
  font-size: 15px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Td = styled.td`
  padding: 0 20px 0 5px;
  color: ${({ theme }) => (theme.fieldLabel)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  height: 48px;

  > div {
    margin: 5px 0;
  }

  :nth-of-type(2n) {
    padding-right: 0;
  }
`;

export const EditButton = styled(Button)`
  background: none;
  color: ${({ theme }) => theme.secondaryButtonContent};
  top: 20px;
  right: 100px;
  margin: 0;
  border: ${({ theme }) => `1px solid ${theme.border}`};
  padding: 7px 10px;
  position: absolute;


  ${({ isDisabled }) =>
          isDisabled &&
          css`
            right: 20px;
            border-bottom: ${({ theme }) => `1px solid ${theme.border}`};
          `}
`;

export const SubmitButton = styled(Button)`
  top: 20px;
  right: 20px;
  padding: 8px 10px;
  margin: 0;
  border: none;
  display: ${({ isDisabled }) => (isDisabled ? 'none' : 'block')};
  background: ${({ theme }) => theme.primaryButtonBackground};
  color: ${({ theme }) => theme.primaryButtonContent};
  font-weight: 600;
  position: absolute;
  @media (max-width: 420px) {
    padding: 4px 5px;
  }
`;

export const UserDataInput = styled(InputMui)`
  .MuiInputBase-input,
  .Mui-disabled {
    height: 30px;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    color: ${({ theme }) => theme.tableField};
  }

  .MuiInput-underline.Mui-disabled:before,
  .MuiInput-underline:before {
    border: none;
  }

  ${({ disabled }) =>
          !disabled &&
          css`
            .MuiInputBase-input {
              height: 48px;
              padding: 0 10px;
              border: ${({ theme }) => `1px solid ${theme.borderHoover}`};
              color: ${({ theme }) => theme.input};
              border-radius: 2px;
              @media (max-width: 768px) {
                height: 40px;
              }
            }
          `};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  @media ${device.desktop} {
    width: 400px;
  }
`;

export const StyledInput = styled(InputMui)`
  width: 100%;

  label {
    font-size: 15px;
    transform: none;
    color: ${({ theme }) => theme.fieldLabel};
  }

  input {
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({theme}) => theme.input};
    height: 48px;
    padding: 0 5px;
    width: 100%;
  }

  .MuiInput-underline:before {
    border: none;
  }
`;