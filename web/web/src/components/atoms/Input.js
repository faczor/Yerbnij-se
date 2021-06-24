import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const InputMui = styled(TextField)`
  width: 300px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-left: 20px;
  }
`;

const InputStyled = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.fieldBorder};
  border-radius: 2px;

  :hover,
  :focus {
    border: 1px solid ${({ theme }) => theme.borderHoover};
  }
`;

const Label = styled.label`
  font-weight: 600;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.fieldLabel};
`;

const Input = ({
  name,
  label,
  value,
  onChange,
  ...rest
}) => {
  return (
    <Wrapper>
      {label && (
        <Label htmlFor={name}>
          {label}
        </Label>
      )}
      <InputWrapper>
          <InputStyled
            name={name}
            placeholder={label}
            value={value}
            onChange={value => onChange(value)}
            {...rest}
          />
        )}
      </InputWrapper>
    </Wrapper>
  );
};

export default Input;
