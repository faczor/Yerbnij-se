import React, { useState } from 'react';
import styled from 'styled-components';

import MessageSentConfirmation from './MessageSentConfirmation';
import ContactForm from './ContactForm';

import { api } from 'API';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';

import { CloseButton } from './ContactForm.css';
import CloseIcon from '@material-ui/icons/Close';

export const Wrapper = styled.form`
  width: 450px;
  padding: 20px;
  color: ${({ theme }) => theme.primary};
  position: absolute;

  h4 {
    font-size: 20px;
    color: ${({ theme }) => theme.secondary};
  }

  > p {
    margin: 10px 0;
    text-transform: uppercase;
    display: flex;
    color: ${({ theme }) => theme.primary};
    flex-direction: column;
    font-size: 11px;
    font-weight: 600;

    span {
      margin-top: 10px;
      align-self: flex-start;
      background: ${({ theme }) => theme.secondary};
      padding: 5px;
      font-size: 15px;
      font-weight: 600;
    }
  }

  @media (max-width: 450px) {
    width: 95%;
  }
`;

const ContactFormModal = ({ setOpen }) => {
  const [errorsMessages, setErrorsMessages] = useState({});
  const { handleSubmit, errors, control } = useForm();

  const [isSent, setSent] = useState(false);

  const submitFormFunc = async data => {
    if (data) {
      try {
        await api.postContactForm(data);
        return 'success';
      } catch (e) {
        if (!e?.data?.errors) {
          toast.error(
            'Coś poszło nie tak, spróbuj ponownie lub skontaktuj się z administratorem'
          );
        }
        return e?.response;
      }
    }
  };

  const onSubmit = async data => {
    if (data) {
      try {
        const resp = await submitFormFunc(data);
        if (resp === 'success') {
          setSent(true);
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
    }
  };

  return (
    <Wrapper>
      <CloseButton onClick={() => setOpen(prev => !prev)}>
        <CloseIcon />
      </CloseButton>
      {!isSent ? (
        <ContactForm
          errors={errors}
          control={control}
          errorsMessages={errorsMessages}
          handleSubmit={handleSubmit}
          setOpen={setOpen}
          setSent={setSent}
          onSubmit={onSubmit}
        />
      ) : (
        <>
          <MessageSentConfirmation />
        </>
      )}
    </Wrapper>
  );
};

export default ContactFormModal;
