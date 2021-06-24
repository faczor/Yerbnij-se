import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Wrapper,
  FormWrap,
  SubmitButton,
  GoTo,
  Title,
  Description,
} from 'styles/Auth.css';

import { routes } from '../../routes';

const DescriptionGreen = styled(Description)`
  color: ${({ theme }) => theme.fieldLabel};
`;

const SmallWrap = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 10px;

  > div {
    max-width: 480px;
    height: 100%;
    display: flex;
    flex-direction: column;

    img {
      align-self: flex-start;
      margin: 5vh 0;
    }

    a {
      color: ${({ theme }) => theme.secondaryWrapper};
    }
  }

  @media (max-width: 1366px) {
    width: 100%;
    > div {
      width: 100%;
    }
  }
`;

const ResetPasswordSuccessPage = () => {
  return (
    <Wrapper>
      <SmallWrap>
        <FormWrap>
          <Title>Nowe hasło zostało wysłane na podany e-mail.</Title>
          <DescriptionGreen>
            Wysłaliśmy Ci wiadomość z nowym hasłem. Sprawdź ją i wróć do
            logowania.
          </DescriptionGreen>
          <Link to={routes.login}>
            <SubmitButton>Wróć do logowania</SubmitButton>
          </Link>
          <GoTo>
            Nie dostałeś żadnej wiadomości?
            <Link to={routes.resetPassword}> Wyślij ponownie.</Link>
          </GoTo>
        </FormWrap>
      </SmallWrap>
    </Wrapper>
  );
};

export default ResetPasswordSuccessPage;
