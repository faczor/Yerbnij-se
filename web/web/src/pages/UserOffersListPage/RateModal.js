import { Button } from 'm-web-components';
import React, { useState } from 'react';
import styled from 'styled-components';
import { centerFlex } from 'styles/mixins';
import Rating from '@material-ui/lab/Rating';

import * as S from 'components/tables/Table.css';

const Wrapper = styled.form`
  background-color: #fff;
  width: 350px;
  padding: 20px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  h4 {
    font-size: 16px;
  }
`;

const Buttons = styled.div`
  margin-top: 30px;
  ${centerFlex}
`;

const RateModal = ({
  confirmFunc,
  cancelFunc,
}) => {

  const [rate, setRate] = useState();
  const handleRating = e => {
    console.log(e.target.value)
    setRate(e.target.value);
  };

  return (
    <Wrapper onSubmit={e => confirmFunc(e, rate)}>
      <h4>Oceń produkt</h4>
      <Rating name="half-rating" defaultValue={0.0} precision={0.5} onChange={handleRating}/>
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

export default RateModal;