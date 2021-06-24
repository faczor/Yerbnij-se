import { Button } from 'm-web-components';
import React, { useState } from 'react';
import styled from 'styled-components';
import { centerFlex } from 'styles/mixins';

import * as S from 'components/tables/Table.css';

const StyledTextArea = styled.textarea`
  height: 160px;
  resize: none;
  padding: 10px;
  width: 100%;
  border: 1px solid hsl(0, 0%, 80%);
`;

const Wrapper = styled.form`
  background-color: #fff;
  //height: 200px;
  width: 350px;
  padding: 20px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  h4 {
    font: 16px;
    ${centerFlex}
  }
`;

const Buttons = styled.div`
  margin-top: 30px;
  ${centerFlex}
`;

const AddCommentModal = ({
                           confirmFunc,
                           cancelFunc,
                         }) => {
  const [comment, setComment] = useState();

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  return (
    <Wrapper onSubmit={e => confirmFunc(e, comment)}>
      <h4>Dodaj komentarz</h4>

      <StyledTextArea
        placeholder='Treść komentarza'
        onChange={handleCommentChange}
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
          Zatwierdź
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default AddCommentModal;