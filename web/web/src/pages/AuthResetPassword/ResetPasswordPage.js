import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import { ControlForm } from 'm-web-components';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Wrapper,
  Form,
  SubmitButton,
  FieldsWrap,
  GoTo,
  Title,
  Description,
  FormWrap,
} from 'styles/Auth.css';

import { InputMui } from 'components/atoms/Input';
import { api } from 'API';
import { routes } from '../../routes';

const WrappedInput = styled(InputMui)`
  label {
    font-size: 15px;
    transform: none;
    color: ${({ theme }) => theme.fieldLabel};
    position: relative;
    font-weight: 600;
  }

  input {
    color: ${({ theme }) => theme.input};
    border: 1px solid ${({ theme }) => theme.fieldBorder};
    height: 48px;
    padding: 0 5px;
    width: 100%;
  }
`;

const ResetPasswordPage = () => {
  const { handleSubmit, errors, control } = useForm();
  const [redirect, setRedirect] = useState('');
  const resetRedirect = routes.resetPasswordSuccess;
  const loginRedirect = routes.login.replace("/:token?", "");
  console.log(loginRedirect);
  const formField = {
    as: (
      <WrappedInput
        InputLabelProps={{
          shrink: true,
        }}
      />
    ),
    name: 'email',
    label: 'E-mail',
    rules: { required: 'To pole jest wymagane' },
    type: 'email',
  };

  const onSubmit = async data => {
    try {
      const resp = await api.remindPassword(data);
      if (resp.status === 200) {
        setRedirect(resetRedirect);
      }
    } catch (e) {
      toast.error(
        'Nie znaleziono podanego adresu w systemie. Sprawdź jego poprawność.',
        {
          autoClose: 8000,
        },
      );
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Form>
        <FormWrap>
          <Title>Reset hasła</Title>
          <Description>
            Podaj email na który chcesz otrzymać nowe hasło.
          </Description>
          <FieldsWrap>
            <ControlForm key={formField.name} {...formField} errors={errors} control={control} />
            <SubmitButton>Wyślij</SubmitButton>
          </FieldsWrap>
          <GoTo>
            Rozwiązałeś problem z hasłem? <Link to={loginRedirect}>Zaloguj się.</Link>
          </GoTo>
        </FormWrap>
      </Form>
    </Wrapper>
  );
};

export default ResetPasswordPage;
