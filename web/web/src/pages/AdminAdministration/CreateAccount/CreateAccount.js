import React, { useState } from 'react';
import { ControlForm, ErrorAlert, Select } from 'm-web-components';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from 'API';

import { userTypes } from 'constans/constantsAdministration';
import * as S from '../Administration.css';
import { UserInput, UserInputSmall } from '../Administration.css';

const CreateAccount = () => {
  const { handleSubmit, errors, control, reset } = useForm();
  const [errorsMessages, setErrorsMessages] = useState({});

  const formSelect = options => [
    {
      as: (
        <Select
          options={options}
          placeholder='Typ użytkownika'
          styles={{ control: base => ({ ...base, height: '50px' }) }}
        />
      ),
      type: 'select',
      name: 'userType',
      label: 'Typ użytkownika*',
      rules: { required: 'To pole jest wymagane' },
    },
  ];

  const formSmallFields = [
    {
      as: (
        <UserInputSmall
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            autoComplete: 'off',
          }}
        />
      ),
      name: 'name',
      label: 'Imię*',
    },
    {
      as: (
        <UserInputSmall
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            autoComplete: 'off',
          }}
        />
      ),

      name: 'surname',
      label: 'Nazwisko*',
    },
  ];

  const formFields = [
    {
      as: (
        <UserInput
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            autoComplete: 'off',
          }}
        />
      ),
      name: 'email',
      label: 'Email*',
      rules: { required: 'To pole jest wymagane' },
    },
    {
      as: (
        <UserInput
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            type: 'password',
            autocomplete: 'new-password',
          }}
        />
      ),
      name: 'password',
      label: 'Hasło*',
      rules: { required: 'To pole jest wymagane' },
    },
    {
      as: (
        <UserInput
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            type: 'password',
            autocomplete: 'new-password',
          }}
        />
      ),
      name: 'repeatPassword',
      label: 'Powtórz hasło*',
      rules: { required: 'To pole jest wymagane' },
    },
  ];


  const onSubmit = async (inputs, e) => {
    setErrorsMessages({});

    try {
      await api.postCreateUser(inputs.userType.value, inputs);
      reset();
      toast.success('Stworzono nowe konto użytkownika.');
    } catch ({ response }) {
      response?.data?.errors?.forEach(el =>
        setErrorsMessages(prev => ({ ...prev, [el.field]: el.defaultMessage }))
      );
      toast.error('Wystąpił błąd podczas tworzenia konta.');
    }
  };

  const smallFields = formSmallFields.map(el => (
    <>
      <ControlForm key={el.name} {...el} errors={errors} control={control} />
      {errorsMessages[el.name]?.split('.,')?.map(msg => (
        <ErrorAlert type='simple' error={msg} maxWidth='380px' />
      ))}
    </>
  ));

  const fields = formFields.map(el => (
    <>
      <ControlForm key={el.name} {...el} errors={errors} control={control} />
      {errorsMessages[el.name]?.split('.,')?.map(msg => (
        <ErrorAlert type='simple' error={msg} maxWidth='380px' />
      ))}
    </>
  ));

  const select = formSelect(userTypes).map(el => (
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
    <S.BookmarkWrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {select}
        <S.SmallInputsWrapper>{smallFields}</S.SmallInputsWrapper>
        {fields}
        <S.CreateAccountButton isVisible={true}>
          Stwórz konto
        </S.CreateAccountButton>
      </S.Form>
    </S.BookmarkWrapper>
  );
};

export default CreateAccount;
