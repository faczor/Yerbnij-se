import React from 'react';
import { InputMui } from '../../components/atoms/Input';
import styled from 'styled-components';

const LoginInput = styled(InputMui)`
  label {
    font-size: 15px;
    transform: none;
    color: ${({ theme }) => theme.fieldLabel};
    position: relative;
    font-weight: 600;
  }

  input {
    border: 1px solid ${({ theme }) => theme.fieldBorder};
    height: 48px;
    padding: 0 5px;
    width: 100%;
    color: ${({ theme }) => theme.input};
  }
`;

export const formFields = [
  {
    as: (
      <LoginInput
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    name: 'email',
    label: 'E-mail',
    rules: { required: 'To pole jest wymagane' },
    type: 'text',
  },
  {
    as: (
      <LoginInput
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    name: 'password',
    label: 'Hasło',
    rules: { required: 'To pole jest wymagane' },
    type: 'password',
  },
];