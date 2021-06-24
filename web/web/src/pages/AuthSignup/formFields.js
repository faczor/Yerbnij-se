import React from 'react';

import { InputSmall } from './Signup.css';
import { Input } from 'styles/Auth.css';

export const formSmallFields = [
  {
    as: (
      <InputSmall
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    name: 'name',
    label: 'Imię*',
  },
  {
    as: (
      <InputSmall
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),

    name: 'surname',
    label: 'Nazwisko*',
  },
];

export const formFields = [
  {
    as: (
      <Input
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    name: 'password',
    label: 'Hasło*',
    rules: { required: 'To pole jest wymagane' },
    type: 'password',
  },
  {
    as: (
      <Input
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    name: 'repeatPassword',
    label: 'Powtórz hasło*',
    rules: { required: 'To pole jest wymagane' },
    type: 'password',
  },
  {
    as: (
      <Input
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    name: 'email',
    label: 'Email*',
    rules: { required: 'To pole jest wymagane' },
  },
];
