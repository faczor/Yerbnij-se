import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ControlForm, ErrorAlert } from 'm-web-components';
import { useForm } from 'react-hook-form';
import {
  Wrapper,
  SubmitButton,
  Title,
  FormWrap,
} from 'styles/Auth.css';

import { GoToLogin, SmallInputsWrap, StyledForm } from './Signup.css';
import useAuth from 'auth/useAuth';

import { formSmallFields, formFields } from './formFields';
import { routes } from '../../routes';

const FieldsWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;

  > div {
    margin: 2px 0;
  }
`;

const Signup = () => {
  const loginRedirect = routes.login.replace('/:token?', '');
  const auth = useSelector(state => state.auth);
  const { handleSubmit, errors, control } = useForm();
  const { signup } = useAuth();

  const [redirect, setRedirect] = useState(false);
  const [errorsMessages, setErrorsMessages] = useState({});

  const onSubmit = async data => {
    try {
      const resp = await signup(data);

      if (resp === 'success') setRedirect(loginRedirect);

      let errorsM = {};
      resp?.data?.errors?.forEach(el => {
        errorsM = { ...errorsM, [el.field]: el.defaultMessage };
      });

      setErrorsMessages(errorsM);
    } catch (e) {
      return false;
    }
  };

  if (auth.isAuthenticated) {
    return <Redirect to='/' />;
  }
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <StyledForm>
        <FormWrap>
          <Title>Zarejestruj się</Title>
          <FieldsWrap>
            <SmallInputsWrap>
              {formSmallFields.map(el => (
                <>
                  <ControlForm key={el.name} {...el} errors={errors} control={control} />
                  {errorsMessages[el.name]?.split('.,')?.map(msg => (
                    <ErrorAlert type='simple' error={msg} maxWidth='380px' />
                  ))}
                </>
              ))}
            </SmallInputsWrap>
            {
              formFields.map(el => (
                <>
                  <ControlForm key={el.name} {...el} errors={errors} control={control} />
                  {errorsMessages[el.name]?.split('.,')?.map(msg => (
                    <ErrorAlert type='simple' error={msg} maxWidth='380px' />
                  ))}
                </>
              ))
            }
          </FieldsWrap>
          <SubmitButton>Załóż konto</SubmitButton>
          <GoToLogin>
            Masz już konto? <Link to={loginRedirect}>Zaloguj się!</Link>
          </GoToLogin>
        </FormWrap>
      </StyledForm>
    </Wrapper>
  );
};

export default Signup;

//HEADER - 28PX
//LOWER HEADER - 21PX
//POINTS - 13PX