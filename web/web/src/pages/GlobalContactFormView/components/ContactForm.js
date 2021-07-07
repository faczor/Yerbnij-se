import React from 'react';
import * as S from 'components/tables/Table.css';

import { Button } from 'm-web-components';

import { ControlForm, ErrorAlert } from 'm-web-components';

import { Buttons, Form, StyledTextArea, StyledInput } from './ContactForm.css';

const ContactForm = ({
                       errors,
                       control,
                       errorsMessages,
                       handleSubmit,
                       onSubmit,
                       setOpen,
                     }) => {
  const formFields = [
    {
      as: (
        <StyledInput
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
      name: 'title',
      label: 'Temat',
      rules: { required: 'To pole jest wymagane' },
      type: 'text',
    },

    {
      as: (
        <StyledTextArea
          InputLabelProps={{
            shrink: true,
          }}
          multiline
        />
      ),
      name: 'content',
      label: 'Wiadomość',
      rules: { required: 'To pole jest wymagane' },
      type: 'text',
    },
  ];

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
      <Form>
        <h4>Formularz kontaktowy</h4>
        {fields}
        <Buttons>
          <S.FiltersButtonToggle
            type='button'
            onClick={() => setOpen(prev => !prev)}
          >
            Anuluj
          </S.FiltersButtonToggle>
          <Button
            type='button'
            colorType='primary'
            onClick={handleSubmit(onSubmit)}
            padding='7px 10px'
            margin='0 0 0 20px'
            fontWeight='600'
            style={{ border: 'none' }}
          >
            Wyślij wiadomość
          </Button>
        </Buttons>
      </Form>
    </>
  );
};

export default ContactForm;
