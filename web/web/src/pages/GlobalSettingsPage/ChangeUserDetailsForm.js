import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as S from './ChangeUserDetailsForm.css';
import { CancelButton, PrimaryButton } from '../../components/atoms/Buttons';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { api } from '../../API';
import { toast } from 'react-toastify';
import ControlForm from '../../components/ControlForm/ControlForm';
import { StyledInput } from './ChangeUserDetailsForm.css';

const SaveButton = styled(PrimaryButton) `
  display: ${({ isEditEnabled }) => (isEditEnabled ? 'none' : 'block')};
`;

const ChangeUserDetailsForm = () => {

  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const { user } = useSelector(state => state.auth);

  const switchIsEditEnabled = () => {
    setIsEditEnabled(prevState => !prevState);
  }

  const { handleSubmit, errors, control, reset } = useForm({
    defaultValues: {
      name: user.name,
      surname: user.surname,
      email: user.email,
    },
  });

  const onSubmit = async data => {
    try {
      console.log(data)
      const resp = await api.putAccountDetails(data);
      toast.success('Dane użytkownika zostały zaktualizowane.');
      setIsEditEnabled(prev => !prev);
    } catch (e) {
      toast.error('Wystąpił błąd, spróbuj później');
    }
  };

  const formFields = [
    {
      name: 'name',
      rules: { required: 'To pole jest wymagane' },
      type: 'text',
      label: 'Imie',
      isEnabled: {isEditEnabled}
    },
    {
      name: 'surname',
      rules: { required: 'To pole jest wymagane' },
      type: 'text',
      label: 'Nazwisko',
      isEnabled: {isEditEnabled}
    },

    {
      name: 'email',
      rules: { required: 'To pole jest wymagane' },
      type: 'text',
      label: 'Email',
      isEnabled: false,
    },
  ];

  const fields = formFields.map(el => (
    <ControlForm key={el.name} {...el} errors={errors} control={control} label={el.label} />
  ));

  return (
    <S.Wrapper>
      <S.Header>
        <span>Dane użytkownika</span>
        <S.Buttons>
          <CancelButton onClick={switchIsEditEnabled} type='button'> {isEditEnabled ? 'Anuluj' : 'Edytuj'}</CancelButton>
          <SaveButton isEditEnabled={isEditEnabled} type={'submit'} onSubmit={handleSubmit(onSubmit)}>Zatwierdź</SaveButton>
        </S.Buttons>
      </S.Header>
      <S.Form onSubmit={onSubmit}>
        {fields}
      </S.Form>
    </S.Wrapper>
  )
};

export default ChangeUserDetailsForm;

