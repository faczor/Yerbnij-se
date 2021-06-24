import { Button } from 'm-web-components';
import React, { useState } from 'react';
import styled from 'styled-components';
import { centerFlex } from 'styles/mixins';
import * as S from 'components/tables/Table.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { pl } from 'date-fns/locale';
import { ControlForm } from 'm-web-components';
import { useForm } from 'react-hook-form';

const blueTheme = createMuiTheme({
  palette: {
    primaryWrapper: blue,
    headersText: {
      main: '#2C81C7',
    },
  },
});

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
`;

const Buttons = styled.div`
  ${centerFlex}
  margin-top: 30px;
`;

const RecruitDateWrap = styled.div`
  display: flex;
  flex-direction: column;
  label {
    padding: 10px 0;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
  }
  div {
    margin: 0px;
    height: 42px;
  }
`;

const RowMenuModal = ({
  title,
  text,
  buttonLabel,
  confirmFunc,
  cancelFunc,
  isDateInput,
}) => {
  const { handleSubmit, control, errors } = useForm();
  const [date, setDate] = useState(new Date());

  const dateInput = {
    as: (
      <KeyboardDatePicker
        margin='normal'
        format='yyyy-MM-dd'
        inputVariant={'outlined'}
        cancelLabel={'Anuluj'}
        value={date}
        onChange={setDate}
        style={{ margin: '0', padding: '0' }}
        KeyboardButtonProps={{
          'aria-label': 'Recruitment date',
        }}
        invalidDateMessage={'Sprawdź poprawność wpisanej daty'}
      />
    ),
    name: 'date',
    rules: { required: 'To pole jest wymagane' },
  };

  return (
    <Wrapper onSubmit={handleSubmit(confirmFunc)}>
      <h4>{title}</h4>
      <Content>{text}</Content>
      {isDateInput && (
        <RecruitDateWrap>
          <label>Data zatrudnienia kandydata:</label>
          <ThemeProvider theme={blueTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
              <ControlForm
                key={dateInput.name}
                {...dateInput}
                errors={errors}
                control={control}
                defaultValue={date}
              />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </RecruitDateWrap>
      )}

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

export default RowMenuModal;
