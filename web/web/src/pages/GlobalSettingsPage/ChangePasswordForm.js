import React, { useState } from 'react';

import {
  Form,
  StyledInput,
  SubmitButton,
} from './Settings.css';
import { useForm } from 'react-hook-form';
import { api } from 'API';
import { toast } from 'react-toastify';
import { routes } from 'routes';
import { useHistory } from 'react-router';
import ControlForm from '../../components/ControlForm/ControlForm';
import ErrorAlert from '../../components/ControlForm/ErrorAlert';

const ChangePasswordForm = () => {
  const [errorsMessages, setErrorsMessages] = useState({});
  const { handleSubmit, errors, control } = useForm();
  const history = useHistory();

  const formFields = [
    {
      as: (
        <StyledInput
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
      name: 'oldPassword',
      label: 'Stare hasło',
      rules: { required: 'To pole jest wymagane' },
      type: 'password',
    },
    {
      as: (
        <StyledInput
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
      name: 'password',
      label: 'Nowe hasło',
      rules: { required: 'To pole jest wymagane' },
      type: 'password',
    },

    {
      as: (
        <StyledInput
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
      name: 'repeatPassword',
      label: 'Powtórz nowe hasło',
      rules: { required: 'To pole jest wymagane' },
      type: 'password',
    },
  ];

  const changePassFunc = async data => {
    try {
      await api.putAccountPassword(data);
      return 'success';
    } catch (e) {
      if (!e?.data?.errors) {
        toast.error(
          'Coś poszło nie tak, spróbuj ponownie lub skontaktuj się z administratorem',
        );
      }
      return e?.response;
    }
  };

  const onSubmit = async data => {
    try {
      const resp = await changePassFunc(data);
      if (resp === 'success') {
        toast.success('Udało się zmienić hasło.');
        return history.push(routes.user.home);
      }

      let errorsM = {};
      resp?.data?.errors?.forEach(el => {
        errorsM = { ...errorsM, [el.field]: el.defaultMessage };
      });
      setErrorsMessages(errorsM);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return false;
    }
  };

  const fields = formFields.map(el => (
    <>
      <ControlForm key={el.name} {...el} errors={errors} control={control} />
      <ErrorAlert
        type='simple'
        error={errorsMessages[el.name]}
        maxWidth='380px'
      />
    </>
  ));
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>{fields}
        <SubmitButton onSubmit={handleSubmit(onSubmit)} type='submit'>
          Zapisz
        </SubmitButton>
      </Form>
    </>
  );
};

export default ChangePasswordForm;
