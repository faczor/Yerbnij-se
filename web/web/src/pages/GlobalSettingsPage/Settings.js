import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { device } from 'styles/devices';

import {
  AccountDetails,
  Wrapper,
  Section,
  SectionWrap,
  Title,
  UserDataInput,
  Td,
  SubmitButton,
  EditButton,
} from './Settings.css';

import { userTypes } from 'constans/constantsAdministration';
import { useForm } from 'react-hook-form';
import { api } from 'API';
import allActions from 'actions';
import { toast } from 'react-toastify';
import ChangePasswordForm from './ChangePasswordForm';
import ControlForm from '../../components/ControlForm/ControlForm';
import ErrorAlert from '../../components/ControlForm/ErrorAlert';

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;

  padding: 20px;
  border-radius: 10px;

  > p {
    margin: 0px auto 0px 0px;
  }

  > div {
    width: 100%;
  }

  @media ${device.desktop} {
    width: 400px;
  }
`;

const Settings = () => {
  const dispatch = useDispatch();
  const [errorsMessages, setErrorsMessages] = useState({});

  const { user } = useSelector(state => state.auth);

  const { handleSubmit, errors, control, reset } = useForm({
    defaultValues: {
      name: user.name,
      surname: user.surname,
    },
  });

  const getCurrentUser = async () => {
    try {
      const { data } = await api.me();
      dispatch(allActions.authActions.setUser(data));
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const [isUserDetailsEditDisabled, setUserDetailsEditDisabled] = useState(
    true,
  );
  const [isPasswordEditDisabled, setPasswordEditDisabled] = useState(true);

  const roleName = userTypes.map(el => el.value === user.role && el.label);

  const handleEnableUserDetailsEdit = () => {
    setUserDetailsEditDisabled(prev => !prev);
  };

  const handleEnablePasswordEdit = () => {
    setPasswordEditDisabled(prev => !prev);
  };

  const cancelEnablePasswordEdit = () => {
    setPasswordEditDisabled(prev => !prev);
  };

  const cancelUserDataChanges = () => {
    getCurrentUser();
    reset();
    setUserDetailsEditDisabled(prev => !prev);
  };

  const formUserDataFields = [
    {
      as: (
        <UserDataInput
          id='name'
          disabled={isUserDetailsEditDisabled}
          inputProps={{ maxLength: '50' }}
        />
      ),
      name: 'name',
      rules: { required: 'To pole jest wymagane' },
      type: 'text',
    },
    {
      as: (
        <UserDataInput
          id='surname'
          disabled={isUserDetailsEditDisabled}
          inputProps={{ maxLength: '50' }}
        />
      ),
      name: 'surname',
      rules: { required: 'To pole jest wymagane' },
      type: 'text',
    },
  ];

  const userDataFields = formUserDataFields.map(el => (
      <>
        <ControlForm key={el.name} {...el} errors={errors} control={control} />
        <ErrorAlert
          type='simple'
          error={errorsMessages[el.name]}
          maxWidth='380px'
        />
      </>
    ))
  ;

  const changeData = async data => {
    try {
      await api.putAccountDetails(data);
      return 'success';
    } catch (e) {
      if (!e?.data?.errors) {
        toast.error(
          'Sprawdź poprawność wypełnionych pól',
        );
      }
      return e?.response;
    }
  };

  const onSubmitUser = async data => {
    try {
      const resp = await changeData(data);
      if (resp === 'success') {
        toast.success('Dane zostały poprawnie zmienione.');
      }

      let errorsM = {};
      resp?.data?.errors?.forEach(el => {
        errorsM = { ...errorsM, [el.field]: el.defaultMessage };
      });
      setErrorsMessages(errorsM);
    } catch (e) {
      toast.error("Wystąpił niespodziewany błąd, sprawdź poprawność pól")
      return false;
    }
  };

  return (
    <>
      <Wrapper>
        <SectionWrap>
          <Section>
            <Title>Dane użytkownika</Title>
            <form onSubmit={handleSubmit(onSubmitUser)}>
              <AccountDetails>
                <tbody>
                <tr>
                  <Td bold>
                    <label htmlFor='name'>Imię</label>
                  </Td>
                  <Td>{userDataFields[0]}</Td>
                </tr>
                <tr>
                  <Td bold>
                    <label htmlFor='surname'>Nazwisko</label>
                  </Td>
                  <Td>{userDataFields[1]}</Td>
                </tr>
                <tr>
                  <Td bold>Adres e-mail</Td>
                  <Td>{user.email}</Td>
                </tr>
                {user.role !== 'USER' && (
                  <tr>
                    <Td bold>Rola</Td>
                    <Td>{roleName}</Td>
                  </tr>
                )}
                </tbody>
              </AccountDetails>

              <EditButton
                onClick={
                  isUserDetailsEditDisabled
                    ? handleEnableUserDetailsEdit
                    : cancelUserDataChanges
                }
                isDisabled={isUserDetailsEditDisabled}
                type='button'
              >
                {isUserDetailsEditDisabled ? 'Edytuj' : 'Anuluj'}
              </EditButton>

              <SubmitButton
                isDisabled={isUserDetailsEditDisabled}
                onSubmit={handleSubmit(onSubmitUser)}
                type='submit'
              >
                Zapisz
              </SubmitButton>
            </form>
          </Section>
          <Section>
            <Title>Zmiana hasła</Title>
            <EditButton
              onClick={
                isPasswordEditDisabled
                  ? handleEnablePasswordEdit
                  : cancelEnablePasswordEdit
              }
              isDisabled={isPasswordEditDisabled}
              type='button'
            >
              {isPasswordEditDisabled ? 'Edytuj' : 'Anuluj'}
            </EditButton>
            {!isPasswordEditDisabled && (
              <ChangePasswordForm isPasswordEditDisabled />
            )}
          </Section>
        </SectionWrap>
      </Wrapper>
    </>
  );
};

export default Settings;
