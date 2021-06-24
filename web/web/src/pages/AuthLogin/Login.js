import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, Link, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Wrapper,
  Form,
  SubmitButton,
  FieldsWrap,
  FormWrap,
  GoTo,
  Title,
} from 'styles/Auth.css';

import useAuth from 'auth/useAuth';
import { api } from 'API';
import { routes } from '../../routes';
import { formFields } from './formFields';
import ControlForm from '../../components/ControlForm/ControlForm';
import { Button } from '../../components/atoms/Buttons';
import googleLogo from '../../assets/google-logo.png';
import fbLogo from '../../assets/fb-logo.png';

const LinkStyled = styled.a`
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: black;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
  }

  span {
    margin-left: 20px;
  }
`;

const ForgotPass = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => theme.headers};
`;

const Login = () => {
  const auth = useSelector(state => state.auth);
  const { token } = useParams();
  const { login } = useAuth();
  const { handleSubmit, errors, control } = useForm();
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(auth.isAuthenticated);

  useEffect(() => {
    const isToken = async () => {
      if (token) {
        try {
          await api.sendToken(token);
          toast.success('Aktywowano konto. Teraz możesz się zalogować.');
        } catch (e) {
          toast.error('Coś poszło nie tak. Na Twój e-mail wysłaliśmy nowy link aktywacyjny.');
        }
      }
    };
    isToken();
  }, []);

  useEffect(() => {
    setIsLogin(auth.isAuthenticated);
  }, [auth.isAuthenticated]);

  const onSubmit = async data => {
    await login(data).then(response => {
      // eslint-disable-next-line default-case
      switch (response.status) {
        case 403:
          toast.error('Konto nie jest aktywne. Sprawdź wiadomość, która została wysłana na podany przy rejestracji adres mailowy.');
          break;
        case 401:
          toast.error('Niepoprawne dane do logowania.');
          break;
        case 500:
          toast.error("Błąd systemu. Wróć później, lub skontaktuj się z administratorem.")
          break;
      }
    }).catch(error => {
      return false;
    })
  };

  const fields = formFields.map(el => (
    <ControlForm key={el.name} {...el} errors={errors} control={control} />
  ));

  if (isLogin) {
    return <Redirect to={history.location.state?.from || '/'} />;
  }

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Form>
        <FormWrap>
          <Title>Zaloguj się</Title>
          <FieldsWrap>
            {fields}
            <ForgotPass>
              <Link to={routes.resetPassword}>Zapomniałeś hasła?</Link>
            </ForgotPass>
            <SubmitButton>Zaloguj się</SubmitButton>
          </FieldsWrap>
          <GoTo>
            Nie masz konta? <Link to={routes.signup}>Zarejestruj się!</Link>
          </GoTo>
        </FormWrap>
      </Form>
    </Wrapper>
  );
};

export default Login;
