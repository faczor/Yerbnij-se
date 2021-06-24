import { Button } from 'm-web-components';
import React, { useState } from 'react';
import styled from 'styled-components';
import { centerFlex } from 'styles/mixins';
import TextField from '@material-ui/core/TextField';
import ReactDatePicker from 'react-datepicker';

import * as S from 'components/tables/Table.css';
import { Label } from 'components/admin/FormsElements/Singles/Singles.css';

const Wrapper = styled.form`
  background-color: #fff;
  //height: 200px;
  width: 350px;
  padding: 20px;
  color: ${({ theme }) => theme.primary};

  h4 {
    font-size: 16px;
  }
`;

const Content = styled.div`
  opacity: 0.65;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  ${centerFlex}
  margin-top: 30px;
`;
const TextFiledStyled = styled(TextField)`
  input {
    padding: 10px 15px;
    background-color: #fff;
  }

  input:disabled {
    border: none;
  }

  .MuiOutlinedInput-root {
    border-radius: 2px;
    background-color: #fff;
  }

  .MuiOutlinedInput-notchedOutline {
    border: 1px solid rgb(242, 242, 242);
  }
`;

const PublishAdvModal = ({
  title,
  text,
  buttonLabel,
  confirmFunc,
  cancelFunc,
}) => {
  const [date, setDate] = useState(new Date());

  return (
    <Wrapper onSubmit={e => confirmFunc(e, date)}>
      <h4>{title}</h4>
      <Content>{text}</Content>

      <Label>Podaj termin składania aplikacji</Label>
      <ReactDatePicker
        dateFormat='yyyy-MM-dd'
        placeholderText='2021-01-01'
        selected={date || null}
        onChange={date => setDate(date)}
        required={true}
        customInput={<TextFiledStyled variant='outlined' />}
      />

      <Buttons>
        <S.FiltersButtonToggle type='button' onClick={cancelFunc}>
          Anuluj
        </S.FiltersButtonToggle>
        <Button
          type='submit'
          colorType='primary'
          padding='5px 10px'
          margin='0 0 0 20px'
          fontWeight='600'
          style={{ border: 'none' }}
        >
          {buttonLabel}
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default PublishAdvModal;
