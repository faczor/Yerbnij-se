import { InputMui } from 'components/atoms/Input';
import styled from 'styled-components';
import { centerFlex } from 'styles/mixins';

export const Buttons = styled.div`
  ${centerFlex}
  margin-top: 30px;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;

  background-color: ${({ theme }) => theme.modalWrapper};
  padding: 10px;
  border-radius: 10px;

  > p {
    margin: 0px auto 0px 0px;
  }

  > div {
    width: 100%;
  }

  > .MuiFormControl-root {
    margin: 15px 0;
  }

  h4 {
    align-self: flex-start;
    color: ${({ theme }) => theme.headers}
  }
`;

export const StyledInput = styled(InputMui)`
  width: 100%;

  label {
    //  margin: 10px 0;
    text-transform: uppercase;
    color: ${({ theme }) => theme.fieldLabel};
    opacity: 0.8;
    font-size: 11px;
    font-weight: 600;
    transform: scale(1);
  }

  input {
    border: 1px solid ${({ theme }) => theme.border};
    height: 32px;
    padding: 0 5px;
    width: 100%;
  }

  .MuiInput-underline:before {
    border: none;
  }
`;

export const StyledTextArea = styled(StyledInput)`
  margin-top: 20px;
  height: 160px;
  padding: 10px;
  width: 100%;

  textarea {
    border: 1px solid ${({ theme }) => theme.border} !important;
    height: 150px !important;
    overflow-y: auto !important;
    padding: 5px;
    box-sizing: border-box;
    color: ${({theme}) => theme.input};
  }

  .MuiInputBase-multiline {
    padding: 0;
  }

  // safari underline fix
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      .MuiInput-underline:after {
        bottom: -3px;
      }

      .MuiInput-underline:before {
        bottom: -3px;
      }
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.input};
  position: absolute;

  margin-right: 10px;
  margin-top: 10px;
  right: 10px;
  cursor: pointer;
`;

